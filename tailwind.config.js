/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      primary: "##708090",
      secondary: "#2D4CC8",
      tertiary: "#e6e7ee",
      text: "#EEEEEE",
      background: "#EEEEEE",
    },
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
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        neumorphism:
          "-6px -6px 14px rgba(255,255,255,0.4), -6px -6px 10px rgba(255,255,255,0.3), 6px 6px 8px rgba(255,255,255,0.1), 6px 6px 10px rgba(0,0,0,0.1)",
        neumorphismHover:
          "-2px -2px 6px rgba(255, 255, 255, .6),\
              -2px -2px 4px rgba(255, 255, 255, .4),\
              2px 2px 2px rgba(255, 255, 255, .05),\
              2px 2px 4px rgba(0, 0, 0, .1)",
        neumorphismActive:
          "2px 2px 2px rgba(255,255,255,0.5), inset -1px -1px 2px rgba(255,255,255,0.3), inset 1px 1px 2px rgba(0,0,0,0.1), inset 1px 2px 3px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-neumorphism")],
};
