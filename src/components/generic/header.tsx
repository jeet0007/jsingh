"use client";
import classNames from "classnames";
import React, { useState } from "react";
import { LinkButton } from "./LinkButton";

const headerLinks = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "#about" },
	{ name: "Projects", href: "#projects" },
	{ name: "Blog", href: "#blog" },
	{ name: "Contact", href: "#contact" },
];

export const Header = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	return (
		<div id="header" className="sticky top-0 bg-white z-50">
			<nav className="flex justify-between items-center p-4">
				<div className="text-xl font-bold">Logo</div>
				<div className="hidden md:flex space-x-4">
					{headerLinks.map(({ name, href }) => (
						<LinkButton
							key={name}
							href={href}
							classNames={classNames(
								"bg-background font-bold text-primary tracking-wider rounded-3xl",
								"px-4 py-2 md:px-6 md:py-4 border-none outline-none cursor-pointer",
								"text-xs sm:text-sm md:text-base",
							)}
						>
							{name}
						</LinkButton>
					))}
				</div>
				<div className="md:hidden">
					<button
						onClick={toggleDropdown}
						className="text-gray-500 hover:text-gray-700 focus:outline-none"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"
							></path>
						</svg>
					</button>
				</div>
			</nav>
			{isDropdownOpen && (
				<div className="md:hidden bg-white shadow-lg">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						{headerLinks.map(({ name, href }) => (
							<LinkButton
								key={name}
								href={href}
								onClick={toggleDropdown}
								classNames={classNames(
									"block px-3 py-2 rounded-md text-base font-medium",
									"text-gray-700 hover:text-gray-900 hover:bg-gray-50",
									"focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out",
								)}
							>
								{name}
							</LinkButton>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
