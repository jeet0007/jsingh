import React from "react";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className = "" }) => {
  return (
    <h2 className={`text-2xl font-bold text-gray-800 dark:text-gray-200 border-b-2 border-gray-200 pb-2 mb-4 ${className}`}>
      {title}
    </h2>
  );
};

export default SectionHeader;