module.exports = {
  // ...
  plugins: [require("@tailwindcss/typography")],
  theme: {
    screens: {
      sm: `640px`,
      md: `768px`,
      lg: `1024px`,
      xl: `1280px`,
      "2xl": `1536px`,
    },
    typography: {
      default: {
        css: {
          // disable backticks in inline code blocks
          "code::before": {
            content: '""',
          },
          "code::after": {
            content: '""',
          },
          // ...
        },
      },
    },
  },
};
