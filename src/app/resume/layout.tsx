import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taranjit Singh - Resume | Full-Stack Developer & Software Architect",
  description: "Resume of Taranjit Singh, a results-driven Software Architect and Full-Stack Engineer with over 4 years of experience delivering robust SaaS products. Expert in React, Node.js, TypeScript, and modern web technologies.",
  keywords: [
    "Taranjit Singh",
    "Software Architect", 
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "JavaScript",
    "Software Engineer",
    "Bangkok Developer",
    "Thailand Developer",
    "SaaS Development",
    "Technical Account Manager",
    "Resume",
    "CV"
  ],
  authors: [{ name: "Taranjit Singh" }],
  openGraph: {
    title: "Taranjit Singh - Resume | Full-Stack Developer & Software Architect",
    description: "Resume of Taranjit Singh, a results-driven Software Architect and Full-Stack Engineer with over 4 years of experience delivering robust SaaS products.",
    type: "profile",
    url: "/resume",
    siteName: "Taranjit Singh Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taranjit Singh - Resume | Full-Stack Developer & Software Architect", 
    description: "Resume of Taranjit Singh, a results-driven Software Architect and Full-Stack Engineer with over 4 years of experience delivering robust SaaS products.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}