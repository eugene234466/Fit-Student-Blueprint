export interface LegalSection {
  id: 'privacy' | 'health' | 'terms' | 'refund';
  title: string;
  badge: string;
  summary: string;
  lastUpdated: string;
  content: {
    heading: string;
    body: string;
    points?: string[];
  }[];
}

export const LEGAL_POLICIES: Record<'privacy' | 'health' | 'terms' | 'refund', LegalSection> = {
  health: {
    id: 'health',
    title: 'Health, Medical & Exercise Disclaimer',
    badge: 'Liability Release',
    summary:
      'The Fit Student Blueprint is an educational publication. It does NOT provide medical advice, diagnosis, or treatment. You must consult a qualified physician before starting any exercise or dietary regimen, and you voluntarily assume all risks of physical activity.',
    lastUpdated: 'September 2026',
    content: [
      {
        heading: '1. Not Medical, Healthcare, or Physical Therapy Advice',
        body: 'All content provided in The Fit Student Blueprint—including but not limited to text, graphics, bodyweight movement breakdowns, dorm exercise routines, walking plans, anti-burnout strategies, student grocery matrices, and nutritional suggestions—is published strictly for general informational, habit-building, and educational purposes. Nothing contained herein constitutes, nor should be construed as, professional medical advice, clinical diagnosis, personalized dietetics, athletic training prescription, or physical therapy.',
      },
      {
        heading: '2. Mandatory Physician & Healthcare Provider Consultation',
        body: 'Prior to undertaking any physical exercise program, changing your caloric intake, altering your macronutrient balance, or adopting any protocol outlined in this workbook, you must consult a licensed physician, general practitioner, or certified healthcare provider. This is especially critical if you have a history of:',
        points: [
          'Cardiovascular disease, chest pain, irregular heartbeat, or high blood pressure',
          'Musculoskeletal disorders, joint pain, prior orthopedic surgery, or chronic back issues',
          'Metabolic conditions, diabetes, hypoglycemia, or thyroid imbalances',
          'History of eating disorders, severe nutrient deficiencies, or food allergies',
          'Pregnancy, asthma, respiratory illness, or any condition requiring prescription medication',
        ],
      },
      {
        heading: '3. Voluntary Assumption of Risk and Inherent Hazards',
        body: 'You acknowledge and agree that physical exercise, strength conditioning, calisthenics, flexibility training, and cardiovascular exertion inherently involve foreseeable and unforeseeable risks. These risks include, but are not limited to, muscle strains, ligament sprains, tears, joint dislocations, dizziness, heat exhaustion, abnormal blood pressure fluctuations, fainting, falls, and, in rare instances, severe bodily injury or sudden cardiac events.',
        points: [
          'You affirm that your participation in any workout or movement routine is entirely voluntary.',
          'You knowingly, freely, and willingly assume full responsibility for all risks, damages, and hazards associated with performing the exercises or following the nutritional suggestions.',
          'If at any point during any workout you experience sharp pain, shortness of breath, dizziness, nausea, or irregular palpitations, you must immediately stop exercising and seek emergency medical evaluation.',
        ],
      },
      {
        heading: '4. Comprehensive Waiver of Liability and Covenant Not to Sue',
        body: 'To the maximum extent permitted by applicable law, by accessing, reading, or using The Fit Student Blueprint (including this digital application, printable PDF workbooks, templates, and associated materials), you hereby release, waive, discharge, and covenant not to sue the author(s), creators, publishers (Modern Student Wellness Publishing), owners, affiliates, and technology partners from any and all liabilities, claims, demands, actions, or causes of action arising out of or related to any loss, bodily injury, medical emergency, property damage, or personal distress sustained by you or any third party, whether caused by negligence or otherwise.',
      },
      {
        heading: '5. No Guarantee of Results & Individual Variance',
        body: 'No express or implied representation or warranty is made regarding the specific physical, cognitive, or aesthetic outcomes you will achieve. Physical transformations, muscle gain, fat loss, focus enhancements, and energy improvements depend entirely upon individual genetic baseline, academic stress levels, hormonal profiles, existing fitness condition, sleep duration, and day-to-day consistency. Testimonials and campus case studies presented are illustrative of individual experiences and do not guarantee identical results for any other individual.',
      },
      {
        heading: '6. Food Safety & Dorm Living Disclaimers',
        body: 'Nutritional suggestions and dorm food preparation matrices are general educational outlines. Users are solely responsible for ensuring proper refrigeration, checking food expiration dates, avoiding cross-contamination, and identifying personal food allergens or intolerances. The authors and publishers accept no liability for adverse reactions, foodborne illness, or allergic reactions resulting from grocery selections or meal preparations.',
      },
    ],
  },

  privacy: {
    id: 'privacy',
    title: 'Privacy Policy & Data Protection',
    badge: 'GDPR & Privacy Compliant',
    summary:
      'We respect your privacy. We collect only what is strictly necessary to deliver your digital purchase and provide support. We never sell, rent, or trade your personal data. Payment information is securely processed directly by Paystack.',
    lastUpdated: 'September 2026',
    content: [
      {
        heading: '1. Information We Collect and Receive',
        body: 'When you purchase, access, or interact with The Fit Student Blueprint, we may collect the following limited categories of personal data:',
        points: [
          'Purchase & Delivery Information: Your email address and full name submitted during checkout to issue your unique access passcode, deliver PDF receipts, and fulfill customer support requests.',
          'Transaction Metadata: Payment reference ID, currency (GHS, USD, NGN, ZAR, KES), tier purchased, timestamp, and verification status returned by our payment processor. We NEVER see or store credit card numbers, CVV security codes, bank account passwords, or Mobile Money PINs.',
          'Local Device Storage: When you use the interactive workbook, your worksheet responses, completed checklist checkboxes, and progress states are saved locally on your device via browser localStorage. This data remains on your personal device and is not synchronized to an external surveillance server.',
          'Technical Logs: Basic server telemetry (IP address, browser user-agent, access timestamps) used strictly for detecting fraudulent checkout attempts, preventing denial-of-service attacks, and verifying server health.',
        ],
      },
      {
        heading: '2. Payment Processing & PCI-DSS Compliance',
        body: 'All financial transactions are conducted directly through Paystack (Paystack Payments Limited), an internationally accredited, PCI-DSS Level 1 certified payment gateway. Paystack securely processes debit cards, credit cards, Apple Pay, and Mobile Money (MTN MoMo, Telecel Cash, AT Money, M-Pesa). Modern Student Wellness Publishing does not process, store, or have access to your card details or financial credentials at any point.',
      },
      {
        heading: '3. How We Use Your Data & Lawful Basis',
        body: 'We process personal information under the following lawful bases:',
        points: [
          'Contractual Necessity: To generate your digital book license, issue your one-time unlock passcode, send order confirmation emails, and provide access to the digital workbook.',
          'Legitimate Interests: To provide customer support, troubleshoot PDF download issues, prevent fraud, and maintain application security.',
          'Legal Compliance: To comply with mandatory tax, accounting, and anti-fraud statutory obligations.',
        ],
      },
      {
        heading: '4. Third-Party Sharing & Zero Data Sale Guarantee',
        body: 'We do not sell, rent, lease, or monetize your personal information to data brokers, advertising networks, or third-party marketing companies under any circumstances. Data is shared exclusively with necessary service providers under strict confidentiality agreements:',
        points: [
          'Payment Gateways: Paystack (for transaction authorization and fraud screening)',
          'Cloud Infrastructure: Google Cloud Run & reverse proxy hosts (for secure application hosting and HTTPS delivery)',
        ],
      },
      {
        heading: '5. Cookies and Browser Storage',
        body: 'The Fit Student Blueprint does not deploy intrusive third-party cross-site advertising cookies or tracking pixels. We utilize HTML5 localStorage strictly to preserve your in-workbook progress, unlocked digital access state, and reading preferences between browser sessions.',
      },
      {
        heading: '6. Your Legal Rights & Data Access',
        body: 'Under applicable privacy laws (including GDPR, Ghana Data Protection Act 2012, Nigeria NDPR, and South Africa POPIA), you hold specific rights regarding your personal information:',
        points: [
          'Right of Access: Request a copy of the personal data we hold about your purchase.',
          'Right to Rectification: Request correction of any inaccurate customer record (e.g., misspelled email address).',
          'Right to Erasure: Request permanent deletion of your customer record and contact details, subject to statutory tax retention requirements.',
          'Right to Lodge a Complaint: File a grievance with your local data protection supervisory authority.',
        ],
      },
      {
        heading: '7. Data Controller & Privacy Inquiries',
        body: 'For any privacy-related requests, access requests, or questions regarding our data practices, contact our Data Protection Team at support@thefitstudent.com or eugeneyarney5@gmail.com. We respond to all verified requests within 30 business days.',
      },
    ],
  },

  terms: {
    id: 'terms',
    title: 'Terms of Service & Digital Sale License',
    badge: 'Single-User License',
    summary:
      'Purchasing The Fit Student Blueprint grants you a single-user, non-transferable, personal license. Unauthorized public distribution, file sharing, resale, or group reproduction is strictly prohibited and protected by copyright law.',
    lastUpdated: 'September 2026',
    content: [
      {
        heading: '1. Agreement to Terms',
        body: 'By purchasing, downloading, accessing, or using The Fit Student Blueprint ("the Blueprint", "the Product", or "the Service"), you agree to be legally bound by these Terms of Service. If you do not agree with any part of these terms, you must not purchase or access the materials.',
      },
      {
        heading: '2. Grant of Personal Single-User License',
        body: 'Upon full payment, Modern Student Wellness Publishing grants you a revocable, non-exclusive, non-transferable, non-sublicensable license to access, view, and use the digital materials for your own personal, non-commercial educational and fitness purposes.',
        points: [
          'Personal Printing: You may print physical copies of the 68-page PDF, worksheets, workout cards, and tracking grids solely for your personal use.',
          'Personal Devices: You may store the digital file on your personal computers, smartphones, and tablets.',
        ],
      },
      {
        heading: '3. Intellectual Property Rights & Strict Anti-Piracy Policy',
        body: 'All text, layouts, designs, typography pairings, worksheets, nutritional matrices, custom charts, illustrations, and digital source code are the proprietary intellectual property of the author and Modern Student Wellness Publishing, protected by international copyright laws and treaties.',
        points: [
          'Strict Prohibition on Redistribution: You are strictly forbidden from uploading, distributing, sharing, transmitting, or republishing the Blueprint on shared cloud drives (Google Drive, Dropbox, OneDrive), torrent networks, Telegram channels, WhatsApp groups, Discord servers, student union intranets, or social media platforms.',
          'No Commercial Resale or Modification: You may not resell, license, lease, rent, adapt, translate, reverse-engineer, or create derivative commercial works from any part of this publication.',
          'Copyright Enforcement: Any unauthorized commercial exploitation or systematic piracy will result in immediate license revocation and legal enforcement, including claims for statutory damages and legal fees under applicable copyright legislation.',
        ],
      },
      {
        heading: '4. Pricing, Taxes & Instant Digital Fulfillment',
        body: 'All prices are clearly stated in local currencies (GHS, USD, NGN, ZAR, KES). Upon successful confirmation of payment via Paystack, the digital system is delivered immediately via instant web unlock and high-resolution downloadable PDF files. Because delivery is automated and immediate upon payment, you agree to immediate fulfillment.',
      },
      {
        heading: '5. Limitation of Liability',
        body: 'To the fullest extent permitted by law, Modern Student Wellness Publishing, its founders, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, personal injury, academic disruption, or equipment failure, arising from or related to your use of or inability to use the Product. In no event shall our total aggregate liability exceed the actual amount paid by you for the single purchase of the Product.',
      },
      {
        heading: '6. Indemnification',
        body: 'You agree to indemnify, defend, and hold harmless Modern Student Wellness Publishing, its officers, employees, and licensors from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys’ fees) arising out of your violation of these Terms, your unauthorized distribution of the materials, or your negligence in applying exercise protocols.',
      },
      {
        heading: '7. Governing Law & Jurisdiction',
        body: 'These Terms shall be governed by and construed in accordance with the laws of Ghana, without regard to its conflict of law principles. Any dispute, claim, or controversy arising out of or relating to these Terms shall be resolved through good-faith informal negotiation, and if unresolved, through competent courts of jurisdiction.',
      },
    ],
  },

  refund: {
    id: 'refund',
    title: 'Refund & 30-Day Money-Back Guarantee Policy',
    badge: '100% Satisfaction Guarantee',
    summary:
      'We stand behind our 30-day university fitness system. If you read the materials, try the student movement protocols, and feel the blueprint did not deliver real value, you may request a prompt refund within 30 days of purchase.',
    lastUpdated: 'September 2026',
    content: [
      {
        heading: '1. Our 30-Day Student Satisfaction Guarantee',
        body: 'We are committed to delivering the highest quality, practical fitness operating system for university life. If you purchase The Fit Student Blueprint, review the materials, and find that it does not provide practical, actionable value for your campus routine, you are eligible for a 100% refund within 30 calendar days of your original purchase date.',
      },
      {
        heading: '2. How to Request a Refund',
        body: 'To submit a refund request:',
        points: [
          'Email support@thefitstudent.com or eugeneyarney5@gmail.com from the email address you used at checkout.',
          'Include your Paystack payment reference ID or order receipt number.',
          'Briefly share why the system did not meet your expectations so our publishing team can continually improve.',
        ],
      },
      {
        heading: '3. Refund Processing & Payment Methods',
        body: 'Once your refund request is confirmed by our support team:',
        points: [
          'Refunds are processed directly back to your original payment method (bank debit card, credit card, or Mobile Money wallet) via the Paystack gateway.',
          'Processing typically takes 3 to 7 business days to reflect on your bank or telecom statement, depending on your financial institution.',
          'Upon processing of a refund, your digital access license and one-time unlock credentials will be deactivated.',
        ],
      },
      {
        heading: '4. Prevention of Chargeback Fraud & Abuse',
        body: 'We strive to resolve all customer concerns honorably and immediately. Initiating an unauthorized or fraudulent payment chargeback with your bank or mobile telecom without first contacting our customer support team constitutes a breach of contract. We reserve the right to dispute fraudulent chargebacks with evidence of digital download access, IP logs, and license usage.',
      },
      {
        heading: '5. Customer Support Hours',
        body: 'Our customer support team is available Monday through Saturday. We aim to respond to all refund and access queries within 24 to 48 hours.',
      },
    ],
  },
};
