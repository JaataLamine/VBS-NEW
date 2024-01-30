/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cvert: "#2F4F4F",
        crose: "#FFE4E1",
        cblue: "#B2DCFA",
      },
      fontFamily: {
        montserrat: ["Montserrat", "Sans-serif"],
        robotoslab: ["Roboto Slab", "Sans-serif"],
        roboto: ["Roboto", "Sans-serif"],
      },
    },
    letterSpacing: {
      widestter: "1.5em",
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
