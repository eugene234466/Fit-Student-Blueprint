import express from 'express';
import path from 'path';
import 'dotenv/config';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const HOST = '0.0.0.0';

// Helper to retrieve Paystack secret key
function getPaystackSecretKey(): string | null {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key || key === 'sk_test_...' || key.trim() === '') {
    return null;
  }
  return key.trim();
}

// Cached merchant currencies from Paystack
let cachedMerchantCurrencies: string[] | null = null;
let lastCurrencyCheck = 0;

async function getMerchantCurrencies(secretKey: string): Promise<string[]> {
  const now = Date.now();
  if (cachedMerchantCurrencies && now - lastCurrencyCheck < 60000) {
    return cachedMerchantCurrencies;
  }

  try {
    const balRes = await fetch('https://api.paystack.co/balance', {
      headers: { Authorization: `Bearer ${secretKey}` },
    });
    const balData: any = await balRes.json();
    if (balData.status && Array.isArray(balData.data) && balData.data.length > 0) {
      const currencies = balData.data.map((b: any) => b.currency.toUpperCase());
      cachedMerchantCurrencies = currencies;
      lastCurrencyCheck = now;
      return currencies;
    }
  } catch (err) {
    console.error('Error fetching merchant balances from Paystack:', err);
  }

  return ['GHS', 'USD'];
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // --- API Routes ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', provider: 'paystack', timestamp: new Date().toISOString() });
  });

  // Payment configuration status check
  app.get('/api/payment-config', async (req, res) => {
    const secretKey = getPaystackSecretKey();
    const isConfigured = Boolean(secretKey);

    let merchantCurrencies = ['GHS', 'USD'];
    let defaultCurrency = 'GHS';

    if (secretKey) {
      merchantCurrencies = await getMerchantCurrencies(secretKey);
      defaultCurrency = merchantCurrencies[0] || 'GHS';
    }

    res.json({
      provider: 'paystack',
      configured: isConfigured,
      defaultCurrency,
      supportedCurrencies: merchantCurrencies,
      supportedTiers: ['starter', 'complete', 'mastery'],
    });
  });

  // Create Paystack Checkout Authorization URL
  app.post('/api/create-checkout-session', async (req, res) => {
    try {
      const secretKey = getPaystackSecretKey();
      const {
        tier = 'complete',
        studentName = '',
        studentEmail = '',
        university = '',
        currency: requestedCurrency = 'GHS',
      } = req.body;

      if (!secretKey) {
        return res.status(400).json({
          error:
            'PAYSTACK_SECRET_KEY is not configured yet. Add your Paystack Secret Key in Settings > Secrets to accept live payments.',
          notConfigured: true,
          provider: 'paystack',
        });
      }

      // Detect merchant enabled currencies
      const merchantCurrencies = await getMerchantCurrencies(secretKey);
      let activeCurrency = (requestedCurrency || merchantCurrencies[0] || 'GHS').toUpperCase();

      // If requested currency is not enabled on merchant account, gracefully fallback to primary merchant currency
      if (!merchantCurrencies.includes(activeCurrency)) {
        activeCurrency = merchantCurrencies[0] || 'GHS';
      }

      // Map tier to pricing per currency
      const tierMap: Record<
        string,
        {
          name: string;
          amounts: Record<string, number>;
          description: string;
        }
      > = {
        starter: {
          name: 'The Fit Student Blueprint - Starter Edition',
          amounts: {
            USD: 4,
            GHS: 49,
            NGN: 5500,
            ZAR: 69,
            KES: 500,
          },
          description: '68-page master PDF + printable 30-day tracking grid & dorm card',
        },
        complete: {
          name: 'The 30-Day Complete System',
          amounts: {
            USD: 6,
            GHS: 79,
            NGN: 8900,
            ZAR: 110,
            KES: 800,
          },
          description: 'Full interactive 68-page digital workbook + A4 PDF + 25 worksheets + $35 grocery list + certificate',
        },
        mastery: {
          name: 'University Mastery Pack',
          amounts: {
            USD: 9,
            GHS: 119,
            NGN: 13500,
            ZAR: 165,
            KES: 1200,
          },
          description: 'Everything in Complete System + Exam Period Survival Protocol + Semester Long-Term Maintenance Plan',
        },
      };

      const selected = tierMap[tier] || tierMap.complete;
      const nominalAmount = selected.amounts[activeCurrency] || selected.amounts.GHS || 79;

      // Paystack expects amount in lowest subunits (multiply by 100 for pesewas/cents/kobo)
      const subunitAmount = Math.round(nominalAmount * 100);

      // Determine base URL from headers or env
      const origin =
        process.env.APP_URL ||
        req.headers.origin ||
        `${req.protocol}://${req.get('host')}`;

      // Unique reference for Paystack
      const reference = `FSB-${Date.now()}-${Math.floor(100000 + Math.random() * 900000)}`;

      // Call Paystack Transaction Initialize API
      const initPaystack = async (curr: string, amountSubunits: number) => {
        return await fetch('https://api.paystack.co/transaction/initialize', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: studentEmail && studentEmail.includes('@') ? studentEmail : 'student@thefitstudent.com',
            amount: amountSubunits,
            currency: curr,
            reference,
            callback_url: `${origin}/#payment-success=true&gateway=paystack&reference=${reference}&tier=${tier}&name=${encodeURIComponent(studentName || '')}`,
            metadata: {
              tier,
              studentName: studentName || 'Student',
              studentEmail,
              university: university || 'Campus',
              currency: curr,
              amount: nominalAmount,
              custom_fields: [
                {
                  display_name: 'Package',
                  variable_name: 'package_tier',
                  value: selected.name,
                },
                {
                  display_name: 'Student Name',
                  variable_name: 'student_name',
                  value: studentName || 'Student',
                },
                {
                  display_name: 'University',
                  variable_name: 'university',
                  value: university || 'Campus',
                },
              ],
            },
            channels: ['card', 'bank', 'mobile_money', 'bank_transfer', 'ussd', 'qr'],
          }),
        });
      };

      let paystackRes = await initPaystack(activeCurrency, subunitAmount);
      let paystackData: any = await paystackRes.json();

      // If unsupported currency error returned, fallback to merchant primary currency (e.g. GHS)
      if (!paystackRes.ok && paystackData.code === 'unsupported_currency' && activeCurrency !== 'GHS') {
        activeCurrency = 'GHS';
        const fallbackAmount = Math.round((selected.amounts.GHS || 79) * 100);
        paystackRes = await initPaystack('GHS', fallbackAmount);
        paystackData = await paystackRes.json();
      }

      if (paystackRes.ok && paystackData.status === true && paystackData.data?.authorization_url) {
        return res.json({
          url: paystackData.data.authorization_url,
          access_code: paystackData.data.access_code,
          reference: paystackData.data.reference || reference,
          currency: activeCurrency,
          amount: nominalAmount,
          provider: 'paystack',
        });
      } else {
        console.error('Paystack API error response:', paystackData);
        return res.status(paystackRes.status || 400).json({
          error: paystackData.message || 'Failed to initialize Paystack checkout session.',
          details: paystackData,
        });
      }
    } catch (err: any) {
      console.error('Server error initializing Paystack:', err);
      return res.status(500).json({
        error: err.message || 'Failed to communicate with Paystack payment gateway.',
      });
    }
  });

  // Verify Paystack transaction by reference
  app.get('/api/verify-payment/:reference', async (req, res) => {
    try {
      const secretKey = getPaystackSecretKey();
      const reference = req.params.reference;

      if (!secretKey) {
        return res.status(400).json({ error: 'PAYSTACK_SECRET_KEY not configured' });
      }

      const paystackRes = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        }
      );

      const data = await paystackRes.json();
      return res.json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // --- Vite Dev or Static Production Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT} (Paystack Provider Active)`);
  });
}

startServer();
