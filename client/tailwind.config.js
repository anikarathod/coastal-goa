/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:  "#0B2A3F",   // deep ocean — headings, footer, dark bands
          teal:  "#0E7C8A",   // primary action color
          cyan:  "#4FC3D9",   // hover / decorative accents
          gold:  "#C89A3F",   // price tags, secondary buttons, luxury accents
          sand:  "#F7F3EC",   // soft section background
          coral: "#E85A4F",   // sale badges, alerts
          palm:  "#2C5F4A",   // success states
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        // Reusable gradients
        "brand-gradient":    "linear-gradient(135deg, #0E7C8A 0%, #4FC3D9 100%)",
        "brand-gold":        "linear-gradient(135deg, #C89A3F 0%, #E0B65A 100%)",
        "brand-navy":        "linear-gradient(180deg, #0B2A3F 0%, #0A2434 100%)",
        "brand-divider":     "linear-gradient(90deg, #0E7C8A 0%, #4FC3D9 50%, #C89A3F 100%)",
      },
      boxShadow: {
        "brand-sm": "0 2px 8px rgba(14, 124, 138, 0.08)",
        "brand":    "0 8px 24px rgba(14, 124, 138, 0.12)",
        "brand-lg": "0 16px 40px rgba(11, 42, 63, 0.16)",
        "gold":     "0 8px 24px rgba(200, 154, 63, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "shimmer": "shimmer 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};