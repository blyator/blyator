module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sono: ["Sono", "sans-serif"],
        indie: ["'Indie Flower'", "cursive"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        glowPulse: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))",
          },
          "50%": {
            filter: "drop-shadow(0 0 15px rgba(0, 255, 255, 0.8))",
          },
        },
      },
      animation: {
        blink: "blink 1s steps(2, start) infinite",
        spinSlow: "spinSlow 20s linear infinite",
        glowPulse: "glowPulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
