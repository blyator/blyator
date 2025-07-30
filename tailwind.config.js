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
      },
      animation: {
        blink: "blink 1s steps(2, start) infinite",
      },
    },
  },
  plugins: [],
};
