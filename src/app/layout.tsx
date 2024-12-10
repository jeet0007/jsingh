import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import "@fontsource/dm-sans"; // Defaults to weight 400
import QueryProvider from '../components/QueryProvider';

export const metadata: Metadata = {
	title: "Jeet Singh | Personal Website",
	description: "Personal website and portfolio of Jeet Singh",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<body className="bg-background">
				<QueryProvider>
					{children}
				</QueryProvider>
			</body>
		</html>
	);
}
