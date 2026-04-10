/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0A2145",
          base: "#123D72",
          light: "#E6F4FF",
        },
      },
    },
  },
  plugins: [],
};
