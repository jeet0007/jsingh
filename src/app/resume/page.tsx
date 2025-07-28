"use client";

import React, { useRef } from "react";
import ResumeContent from "../../components/resume/ResumeContent";
import PDFDownloadButton from "../../components/resume/PDFDownloadButton";

const ResumePage: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <PDFDownloadButton contentRef={componentRef} />
      <ResumeContent forwardRef={componentRef} />
    </div>
  );
};

export default ResumePage;
