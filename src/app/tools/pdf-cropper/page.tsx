'use client';

import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { usePDFCropperStore } from '@/stores/pdfCropperStore';
import { FileUploadZone } from './components/FileUploadZone';
import { ActionButtons } from './components/ActionButtons';
import QueryProviderWrapper from '@/components/QueryProvider';

// Dynamic imports for heavy components
const PDFPreviewCanvas = dynamic(
  () => import('./components/PDFPreviewCanvas').then((mod) => ({ default: mod.PDFPreviewCanvas })),
  {
    loading: () => (
      <div className="flex items-center justify-center h-96 rounded-lg bg-white shadow-neumorphism">
        <div className="text-gray-600">Loading PDF preview...</div>
      </div>
    ),
    ssr: false,
  }
);

function PDFCropperInner() {
  const {
    pdfBytes,
    fileName,
    cropArea,
    isProcessing,
    error,
    loadPDF,
    processCrop,
    reset,
  } = usePDFCropperStore();

  // File upload handler
  const handleFileSelect = useCallback(
    async (file: File) => {
      await loadPDF(file);
    },
    [loadPDF]
  );

  // Download handler
  const handleDownload = useCallback(async () => {
    if (!cropArea) {
      alert('Please select a crop area first');
      return;
    }

    try {
      const croppedBytes = await processCrop();

      // Create download link
      const blob = new Blob([croppedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName?.replace('.pdf', '_cropped.pdf') || 'cropped.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download cropped PDF');
    }
  }, [cropArea, processCrop, fileName]);

  // Reset handler
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            PDF Cropper
          </h1>
          <p className="text-gray-600">
            Crop PDF pages to remove margins and unwanted content. All processing happens in your browser - your files never leave your device.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-800">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {!pdfBytes ? (
            <FileUploadZone onFileSelect={handleFileSelect} />
          ) : (
            <>
              <PDFPreviewCanvas />
              <ActionButtons
                onReset={handleReset}
                onDownload={handleDownload}
                disabled={!cropArea}
                isProcessing={isProcessing}
              />
            </>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 rounded-lg bg-white shadow-neumorphism">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            About PDF Cropper
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Privacy First:</strong> All PDF processing happens entirely in your browser using JavaScript. Your files are never uploaded to any server.
            </p>
            <p>
              <strong>How it works:</strong> Upload a PDF, adjust the blue crop area by dragging it or resizing from the corners, and download your cropped PDF.
            </p>
            <p>
              <strong>Limitations:</strong> Maximum file size is 50MB. For larger files, consider using a desktop PDF editor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PDFCropperPage() {
  return (
    <QueryProviderWrapper>
      <PDFCropperInner />
    </QueryProviderWrapper>
  );
}
