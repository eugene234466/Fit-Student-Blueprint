import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';

export interface ExportProgress {
  current: number;
  total: number;
  pageTitle?: string;
  isComplete: boolean;
  error?: string;
}

export type PdfQuality = 'ultra' | 'high' | 'standard';

export interface ExportPdfOptions {
  isDark?: boolean;
  quality?: PdfQuality; // ultra = 300 DPI (scale 3), high = 250 DPI (scale 2.5), standard = 200 DPI (scale 2)
  usePng?: boolean; // lossless PNG for maximum text sharpness
}

/**
 * Trigger file download safely across desktop, mobile and iframe environments
 */
export function savePdfDocument(pdf: jsPDF, filename: string): void {
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  try {
    pdf.save(safeFilename);
  } catch (err) {
    console.warn('Direct pdf.save failed, falling back to blob anchor download:', err);
    try {
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = safeFilename;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 3000);
    } catch (fallbackErr) {
      console.error('All PDF download mechanisms failed:', fallbackErr);
      throw new Error('Unable to download PDF. Please check your browser download settings or try Print Dialog.');
    }
  }
}

/**
 * Ensure all fonts and images within a container are fully loaded and decoded
 */
export async function prepareElementForCapture(element: HTMLElement): Promise<void> {
  // Wait for document fonts to finish loading
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // ignore font loading failure
    }
  }

  // Allow DOM layout and microtasks to settle
  await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 80)));

  // Decode all images
  const images = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalHeight !== 0) {
        if ('decode' in img && typeof img.decode === 'function') {
          return img.decode().catch(() => {});
        }
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        img.onload = () => {
          if ('decode' in img && typeof img.decode === 'function') {
            img.decode().catch(() => {}).then(resolve);
          } else {
            resolve(null);
          }
        };
        img.onerror = resolve;
        setTimeout(resolve, 2500); // safety fallback
      });
    })
  );
}

/**
 * Capture single canvas of a DOM node with high DPI and subpixel text antialiasing
 */
export async function capturePageCanvas(
  element: HTMLElement,
  isDarkOrOptions: boolean | ExportPdfOptions = false
): Promise<HTMLCanvasElement> {
  const options: ExportPdfOptions =
    typeof isDarkOrOptions === 'boolean'
      ? { isDark: isDarkOrOptions, quality: 'ultra' }
      : { quality: 'ultra', ...isDarkOrOptions };

  const isDark = !!options.isDark;
  const quality = options.quality || 'ultra';

  // Scale map: ultra = 3x (300+ DPI), high = 2.5x (~250 DPI), standard = 2x (~200 DPI)
  const scale = quality === 'ultra' ? 3 : quality === 'high' ? 2.5 : 2;

  await prepareElementForCapture(element);

  return await html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: false,
    backgroundColor: isDark ? '#14213D' : '#ffffff',
    logging: false,
    imageTimeout: 12000,
    windowWidth: 1280, // Force desktop viewport resolution for consistent multi-column layout
    onclone: (clonedDoc) => {
      // 1. Text rendering & antialiasing enhancements
      const body = clonedDoc.body;
      if (body) {
        body.style.setProperty('text-rendering', 'geometricPrecision');
        body.style.setProperty('-webkit-font-smoothing', 'antialiased');
        body.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
      }

      // 2. Hide all elements marked with .no-print to respect print styles (except export stage)
      const noPrintElements = clonedDoc.querySelectorAll('.no-print');
      noPrintElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (
          htmlEl.id === 'pdf-export-hidden-stage' ||
          htmlEl.closest('#pdf-export-hidden-stage') ||
          htmlEl.getAttribute('data-pdf-stage') === 'true'
        ) {
          return;
        }
        htmlEl.style.setProperty('display', 'none', 'important');
      });

      // Explicitly ensure the staging container is fully visible and correctly sized in cloned DOM
      const stageInClone = clonedDoc.getElementById('pdf-export-hidden-stage');
      if (stageInClone) {
        stageInClone.style.setProperty('display', 'block', 'important');
        stageInClone.style.setProperty('visibility', 'visible', 'important');
        stageInClone.style.setProperty('opacity', '1', 'important');
        stageInClone.style.setProperty('position', 'relative', 'important');
        stageInClone.style.setProperty('left', '0px', 'important');
        stageInClone.style.setProperty('top', '0px', 'important');
        stageInClone.style.setProperty('width', '850px', 'important');
        stageInClone.style.setProperty('min-height', '1202px', 'important');
        stageInClone.style.setProperty('z-index', '9999', 'important');
      }

      // 3. Clean up shadow, borders, and margins for print perfection
      const pageElements = clonedDoc.querySelectorAll('.workbook-page');
      pageElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.boxShadow = 'none';
        htmlEl.style.border = 'none';
        htmlEl.style.margin = '0 auto';
      });

      // 4. Ensure high contrast and sharp text inside form controls
      const formTextEls = clonedDoc.querySelectorAll('input, textarea, select');
      formTextEls.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.color = '#14213D';
        htmlEl.style.opacity = '1';
      });

      // 5. Enhance SVG rendering precision
      const svgs = clonedDoc.querySelectorAll('svg');
      svgs.forEach((svg) => {
        svg.setAttribute('shape-rendering', 'geometricPrecision');
      });

      // 6. Mark all images with crossOrigin = 'anonymous' where possible
      const images = clonedDoc.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.crossOrigin) {
          img.crossOrigin = 'anonymous';
        }
      });

      // 7. Synchronize input values from real DOM to cloned DOM
      const originalInputs = element.querySelectorAll('input');
      const clonedInputs = clonedDoc.querySelectorAll('input');
      originalInputs.forEach((orig, idx) => {
        const cloned = clonedInputs[idx];
        if (cloned) {
          if (orig.type === 'checkbox' || orig.type === 'radio') {
            if (orig.checked) {
              cloned.setAttribute('checked', 'checked');
              cloned.checked = true;
            } else {
              cloned.removeAttribute('checked');
              cloned.checked = false;
            }
          } else {
            cloned.setAttribute('value', orig.value);
            cloned.value = orig.value;
          }
        }
      });

      const originalTextareas = element.querySelectorAll('textarea');
      const clonedTextareas = clonedDoc.querySelectorAll('textarea');
      originalTextareas.forEach((orig, idx) => {
        const cloned = clonedTextareas[idx];
        if (cloned) {
          cloned.textContent = orig.value;
          cloned.value = orig.value;
        }
      });

      const originalSelects = element.querySelectorAll('select');
      const clonedSelects = clonedDoc.querySelectorAll('select');
      originalSelects.forEach((orig, idx) => {
        const cloned = clonedSelects[idx];
        if (cloned) {
          cloned.value = orig.value;
        }
      });
    },
  });
}

