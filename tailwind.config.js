/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: colors.blue,
        "og-red": colors.red,
      },
      height: {
        calc64px: "calc(100vh - 64px)",
      },
    },
  },
  plugins: [],
};
