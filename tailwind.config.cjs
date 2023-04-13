/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#802c6e",
        primaryDark: "#b7449e",
      },
      screens: {
        extremeSm: "370px",
        ultraSm: "430px",
        ssm: "510px",
        // => @media (min-width: 510px) { ... }
      },
      boxShadow: {
        top: "0 -15px 15px -15px rgb(0 0 0 / 0.25)",
      },
    },
  },
  plugins: [],
};
