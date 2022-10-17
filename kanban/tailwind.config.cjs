/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        black: "#000112",
        "very-dark-grey": "#20212C",
        "lines-dark": "#3E3F4E",
        "medium-grey": "#828FA3",
        "lines-light": "#E4EBFA",
        "light-grey": "#F4F7FD",
        white: "#FFFFFF",
        "main-purple": "#635FC7",
        "main-purple-hover": "#A8A4FF",
        "gray-dark": "#2B2C37",
        red: "#EA5555",
        "red-hover": "#FF9898",
      },
    },
  },
};