/**
 * Capture a page DOM element and export it as an A4 PDF using jsPDF
 */
export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
  isDarkOrOptions: boolean | ExportPdfOptions = false
): Promise<void> {
  const options: ExportPdfOptions =
    typeof isDarkOrOptions === 'boolean'
      ? { isDark: isDarkOrOptions, quality: 'ultra' }
      : { quality: 'ultra', ...isDarkOrOptions };

  const canvas = await capturePageCanvas(element, options);

  // Standard A4 dimensions in mm: 210mm x 297mm
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const cWidth = Number.isFinite(canvas.width) && canvas.width > 0 ? canvas.width : 850;
  const cHeight = Number.isFinite(canvas.height) && canvas.height > 0 ? canvas.height : 1202;
  const imgWidth = 210; // A4 width
  const rawImgHeight = (cHeight * imgWidth) / cWidth;
  const imgHeight = Number.isFinite(rawImgHeight) && rawImgHeight > 0 ? rawImgHeight : 297;

  // If the aspect ratio closely matches A4 (297mm), fit exactly to full page
  const fitHeight = Math.abs(imgHeight - 297) < 5 ? 297 : imgHeight;
  const rawOffset = (297 - fitHeight) / 2;
  const offsetY = fitHeight >= 297 || !Number.isFinite(rawOffset) ? 0 : Math.max(0, rawOffset);

  const safeX = 0;
  const safeY = Number.isFinite(offsetY) ? Number(offsetY.toFixed(2)) : 0;
  const safeW = Number.isFinite(imgWidth) && imgWidth > 0 ? Number(imgWidth.toFixed(2)) : 210;
  const safeH = Number.isFinite(fitHeight) && fitHeight > 0 ? Number(fitHeight.toFixed(2)) : 297;

  // Ultra quality uses ultra-clean JPEG at 0.985 or PNG for pristine text
  const usePng = options.usePng ?? (options.quality === 'ultra');
  const format = usePng ? 'PNG' : 'JPEG';
  const imgData = usePng
    ? canvas.toDataURL('image/png')
    : canvas.toDataURL('image/jpeg', 0.985);

  pdf.addImage(imgData, format, safeX, safeY, safeW, safeH, undefined, 'FAST');
  savePdfDocument(pdf, filename);
}
