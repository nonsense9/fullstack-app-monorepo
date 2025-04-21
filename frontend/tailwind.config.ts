/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

export default {
    content: [
        './src/**/*.{html,js,ts,tsx}',
        './node_modules/preline/preline.js',
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ]

} satisfies Config;
