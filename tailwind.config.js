const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: false,
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        gray: colors.warmGray,
      },
      backgroundColor: {
        primary: "var(--bg-primary)",
        surface: "var(--bg-surface)",
        surfaceLifted: "var(--bg-surface-lifted)",
      },
      textColor: {
        primary: "var(--text-primary)",
        primaryLight: "var(--text-primary-light)",
        secondaryLight: "var(--text-secondary-light)",
        secondary: "var(--text-secondary)",
        caption: "var(--text-caption)",
        strong: "var(--text-strong)",
      },
      typography: {
        DEFAULT: {
          css: [
            {
              color: "var(--text-primary)",
              '[class~="lead"]': {
                color: "var(--text-primary-light)",
              },
              a: {
                color: "var(--text-strong)",
              },
              strong: {
                color: "var(--text-strong)",
              },
              "ol > li::before": {
                color: "var(--text-caption)",
              },
              "ul > li::before": {
                backgroundColor: "var(--text-secondary)",
              },
              hr: {
                borderColor: "var(--text-secondary-light)",
              },
              blockquote: {
                color: "var(--text-strong)",
              },
              h1: {
                color: "var(--text-strong)",
              },
              h2: {
                color: "var(--text-strong)",
              },
              h3: {
                color: "var(--text-strong)",
              },
              h4: {
                color: "var(--text-strong)",
              },
              "figure figcaption": {
                color: "var(--text-caption)",
              },
              code: {
                color: "var(--text-strong)",
              },
              "a code": {
                color: "var(--text-strong)",
              },
              pre: {
                color: "var(--pre-color)",
                backgroundColor: "var(--pre-background)",
              },
              "pre code": {
                backgroundColor: "transparent",
                color: "inherit",
              },
              thead: {
                color: "var(--text-strong)",
                borderBottomColor: "var(--text-secondary)",
              },
              "tbody tr": {
                borderBottomColor: "var(--text-secondary-light)",
              },
            },
          ],
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
