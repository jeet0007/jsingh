"use client";

import { PDFDocument } from "pdf-lib";
import { create } from "zustand";
import type { CropArea } from "../types";

interface PDFCropperStore {
  // Document state
  pdfDocument: PDFDocument | null;
  pdfBytes: Uint8Array | null;
  fileName: string | null;
  pageCount: number;

  // Crop state
  cropArea: CropArea | null;
  isProcessing: boolean;

  // Preview state
  currentPreviewPage: number;

  // Error handling
  error: string | null;

  // Actions
  loadPDF: (file: File) => Promise<void>;
  setCropArea: (area: CropArea) => void;
  processCrop: () => Promise<Uint8Array>;
  setCurrentPreviewPage: (page: number) => void;
  reset: () => void;
}

export const usePDFCropperStore = create<PDFCropperStore>((set, get) => ({
  // Initial state
  pdfDocument: null,
  pdfBytes: null,
  fileName: null,
  pageCount: 0,
  cropArea: null,
  isProcessing: false,
  currentPreviewPage: 1,
  error: null,

  // Load PDF file
  loadPDF: async (file: File) => {
    set({ isProcessing: true, error: null });

    try {
      // Validate file type
      if (file.type !== "application/pdf") {
        throw new Error("Only PDF files are supported");
      }

      // Validate file size (50MB max)
      const MAX_SIZE = 50 * 1024 * 1024; // 50MB in bytes
      if (file.size > MAX_SIZE) {
        throw new Error("File size must be less than 50MB");
      }

      // Load PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      // Validate page count
      if (pageCount === 0) {
        throw new Error("PDF has no pages");
      }
      // Set default crop area to 10% margin on all sides
      const defaultCropArea: CropArea = {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
      };

      set({
        pdfDocument: pdfDoc,
        pdfBytes: new Uint8Array(arrayBuffer),
        fileName: file.name,
        pageCount,
        cropArea: defaultCropArea,
        currentPreviewPage: 1,
        isProcessing: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to load PDF",
        isProcessing: false,
        pdfDocument: null,
        pdfBytes: null,
        fileName: null,
        pageCount: 0,
        cropArea: null,
      });
      throw error;
    }
  },

  // Set crop area
  setCropArea: (area: CropArea) => {
    // Validate crop area bounds
    const validatedArea: CropArea = {
      x: Math.max(0, Math.min(100 - area.width, area.x)),
      y: Math.max(0, Math.min(100 - area.height, area.y)),
      width: Math.max(0, Math.min(100 - area.x, area.width)),
      height: Math.max(0, Math.min(100 - area.y, area.height)),
    };

    set({ cropArea: validatedArea });
  },

  // Process crop and return cropped PDF bytes
  processCrop: async () => {
    const { pdfDocument, cropArea } = get();

    if (!pdfDocument) {
      throw new Error("No PDF document loaded");
    }

    if (!cropArea) {
      throw new Error("No crop area selected");
    }

    set({ isProcessing: true, error: null });

    try {
      // Create a new PDF document from the original
      const pdfBytes = await pdfDocument.save();
      const croppedDoc = await PDFDocument.load(pdfBytes);

      // Apply crop to all pages
      const pages = croppedDoc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();

        // Convert percentage to PDF points
        // PDF y-axis is bottom-up, so we need to invert y coordinate
        const cropBox = {
          x: (cropArea.x / 100) * width,
          y: height - ((cropArea.y + cropArea.height) / 100) * height,
          width: (cropArea.width / 100) * width,
          height: (cropArea.height / 100) * height,
        };

        // Apply crop box to page
        page.setCropBox(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
      }

      // Save cropped PDF
      const croppedBytes = await croppedDoc.save();

      set({ isProcessing: false });

      return croppedBytes;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to crop PDF",
        isProcessing: false,
      });
      throw error;
    }
  },

  // Set current preview page
  setCurrentPreviewPage: (page: number) => {
    const { pageCount } = get();
    const validPage = Math.max(1, Math.min(pageCount, page));
    set({ currentPreviewPage: validPage });
  },

  // Reset all state
  reset: () => {
    set({
      pdfDocument: null,
      pdfBytes: null,
      fileName: null,
      pageCount: 0,
      cropArea: null,
      isProcessing: false,
      currentPreviewPage: 1,
      error: null,
    });
  },
}));
