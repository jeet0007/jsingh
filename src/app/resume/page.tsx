"use client";

import React, { useRef } from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaDownload } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import SectionHeader from "../../components/resume/SectionHeader";
import JobRole from "../../components/resume/JobRole";
import SkillCategory from "../../components/resume/SkillCategory";

const ResumePage: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  // Job roles data
  const jobRoles = [
    {
      title: "Associate Software Architect",
      period: "July 2024 – Present",
      responsibilities: [
        "Design and architect scalable, high-performance software solutions for enterprise-level SaaS products.",
        "Lead code reviews, establish best practices, and mentor developers to ensure high-quality code and adherence to design patterns.",
        "Drive the technical roadmap by evaluating new technologies and defining the SDLC and CI/CD strategies.",
      ],
    },
    {
      title: "Full-stack Developer + Technical Account Officer",
      period: "August 2022 – August 2024",
      responsibilities: [
        "Managed a portfolio of 10 key client accounts with project values ranging from 1M to 4M THB each.",
        "Served as the primary technical point of contact, ensuring high client satisfaction through expert support and problem-solving.",
        "Developed and implemented custom solutions based on client needs, bridging the gap between technical teams and business requirements.",
      ],
    },
    {
      title: "Full Stack Developer (Junior)",
      period: "May 2021 – August 2022",
      responsibilities: [
        "Initiated and developed a reusable video call client using React, Redux-Saga, and Socket.IO, creating a standard real-time solution for future projects.",
        "Engineered a backend service with Node.js and Express for scalable document and image management, utilizing AWS S3 and PostgreSQL.",
        "Successfully integrated modern video calling capabilities into a 5-year-old legacy application to enable remote product sales.",
        "Contributed to the end-to-end development of an e-KYC application featuring in-house OCR and video services.",
      ],
    },
  ];

  // Skills data
  const skillCategories = [
    {
      title: "Languages",
      skills: ["TypeScript", "JavaScript", "Java"],
      color: "gray" as const,
    },
    {
      title: "Front-End",
      skills: ["React", "Next.js", "Angular", "Redux-Saga"],
      color: "blue" as const,
    },
    {
      title: "Back-End",
      skills: ["Node.js", "Express.js", "Spring Boot", "Socket.IO"],
      color: "green" as const,
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Redis"],
      color: "purple" as const,
    },
    {
      title: "DevOps & CI/CD",
      skills: ["Docker", "Jenkins", "Argo CD", "AWS S3"],
      color: "orange" as const,
    },
    {
      title: "Methodologies & Tools",
      skills: ["Agile", "SDLC", "Unit Testing", "Jira"],
      color: "indigo" as const,
    },
  ];

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
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
      }
    `,
  });

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      {/* Download Button - Hidden in Print */}
      <div className="max-w-4xl mx-auto mb-4 no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-neumorphism hover:shadow-neumorphismHover transition-shadow duration-200"
        >
          <FaDownload className="w-4 h-4" color="black" />
          Download as PDF
        </button>
      </div>

      <div
        ref={componentRef}
        className="max-w-4xl mx-auto bg-white shadow-neumorphism rounded-lg p-6 sm:p-8 md:p-12 print-container"
      >
        {/* Header Section */}
        <header className="text-center border-b border-gray-200 pb-8 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Taranjit Singh
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-6">
            Full-Stack Developer & Software Architect
          </p>
          <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <span className="flex items-center">
              <FaPhone className="mr-2" />
              +66 98-806-5864
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center">
              <FaEnvelope className="mr-2" />
              taranjeet0007@gmail.com
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <a
              href="https://www.linkedin.com/in/taranjeet-singh-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaLinkedin className="mr-2" />
              linkedin.com/in/taranjeet-singh-dev
            </a>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-12 print-grid">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-10">
            {/* Profile Summary */}
            <section>
              <SectionHeader title="Profile" />
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A results-driven Software Architect and Full-Stack Engineer with
                over 4 years of experience delivering robust SaaS products from
                concept to deployment. Demonstrates a clear history of career
                progression and technical leadership. Combines deep expertise in
                modern web technologies with client-facing skills, serving as a
                Solution Consultant to manage and foster strong partner
                relationships.
              </p>
            </section>

            {/* Work Experience */}
            <section>
              <SectionHeader title="Work Experience" className="mb-6" />
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-neumorphism">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      AppMan
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      May 2021 – Present
                    </p>
                  </div>

                  {jobRoles.map((role, index) => (
                    <JobRole
                      key={role.title}
                      title={role.title}
                      period={role.period}
                      responsibilities={role.responsibilities}
                      className={index < jobRoles.length - 1 ? "mb-6" : ""}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-10">
            {/* Expertise/Skills */}
            <section>
              <SectionHeader title="Expertise" />
              <div className="space-y-6">
                {skillCategories.map((category) => (
                  <SkillCategory
                    key={category.title}
                    title={category.title}
                    skills={category.skills}
                    color={category.color}
                  />
                ))}
              </div>
            </section>

            {/* Languages */}
            <section>
              <SectionHeader title="Languages" />
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>English</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    (Fluent)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Thai</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    (Fluent)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hindi</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    (Fluent)
                  </span>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <SectionHeader title="Education" />
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Assumption University
                  </span>
                  <span className="flex text-gray-600 dark:text-gray-400 text-sm">
                    2017 – 2021
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Bachelor of Computer Science
                  </span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResumePage;
