/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		fontFamily: {
			...defaultTheme.fontFamily,
			sans: ["Comfortaa", ...defaultTheme.fontFamily.sans],
			display: ["Saira", ...defaultTheme.fontFamily.sans],
		},
	},
	plugins: [],
	mounted: function () {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	},
};
