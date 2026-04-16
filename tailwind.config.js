/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		neumorphismSize: {
			xs: "0.05em",
			sm: "0.1em",
			default: "0.2em",
			lg: "0.4em",
			xl: "0.8em",
		},
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		fontFamily: {
			sans: ["DM Sans", "sans-serif"],
			serif: ["Merriweather", "serif"],
		},
		extend: {
			colors: {
				background: "#EEEEEE",
			},
			spacing: {
				128: "32rem",
				144: "36rem",
			},
			borderRadius: {
				"4xl": "2rem",
			},
			boxShadow: {
				neumorphism: "4px 4px 6px 0 rgba(0, 0, 0, 0.1), -4px -4px 6px 0 rgba(255, 255, 255, 0.7)",
				neumorphismHover: "-2px -2px 6px rgba(255, 255, 255, .6), -2px -2px 4px rgba(255, 255, 255, .4), 2px 2px 2px rgba(255, 255, 255, .05), 2px 2px 4px rgba(0, 0, 0, .1)",
				neumorphismActive: "inset 4px 4px 6px 0 rgba(0, 0, 0, 0.1), inset -4px -4px 6px 0 rgba(255, 255, 255, 0.7)",
				neumorphismInput: "2px 2px 4px 0 rgba(0, 0, 0, 0.1), -2px -2px 4px 0 rgba(255, 255, 255, 0.7)",
				neumorphismInputActive: "inset 2px 2px 4px 0 rgba(0, 0, 0, 0.1), inset -2px -2px 4px 0 rgba(255, 255, 255, 0.7)",
			},
			animation: {
				'spin-slow': 'spin 1.5s linear infinite'
			}
		},
	},
	plugins: [require("tailwindcss-neumorphism")],
};
