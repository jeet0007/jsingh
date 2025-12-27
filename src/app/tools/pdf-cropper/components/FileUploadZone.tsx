'use client';

import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { FaFilePdf, FaUpload } from 'react-icons/fa';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => Promise<void>;
}

export function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const pdfFile = files.find((file) => file.type === 'application/pdf');

      if (pdfFile) {
        setIsUploading(true);
        try {
          await onFileSelect(pdfFile);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          await onFileSelect(file);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [onFileSelect]
  );

  return (
    <div
      className={classNames(
        'relative rounded-lg p-12 text-center transition-all duration-200',
        'border-2 border-dashed cursor-pointer',
        {
          'border-blue-500 bg-blue-50': isDragging,
          'border-gray-300 bg-white shadow-neumorphism hover:shadow-neumorphismHover':
            !isDragging && !isUploading,
          'border-gray-400 bg-gray-50 cursor-wait': isUploading,
        }
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => {
        if (!isUploading) {
          document.getElementById('pdf-file-input')?.click();
        }
      }}
    >
      <input
        id="pdf-file-input"
        type="file"
        accept="application/pdf"
        onChange={handleFileInput}
        className="hidden"
        disabled={isUploading}
      />

      <div className="flex flex-col items-center space-y-4">
        {isUploading ? (
          <>
            <FaUpload className="w-16 h-16 text-gray-400 animate-pulse" />
            <p className="text-lg font-medium text-gray-700">
              Loading PDF...
            </p>
          </>
        ) : (
          <>
            <FaFilePdf className="w-16 h-16 text-red-500" />
            <div>
              <p className="text-lg font-medium text-gray-700 mb-1">
                Drag & Drop PDF Here
              </p>
              <p className="text-sm text-gray-500">or click to browse</p>
            </div>
            <div className="text-xs text-gray-400">
              <p>Maximum file size: 50MB</p>
              <p>Supported format: PDF only</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
