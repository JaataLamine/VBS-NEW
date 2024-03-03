/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // screens: {
      //   sm: "480px",
      // },
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
      widestter: "0.85em",
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/aspect-ratio")],
};
