import type { Config } from "tailwindcss";

const config: Config = {
  // We keep 'class' strategy so our ThemeProvider can still toggle it
  darkMode: "class", 
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // This maps Tailwind colors to your CSS variables
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;