import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import { Header } from "../components/generic/header";
import "@fontsource/dm-sans"; // Defaults to weight 400

export const metadata: Metadata = {
	title: "Jeet Singh",
	description: "A look into the work life of Jeet Singh",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<body className="bg-background">
				<Header />
				{children}
			</body>
		</html>
	);
}
