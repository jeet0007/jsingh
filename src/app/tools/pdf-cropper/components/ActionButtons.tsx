'use client';

import classNames from 'classnames';
import { FaRedo, FaDownload, FaSpinner } from 'react-icons/fa';

interface ActionButtonsProps {
  onReset: () => void;
  onDownload: () => void;
  disabled?: boolean;
  isProcessing?: boolean;
}

export function ActionButtons({
  onReset,
  onDownload,
  disabled = false,
  isProcessing = false,
}: ActionButtonsProps) {
  return (
    <div className="space-y-3">
      {/* Download Button */}
      <button
        type="button"
        onClick={onDownload}
        disabled={disabled || isProcessing}
        className={classNames(
          'w-full px-6 py-3 rounded-lg font-medium transition-all duration-200',
          'flex items-center justify-center space-x-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-green-500 text-white shadow-neumorphism hover:shadow-neumorphismHover active:shadow-neumorphismActive':
              !disabled && !isProcessing,
            'bg-gray-300 text-gray-600': disabled || isProcessing,
          }
        )}
      >
        {isProcessing ? (
          <>
            <FaSpinner className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <FaDownload className="w-5 h-5" />
            <span>Download Cropped PDF</span>
          </>
        )}
      </button>

      {/* Reset Button */}
      <button
        type="button"
        onClick={onReset}
        disabled={isProcessing}
        className={classNames(
          'w-full px-6 py-3 rounded-lg font-medium transition-all duration-200',
          'flex items-center justify-center space-x-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-white text-gray-700 shadow-neumorphism hover:shadow-neumorphismHover active:shadow-neumorphismActive':
              !isProcessing,
            'bg-gray-300 text-gray-600': isProcessing,
          }
        )}
      >
        <FaRedo className="w-5 h-5" />
        <span>Upload Different PDF</span>
      </button>
    </div>
  );
}
