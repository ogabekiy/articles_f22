/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin.js';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],
}

