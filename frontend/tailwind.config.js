const tokens = require("./tokens.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: tokens.colors,
        fontFamily: {
            barlow: ["var(--font-barlow)"],
            "play-fair-display": ["var(--font-play-fair-display)"],
        },
        fontSize: tokens.fontSize,
        fontWeight: tokens.fontWeight,
        lineHeight: tokens.lineHeight,
        letterSpacing: tokens.letterSpacing,
        borderWidth: tokens.borderWidth,
        borderRadius: tokens.borderRadius,
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                lg: "2rem",
            },
        },
        extend: {},
    },
    plugins: [],
};