import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import "@fontsource/dm-sans";
import QueryProvider from '../components/QueryProvider';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
	title: {
		default: "Jeet Singh | Full Stack Developer",
		template: "%s | Jeet Singh"
	},
	description: "Full Stack Developer specializing in web development, tools, and automation. Explore my portfolio and developer tools.",
	keywords: ["Full Stack Developer", "Web Development", "React", "Next.js", "Developer Tools", "JavaScript", "TypeScript"],
	authors: [{ name: "Jeet Singh" }],
	creator: "Jeet Singh",
	publisher: "Jeet Singh",
	formatDetection: {
		email: false,
		telephone: false,
	},
	metadataBase: new URL('https://jsingh.dev'),
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://jsingh.dev',
		siteName: 'Jeet Singh',
		title: 'Jeet Singh | Full Stack Developer',
		description: 'Full Stack Developer specializing in web development, tools, and automation. Explore my portfolio and developer tools.',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Jeet Singh - Full Stack Developer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Jeet Singh | Full Stack Developer',
		description: 'Full Stack Developer specializing in web development, tools, and automation',
		images: ['/og-image.png'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	// Removed verification since DNS-based verification is being used
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Jeet Singh",
		"url": "https://jsingh.dev",
		"description": "Full Stack Developer specializing in web development, tools, and automation",
		"author": {
			"@type": "Person",
			"name": "Jeet Singh",
			"jobTitle": "Full Stack Developer",
			"url": "https://jsingh.dev"
		},
		"offers": [
			{
				"@type": "SoftwareApplication",
				"name": "JSON/YAML Format Converter",
				"applicationCategory": "DeveloperApplication",
				"url": "https://jsingh.dev/tools/format-converter",
				"offers": {
					"@type": "Offer",
					"price": "0"
				}
			},
			{
				"@type": "SoftwareApplication",
				"name": "URL to Screenshot",
				"applicationCategory": "DeveloperApplication",
				"url": "https://jsingh.dev/tools/url-to-screenshot",
				"offers": {
					"@type": "Offer",
					"price": "0"
				}
			},
			{
				"@type": "SoftwareApplication",
				"name": "HLS Player",
				"applicationCategory": "DeveloperApplication",
				"url": "https://jsingh.dev/tools/hls-player",
				"offers": {
					"@type": "Offer",
					"price": "0"
				}
			}
		]
	};

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="canonical" href="https://jsingh.dev" />
				<JsonLd data={websiteSchema} />
			</head>
			<body className="bg-background">
				<QueryProvider>
					{children}
				</QueryProvider>
			</body>
		</html>
	);
}
