import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaEnvelope, FaLinkedin, FaPlay } from "react-icons/fa";
import ToolCard from "../components/ToolCard";
import { ROUTES } from "../config/routes";

const stats = [
	{ value: "5", label: "Years at AppMan" },
	{ value: "6", label: "Enterprise products" },
	{ value: "100K+", label: "Users processed" },
];

const featuredProjects = [
	{
		title: "e-KYC Digital Identity Verification",
		period: "2021–2023",
		description:
			"Digital identity platform with OCR, video onboarding, and API integration for financial institutions and enterprises.",
		tech: ["React", "Node.js", "OCR APIs", "AI/ML"],
		impact: "100K+",
		impactLabel: "verifications · 95% accuracy",
	},
	{
		title: "AI ChatBot Solution",
		period: "2023–Present",
		description:
			"Multi-channel AI chatbot platform with intelligent conversation flows for enterprise customer service.",
		tech: ["React", "Node.js", "NLP", "Socket.IO"],
		impact: "10K+",
		impactLabel: "daily interactions · 60% faster",
	},
	{
		title: "InsurTech Digital Platform",
		period: "2022–Present",
		description:
			"End-to-end insurance tech covering sales automation, risk assessment, and post-sales service management.",
		tech: ["React", "Microservices", "Docker", "Jenkins"],
		impact: "70%",
		impactLabel: "less processing time · 20+ companies",
	},
];

const techStack = [
	"TypeScript",
	"React",
	"Next.js",
	"Node.js",
	"Express.js",
	"Spring Boot",
	"PostgreSQL",
	"Docker",
	"AWS S3",
	"Socket.IO",
	"Redis",
	"MongoDB",
];

