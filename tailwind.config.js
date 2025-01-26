/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#346DE0",
          hover: "#346DE01A",
          yellow: "#FF9D0E",
          blue: "#346DE0",
          "light-blue": "#EBF0FC",
          "light-gray": "#808080",
          "dark-gray": "#373737",
        },
        error: {
          DEFAULT: "#D80707",
        },
        gray: {
          DEFAULT: "#D0D0D0",
          900: "#808080",
        },
        blue: {
          DEFAULT: "#346DE0",
        },
        purple: {
          DEFAULT: "#9747FF",
        },
        black: {
          DEFAULT: "#000000",
          700: "#373737",
        },
      },
      boxShadow: {
        "50": "0 0 4px 0 rgba(0, 0, 0, 0.05)",
        "100": "0 0 8px 0 rgba(0, 0, 0, 0.1)",
        // "primary": {
        //   "blue": "0_0_16px_0_rgba(52,109,224,0.60)",
        // },
      },
      // fontFamily: {
      //   outfit: ["Outfit", "Inter", "sans-serif"],
      // },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
