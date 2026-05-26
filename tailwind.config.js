/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A6B8A",
          dark: "#145570",
          light: "#2A8BAA",
          50: "#E8F4F8",
          100: "#C5E4ED",
          200: "#A8D8E8",
          300: "#7CC0D4",
          400: "#4DA8C0",
          500: "#1A6B8A",
          600: "#145570",
          700: "#0F4058",
          800: "#0A2B3D",
          900: "#051620",
        },
        accent: {
          DEFAULT: "#F8D7DA",
          dark: "#F1AEB5",
          light: "#FDE8EA",
          pink: "#F8D7DA",
          salmon: "#F5B7B1",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F5F9FB",
          card: "#FFFFFF",
          muted: "#F0F4F7",
        },
        content: {
          primary: "#1A2B3C",
          secondary: "#5A6B7C",
          muted: "#8A9BAC",
          inverse: "#FFFFFF",
        },
        success: {
          DEFAULT: "#28A745",
          light: "#D4EDDA",
        },
        warning: {
          DEFAULT: "#FFC107",
          light: "#FFF3CD",
        },
        danger: {
          DEFAULT: "#DC3545",
          light: "#F8D7DA",
        },
        border: {
          DEFAULT: "#E0E8ED",
          light: "#F0F4F7",
        },
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
        worksans: ["WorkSans_400Regular"],
        "worksans-medium": ["WorkSans_500Medium"],
        "worksans-semibold": ["WorkSans_600SemiBold"],
        "worksans-bold": ["WorkSans_700Bold"],
      },
      borderRadius: {
        card: "16px",
        button: "12px",
        input: "12px",
        badge: "20px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