export default function Page() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="px-4 pt-16 pb-8 md:px-12 md:pt-24 md:pb-12">
				<div className="max-w-5xl mx-auto">
					<p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-6">
						Full-Stack Developer & Software Architect · Bangkok
					</p>

					<div className="flex items-start justify-between gap-8 mb-8">
						<h1
							className="font-bold uppercase leading-[0.9] text-gray-800 flex-1"
							style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
						>
							Taranjit
							<br />
							Singh
						</h1>
						<div className="shrink-0 pt-2 hidden md:block">
							<div className="w-40 h-40 rounded-2xl overflow-hidden shadow-neumorphism">
								<Image
									src="/jeet.jpeg"
									alt="Taranjit Singh"
									width={160}
									height={160}
									className="w-full h-full object-cover"
									priority
								/>
							</div>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
						<div className="max-w-sm">
							<p className="text-gray-600 leading-relaxed mb-6">
								Nearly 5 years building enterprise SaaS at AppMan — from e-KYC identity platforms
								to AI chatbots. Expert in React, Node.js, and modern cloud
								infrastructure.
							</p>
							<div className="flex gap-3">
								<Link
									href={ROUTES.RESUME}
									className="flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-neumorphism active:shadow-neumorphismActive font-medium text-gray-800 text-sm transition-shadow duration-200"
								>
									Resume <FaArrowRight className="w-3 h-3" />
								</Link>
								<a
									href="https://www.linkedin.com/in/taranjeet-singh-dev/"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-neumorphism active:shadow-neumorphismActive font-medium text-gray-800 text-sm transition-shadow duration-200"
								>
									<FaLinkedin className="w-4 h-4" /> LinkedIn
								</a>
							</div>
						</div>

						{/* Stats */}
						<div className="flex gap-8">
							{stats.map((stat) => (
								<div key={stat.label}>
									<p className="text-3xl font-bold text-gray-800">{stat.value}</p>
									<p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
								</div>
							))}
						</div>
					</div>

					{/* Mobile photo */}
					<div className="mt-8 md:hidden">
						<div className="w-32 h-32 rounded-2xl overflow-hidden shadow-neumorphism">
							<Image
								src="/jeet.jpeg"
								alt="Taranjit Singh"
								width={128}
								height={128}
								className="w-full h-full object-cover"
								priority
							/>
						</div>
					</div>
				</div>
			</section>

			<div className="px-4 md:px-12">
				<div className="max-w-5xl mx-auto border-t border-gray-200" />
			</div>

			{/* Tech Stack */}
			<section className="px-4 py-10 md:px-12">
				<div className="max-w-5xl mx-auto">
					<p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
						Stack
					</p>
					<div className="flex flex-wrap gap-2">
						{techStack.map((tech) => (
							<span
								key={tech}
								className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 shadow-neumorphismInput"
							>
								{tech}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* Projects — bento layout */}
			<section className="px-4 py-12 md:px-12">
				<div className="max-w-5xl mx-auto">
					<div className="flex items-baseline justify-between mb-6">
						<h2 className="text-2xl font-bold text-gray-800">Projects</h2>
						<Link
							href={ROUTES.RESUME}
							className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
						>
							All 6 <FaArrowRight className="w-3 h-3" />
						</Link>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Featured — spans 2 rows */}
						<div className="rounded-2xl shadow-neumorphism p-8 flex flex-col gap-6 md:row-span-2">
							<div>
								<p className="text-xs text-gray-400 mb-2">
									{featuredProjects[0].period}
								</p>
								<h3 className="font-bold text-xl text-gray-800 leading-snug mb-3">
									{featuredProjects[0].title}
								</h3>
								<p className="text-gray-600 text-sm leading-relaxed">
									{featuredProjects[0].description}
								</p>
							</div>
							<div className="flex flex-wrap gap-2">
								{featuredProjects[0].tech.map((t) => (
									<span
										key={t}
										className="text-xs px-2.5 py-1 rounded-md bg-gray-200 text-gray-600"
									>
										{t}
									</span>
								))}
							</div>
							<div className="mt-auto pt-6 border-t border-gray-200">
								<p className="text-5xl font-bold text-gray-800 leading-none mb-1">
									{featuredProjects[0].impact}
								</p>
								<p className="text-sm text-gray-500">
									{featuredProjects[0].impactLabel}
								</p>
							</div>
						</div>

						{/* Smaller cards */}
						{featuredProjects.slice(1).map((project) => (
							<div
								key={project.title}
								className="rounded-2xl shadow-neumorphism p-6 flex flex-col gap-4"
							>
								<div>
									<p className="text-xs text-gray-400 mb-1">{project.period}</p>
									<h3 className="font-semibold text-gray-800 leading-snug">
										{project.title}
									</h3>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{project.tech.map((t) => (
										<span
											key={t}
											className="text-xs px-2 py-1 rounded-md bg-gray-200 text-gray-600"
										>
											{t}
										</span>
									))}
								</div>
								<div className="border-t border-gray-200 pt-4 mt-auto">
									<span className="text-2xl font-bold text-gray-800">
										{project.impact}
									</span>
									<span className="text-xs text-gray-500 ml-2">
										{project.impactLabel}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Tools */}
			<section className="px-4 py-12 md:px-12">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-2xl font-bold text-gray-800 mb-6">Tools</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						<ToolCard
							imageSrc="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/screenshot-512.png"
							name="URL to Image"
							description="Convert a URL to an image"
							route={ROUTES.URL_TO_SCREENSHOT}
						/>
						<ToolCard
							imageSrc="https://cdn0.iconfinder.com/data/icons/video-edit-tools/32/transition_conversion_convert_transfer_motion_split_slide-512.png"
							name="Format Converter"
							description="Convert between JSON and YAML formats"
							route={ROUTES.FORMAT_CONVERTER}
						/>
						<ToolCard
							icon={FaPlay}
							name="HLS Player"
							description="Stream HLS videos with episode tracking"
							route={ROUTES.HLS_PLAYER}
						/>
					</div>
				</div>
			</section>

			{/* Contact */}
			<section className="px-4 py-16 md:px-12 border-t border-gray-200">
				<div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div>
						<h2 className="text-2xl font-bold text-gray-800 mb-1">
							Get in touch
						</h2>
						<p className="text-gray-500">
							Open to new opportunities and interesting projects.
						</p>
					</div>
					<a
						href="mailto:taranjeet0007@gmail.com"
						className="flex items-center gap-2 px-6 py-3 rounded-lg shadow-neumorphism active:shadow-neumorphismActive font-medium text-gray-800 transition-shadow duration-200 self-start md:self-auto"
					>
						<FaEnvelope className="w-4 h-4" />
						taranjeet0007@gmail.com
					</a>
				</div>
			</section>
		</div>
	);
}
