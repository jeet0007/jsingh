import Image from "next/image";
import type React from "react";
import { FaEnvelope, FaLinkedin, FaPhone } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";
import SkillCategory from "./SkillCategory";

// Static data - can be moved to a separate file if needed
const companySummary =
	"Progressed from Junior Developer to Associate Software Architect over 4 years at AppMan, demonstrating consistent growth in technical leadership and client management. Led the development of enterprise SaaS solutions, managed high-value client portfolios (1M-4M THB), and established development best practices. Drove technical roadmaps, mentored development teams, and served as a key solution consultant bridging technical and business requirements.";

const projects = [
	{
		title: "e-KYC Digital Identity Verification System",
		period: "2021-2023",
		description:
			"Developed a comprehensive digital identity verification platform with OCR capabilities, video onboarding, and API integration for financial institutions and enterprises.",
		technologies: ["React", "Node.js", "OCR APIs", "AI/ML", "Video Processing"],
		impact:
			"Processed 100K+ identity verifications with 95% accuracy, preventing online fraud",
	},
	{
		title: "Video Onboarding & Survey Platform",
		period: "2021-2022",
		description:
			"Built an intelligent video verification system with real-time document exchange, automatic OCR capabilities, and remote identity verification for seamless customer onboarding.",
		technologies: ["React", "Redux-Saga", "Socket.IO", "WebRTC", "OCR"],
		impact:
			"Reduced onboarding time by 75% and increased customer conversion rates",
	},
	{
		title: "Document Statement Verification System",
		period: "2022-2023",
		description:
			"Architected an AI-powered document data extraction platform with strong Thai language processing capabilities and multi-format document support.",
		technologies: ["Node.js", "AI/ML", "NLP", "AWS S3", "PostgreSQL"],
		impact: "Automated 90% of document processing tasks with 98% accuracy",
	},
	{
		title: "Background Checker Platform",
		period: "2022-2024",
		description:
			"Developed a comprehensive employee background verification system supporting PDPA standards with quick digital verification processes for enterprise clients.",
		technologies: ["React", "Node.js", "Express", "MySQL", "API Integration"],
		impact:
			"Streamlined HR processes for 50+ enterprise clients, reducing verification time by 80%",
	},
	{
		title: "AI ChatBot Solution (AppMan Chat Center)",
		period: "2023-Present",
		description:
			"Designed and implemented an AI-powered chatbot platform to enhance customer service capabilities with intelligent conversation flows and multi-channel support.",
		technologies: ["React", "Node.js", "AI/ML", "NLP", "Socket.IO"],
		impact:
			"Improved customer response time by 60% and handled 10K+ daily interactions",
	},
	{
		title: "InsurTech Digital Platform",
		period: "2022-Present",
		description:
			"Built a comprehensive digital insurance technology solution covering sales automation, risk assessment, and post-sales service management for insurance industry clients.",
		technologies: ["React", "Node.js", "Microservices", "Docker", "Jenkins"],
		impact:
			"Digitized insurance operations for 20+ companies, reducing processing time by 70%",
	},
];

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

interface ResumeContentProps {
	forwardRef?: React.RefObject<HTMLDivElement | null>;
}

const ResumeContent: React.FC<ResumeContentProps> = ({ forwardRef }) => {
	return (
		<div
			ref={forwardRef}
			className="max-w-4xl mx-auto bg-white shadow-neumorphism rounded-lg p-6 sm:p-8 md:p-12 print-container"
		>
			{/* Header Section */}
			<header className="text-center border-b border-gray-200 pb-8 mb-8">
				<div className="flex flex-col items-center mb-6">
					<div className="w-32 h-32 rounded-full overflow-hidden shadow-neumorphism mb-4">
						<Image
							src="/jeet.jpeg"
							alt="Taranjit Singh Profile Photo"
							width={128}
							height={128}
							className="w-full h-full object-cover"
							priority
						/>
					</div>
					<h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-2">
						Taranjit Singh
					</h1>
					<p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-6">
						Full-Stack Developer & Software Architect
					</p>
				</div>
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

								<p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
									{companySummary}
								</p>
							</div>
						</div>
					</section>

					{/* Key Projects */}
					<section>
						<SectionHeader title="Key Projects" className="mb-6" />
						<div className="space-y-6">
							{projects.map((project, index) => (
								<ProjectCard
									key={project.title}
									title={project.title}
									period={project.period}
									description={project.description}
									technologies={project.technologies}
									impact={project.impact}
									className={index < projects.length - 1 ? "mb-6" : ""}
								/>
							))}
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
	);
};

export default ResumeContent;
