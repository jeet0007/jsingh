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