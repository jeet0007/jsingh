import React from "react";

interface JobRoleProps {
  title: string;
  period: string;
  responsibilities: string[];
  className?: string;
}

const JobRole: React.FC<JobRoleProps> = ({ title, period, responsibilities, className = "" }) => {
  return (
    <div className={className}>
      <p className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">
        {title}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {period}
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
        {responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobRole;