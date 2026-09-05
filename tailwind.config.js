module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/app/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary-color-default)",
          light: "var(--primary-color-light)",
          darker: "var(--primary-color-darker)",
        },
        secondary: {
          DEFAULT: "var(--secondary-color-default)",
          light: "var(--secondary-color-light)",
          darker: "var(--secondary-color-darker)",
        },
        accent: {
          DEFAULT: "var(--accent-color-default)",
        },
        surface: {
          card: "var(--card-color-default)",
        },
        text: {
          DEFAULT: "var(--text-color-default)",
          sub: "var(--text-sub-color-default)",
        },
      },
    },
  },
  plugins: [],
};
