import React from "react";
import SkillTag from "./SkillTag";

interface SkillCategoryProps {
  title: string;
  skills: string[];
  color: "gray" | "blue" | "green" | "purple" | "orange" | "indigo";
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, color }) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill} skill={skill} color={color} />
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;