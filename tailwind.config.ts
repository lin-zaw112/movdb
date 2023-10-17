import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle closest-side,var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        loading: "l24 1s infinite alternate linear",
      },
      keyframes: {
        // wiggle: {
        //   "0%, 100%": { transform: "rotate(-3deg)" },
        //   "50%": { transform: "rotate(3deg)" },
        // },
        l24: {
          "100%": {
            "background-position": "left",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
