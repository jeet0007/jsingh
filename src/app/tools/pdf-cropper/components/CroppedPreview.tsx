'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaSpinner, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { usePDFCropperStore } from '@/stores/pdfCropperStore';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PREVIEW_WIDTH = 400;

export function CroppedPreview() {
  const { processCrop, pageCount } = usePDFCropperStore();
  const [croppedBytes, setCroppedBytes] = useState<Uint8Array | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDocumentLoading, setIsDocumentLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize file object to prevent unnecessary reloads
  // Create a copy of the ArrayBuffer to prevent detachment issues
  const file = useMemo(() => {
    if (!croppedBytes) return null;
    // Create a copy to prevent ArrayBuffer detachment
    const copy = new Uint8Array(croppedBytes);
    return { data: copy };
  }, [croppedBytes]);

  const handleDocumentLoadSuccess = useCallback(() => {
    setIsDocumentLoading(false);
  }, []);

  const generatePreview = useCallback(async () => {
    setIsGenerating(true);
    setIsDocumentLoading(true);
    setError(null);

    try {
      const bytes = await processCrop();
      setCroppedBytes(bytes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate preview');
    } finally {
      setIsGenerating(false);
    }
  }, [processCrop]);

  useEffect(() => {
    generatePreview();
  }, [generatePreview]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, pageCount]);

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-lg bg-white shadow-neumorphism">
        <FaSpinner className="animate-spin h-12 w-12 text-gray-600 mb-4" />
        <p className="text-gray-600">Generating cropped preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-800">
        <p className="font-medium">Preview Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!croppedBytes) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Cropped Preview</h3>

      {/* Page Navigation */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-white shadow-neumorphism">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-neumorphismHover active:shadow-neumorphismActive"
          >
            <FaChevronLeft className="w-4 h-4 text-gray-700" />
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {pageCount}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === pageCount}
            className="p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-neumorphismHover active:shadow-neumorphismActive"
          >
            <FaChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      )}

      {/* Cropped PDF Preview */}
      <div className="relative rounded-lg overflow-hidden shadow-neumorphism bg-white">
        <Document
          file={file}
          onLoadSuccess={handleDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-96 bg-gray-100">
              <FaSpinner className="animate-spin h-8 w-8 text-gray-600" />
            </div>
          }
        >
          {!isDocumentLoading && (
            <Page
              pageNumber={currentPage}
              width={PREVIEW_WIDTH}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          )}
        </Document>
      </div>

      <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
        <p className="font-medium mb-1">Preview ready</p>
        <p>This is how your cropped PDF will look. Click Download to save it.</p>
      </div>
    </div>
  );
}
