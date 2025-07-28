import React from "react";
import SkillTag from "./SkillTag";

interface ProjectCardProps {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  impact: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  period, 
  description, 
  technologies, 
  impact, 
  className = "" 
}) => {
  return (
    <div className={`border-l-4 border-blue-500 pl-4 ${className}`}>
      <div className="flex justify-between items-baseline mb-2">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h4>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {period}
        </span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 leading-relaxed">
        {description}
      </p>
      
      <div className="mb-3">
        <div className="flex flex-wrap gap-1">
          {technologies.map((tech) => (
            <SkillTag key={tech} skill={tech} color="gray" />
          ))}
        </div>
      </div>
      
      <div className="text-sm text-green-700 dark:text-green-400 font-medium italic">
        Impact: {impact}
      </div>
    </div>
  );
};

export default ProjectCard;