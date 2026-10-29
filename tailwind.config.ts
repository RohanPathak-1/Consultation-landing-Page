import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0136CE",
        ink: "#0B1226",
        soft: "#EEF3FF",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(1, 54, 206, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
