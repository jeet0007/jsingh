import React from "react";

interface SkillTagProps {
  skill: string;
  color: "gray" | "blue" | "green" | "purple" | "orange" | "indigo";
}

const colorMap = {
  gray: "bg-gray-600",
  blue: "bg-blue-600", 
  green: "bg-green-600",
  purple: "bg-purple-600",
  orange: "bg-orange-600",
  indigo: "bg-indigo-600",
};

const SkillTag: React.FC<SkillTagProps> = ({ skill, color }) => {
  return (
    <span 
      className={`${colorMap[color]} text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm skill-tag`}
    >
      {skill}
    </span>
  );
};

export default SkillTag;