// tailwind.config.js
const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './node_modules/@nextui-org/theme/dist/components/(button|tabs|code|input|select|select-item).js'
     './node_modules/@nextui-org/theme/dist/components/*.js'
  ],
  theme: {
    extend: {
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};