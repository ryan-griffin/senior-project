/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                grow: {
                    "0%": { opacity: 0, transform: "scale(0.75)" },
                    "100%": { opacity: 1, transform: "scale(1)" },
                },
            },
            animation: { grow: "grow 200ms" },
        },
    },
    plugins: [],
};
