import { PDFDocument } from 'pdf-lib';
import { CropArea } from '../types';

/**
 * Apply crop area to all pages of a PDF document
 * @param pdfDoc The PDF document to crop
 * @param cropArea The crop area in percentages (0-100)
 * @returns Cropped PDF as Uint8Array
 */
export async function applyCropToAllPages(
  pdfDoc: PDFDocument,
  cropArea: CropArea
): Promise<Uint8Array> {
  // Create a new PDF document from the original to avoid modifying the source
  const pdfBytes = await pdfDoc.save();
  const croppedDoc = await PDFDocument.load(pdfBytes);

  // Get all pages
  const pages = croppedDoc.getPages();

  // Apply crop to each page
  for (const page of pages) {
    const { width, height } = page.getSize();

    // Convert percentage to PDF points
    // Note: PDF coordinate system has origin at bottom-left
    // So we need to invert the y coordinate
    const cropBox = {
      x: (cropArea.x / 100) * width,
      y: height - ((cropArea.y + cropArea.height) / 100) * height,
      width: (cropArea.width / 100) * width,
      height: (cropArea.height / 100) * height,
    };

    // Apply crop box to page
    page.setCropBox(
      cropBox.x,
      cropBox.y,
      cropBox.width,
      cropBox.height
    );
  }

  // Save and return cropped PDF
  return await croppedDoc.save();
}

/**
 * Validate crop area bounds
 * @param area The crop area to validate
 * @returns Validated crop area with bounds constrained to 0-100
 */
export function validateCropArea(area: CropArea): CropArea {
  return {
    x: Math.max(0, Math.min(100 - area.width, area.x)),
    y: Math.max(0, Math.min(100 - area.height, area.y)),
    width: Math.max(0, Math.min(100 - area.x, area.width)),
    height: Math.max(0, Math.min(100 - area.y, area.height)),
  };
}

/**
 * Create a default crop area with margins
 * @param marginPercent The margin percentage (default: 10%)
 * @returns Default crop area
 */
export function createDefaultCropArea(marginPercent: number = 10): CropArea {
  return {
    x: marginPercent,
    y: marginPercent,
    width: 100 - (marginPercent * 2),
    height: 100 - (marginPercent * 2),
  };
}
