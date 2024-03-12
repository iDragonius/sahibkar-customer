import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#0449b1",
        hero: "#0449b1",
        hover: "#0449b1",
        heading: "#0449b1",
        heading2: "#17D45B",
      },
      fontSize: {
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        28: "28px",
        32: "32px",
        40: "40px",
      },
      screens: {
        mb: "1440px",
        nb: "900px",
        tb: "1100px",
      },
    },
  },
  plugins: [],
};
export default config;
