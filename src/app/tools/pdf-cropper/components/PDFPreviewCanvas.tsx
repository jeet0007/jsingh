'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import { usePDFCropperStore } from '@/stores/pdfCropperStore';
import { CropSelector } from './CropSelector';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function PDFPreviewCanvas() {
  const {
    pdfBytes,
    pageCount,
    currentPreviewPage,
    setCurrentPreviewPage,
    cropArea,
    setCropArea,
  } = usePDFCropperStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Measure container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Memoize file object to prevent unnecessary reloads
  // Create a copy of the ArrayBuffer to prevent detachment issues
  const file = useMemo(() => {
    if (!pdfBytes) return null;
    // Create a copy to prevent ArrayBuffer detachment
    const copy = new Uint8Array(pdfBytes);
    return { data: copy };
  }, [pdfBytes]);

  const handleDocumentLoadSuccess = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handlePageLoadSuccess = useCallback((page: any) => {
    if (containerWidth === 0) return;

    const { width, height } = page;
    const scale = containerWidth / width;
    setPageSize({
      width: containerWidth,
      height: height * scale,
    });
  }, [containerWidth]);

  const handlePreviousPage = useCallback(() => {
    if (currentPreviewPage > 1) {
      setCurrentPreviewPage(currentPreviewPage - 1);
    }
  }, [currentPreviewPage, setCurrentPreviewPage]);

  const handleNextPage = useCallback(() => {
    if (currentPreviewPage < pageCount) {
      setCurrentPreviewPage(currentPreviewPage + 1);
    }
  }, [currentPreviewPage, pageCount, setCurrentPreviewPage]);

  if (!pdfBytes) {
    return null;
  }

  return (
    <div className="space-y-4" ref={containerRef}>
      {/* Page Navigation */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-white shadow-neumorphism">
          <button
            onClick={handlePreviousPage}
            disabled={currentPreviewPage === 1}
            className="p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-neumorphismHover active:shadow-neumorphismActive"
          >
            <FaChevronLeft className="w-4 h-4 text-gray-700" />
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {currentPreviewPage} of {pageCount}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPreviewPage === pageCount}
            className="p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-neumorphismHover active:shadow-neumorphismActive"
          >
            <FaChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      )}

      {/* PDF Preview with Crop Overlay */}
      <div className="relative rounded-lg overflow-hidden shadow-neumorphism bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
            <FaSpinner className="animate-spin h-8 w-8 text-gray-600" />
          </div>
        )}

        <div className="relative inline-block">
          <Document
            file={file}
            onLoadSuccess={handleDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-96 bg-gray-100">
                <FaSpinner className="animate-spin h-8 w-8 text-gray-600" />
              </div>
            }
          >
            <Page
              pageNumber={currentPreviewPage}
              width={containerWidth > 0 ? containerWidth : undefined}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onLoadSuccess={handlePageLoadSuccess}
            />
          </Document>

          {/* Crop Selector Overlay */}
          {cropArea && pageSize.height > 0 && (
            <CropSelector
              containerWidth={pageSize.width}
              containerHeight={pageSize.height}
              cropArea={cropArea}
              onCropChange={setCropArea}
            />
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <p className="font-medium mb-1">How to crop:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Drag the blue box to reposition the crop area</li>
          <li>Drag the corner handles to resize the crop area</li>
          <li>The crop will be applied to all pages uniformly</li>
        </ul>
      </div>
    </div>
  );
}
