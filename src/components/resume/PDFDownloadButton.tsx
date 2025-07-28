"use client";

import React from "react";
import { FaDownload } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

interface PDFDownloadButtonProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ contentRef }) => {
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: "Taranjit_Singh_Resume",
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          font-size: 12px !important;
        }
        .no-print {
          display: none !important;
        }
        .print-container {
          box-shadow: none !important;
          border-radius: 0 !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .print-grid {
          grid-template-columns: 2fr 1fr !important;
          gap: 1.5rem !important;
        }
        .skill-tag {
          background-color: #374151 !important;
          color: white !important;
          -webkit-print-color-adjust: exact !important;
          font-size: 10px !important;
          padding: 2px 8px !important;
        }
        /* Print-specific font sizes */
        h1 {
          font-size: 24px !important;
          margin-bottom: 8px !important;
        }
        h2 {
          font-size: 16px !important;
          margin-bottom: 12px !important;
        }
        h3 {
          font-size: 14px !important;
          margin-bottom: 8px !important;
        }
        p, li, span {
          font-size: 11px !important;
          line-height: 1.4 !important;
        }
        .text-4xl, .text-5xl {
          font-size: 24px !important;
        }
        .text-xl, .text-2xl {
          font-size: 14px !important;
        }
        .text-sm {
          font-size: 10px !important;
        }
        .text-base {
          font-size: 11px !important;
        }
        /* Reduce spacing for print */
        .space-y-10 > * + * {
          margin-top: 1.5rem !important;
        }
        .space-y-6 > * + * {
          margin-top: 1rem !important;
        }
        .mb-6 {
          margin-bottom: 1rem !important;
        }
        .mb-4 {
          margin-bottom: 0.75rem !important;
        }
        .pb-8 {
          padding-bottom: 1rem !important;
        }
        .p-6 {
          padding: 1rem !important;
        }
        /* Profile image adjustments for print */
        .w-32.h-32 {
          width: 80px !important;
          height: 80px !important;
        }
        img {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      }
    `,
  });

  return (
    <div className="max-w-4xl mx-auto mb-4 no-print">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-neumorphism hover:shadow-neumorphismHover transition-shadow duration-200"
      >
        <FaDownload className="w-4 h-4" color="black" />
        Download as PDF
      </button>
    </div>
  );
};

export default PDFDownloadButton;