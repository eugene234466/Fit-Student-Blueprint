import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportProgress {
  current: number;
  total: number;
  pageTitle?: string;
  isComplete: boolean;
  error?: string;
}

/**
 * Capture a page DOM element and export it as an A4 PDF using jsPDF
 */
export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
  isDark = false
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2, // High resolution (retina/print crispness)
    useCORS: true,
    allowTaint: true,
    backgroundColor: isDark ? '#14213D' : '#ffffff',
    logging: false,
    imageTimeout: 8000,
    onclone: (clonedDoc) => {
      // 1. Hide all elements marked with .no-print to respect print styles
      const noPrintElements = clonedDoc.querySelectorAll('.no-print');
      noPrintElements.forEach((el) => {
        (el as HTMLElement).style.setProperty('display', 'none', 'important');
      });

      // 2. Clean up shadow and borders for print perfection
      const pageElements = clonedDoc.querySelectorAll('.workbook-page');
      pageElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.boxShadow = 'none';
        htmlEl.style.border = 'none';
      });

      // 3. Synchronize input and textarea values from real DOM to cloned DOM
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

  // Standard A4 dimensions in mm: 210mm x 297mm
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
}

/**
 * Capture single canvas of a DOM node (used for multi-page compilation)
 */
export async function capturePageCanvas(
  element: HTMLElement,
  isDark = false
): Promise<HTMLCanvasElement> {
  return await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: isDark ? '#14213D' : '#ffffff',
    logging: false,
    imageTimeout: 8000,
    onclone: (clonedDoc) => {
      // Respect print styles: hide .no-print
      clonedDoc.querySelectorAll('.no-print').forEach((el) => {
        (el as HTMLElement).style.setProperty('display', 'none', 'important');
      });

      // Remove page box-shadow
      clonedDoc.querySelectorAll('.workbook-page').forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.boxShadow = 'none';
        htmlEl.style.border = 'none';
      });

      // Sync form input fields
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
    },
  });
}
