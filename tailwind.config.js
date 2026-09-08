/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Poppins", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "30px",
        lg: "0",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        dark: "#020617",
        panel: "#0b1220",
        neon: "#38bdf8",
        neonSoft: "#7dd3fc",
        muted: "#94a3b8",
        danger: "#f87171",
      },

      backgroundImage: {
        hero: "url('./img/bghero.png')",
      },

      boxShadow: {
        neon: "0 0 40px rgba(56,189,248,0.25)",
      },
    },
  },
  plugins: [],
};
