/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f2af29", 
        secondary: "#474747", 
        background: "#e0e0ce", 
        text: "#000000",
        txtCard : "#1F384C", 
        accent: "#C7253E",
        accent2: "#FF6969", 
        bgForm: "#F6F8FA", 
        redDark : "#F93827",
        greenDark : "#16C47F",
        yellowDark : "#FFD65A",
        bgWhite : "#F6F8FA",
        greyDark : "#adb5bd"
      },
      backgroundImage: {
        gradientPrimary: "linear-gradient(to bottom right, #FFB330, #FFFCDE)",
      },
    },
    fontFamily: {
     
    }
  },
  plugins: [],
};
