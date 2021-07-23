import tw, { css, theme } from "twin.macro";

// this is how we compute the mapping from light gray to dark gray
// 700 → 300
// 200 → 700
// 300 → 600
// 500 → 400
// 900 → 200
// 600 → 300
// 800 → 300

export const stylesBase = css`
  .light {
    --bg-primary: ${theme`colors.gray.50`};
    --bg-surface: ${theme`colors.gray.50`};
    --bg-surface-lifted: ${theme`colors.gray.50`};

    --text-primary: ${theme`colors.gray.700`};
    --text-primary-light: ${theme`colors.gray.600`};
    --text-secondary-light: ${theme`colors.gray.200`};
    --text-secondary: ${theme`colors.gray.300`};
    --text-caption: ${theme`colors.gray.500`};
    --text-strong: ${theme`colors.gray.900`};
    --pre-color: ${theme`colors.gray.200`};
    --pre-background: ${theme`colors.gray.800`};
  }

  .dark {
    --bg-primary: ${theme`colors.gray.900`};
    --bg-surface: ${theme`colors.gray.800`};
    --bg-surface-lifted: ${theme`colors.gray.700`};

    --text-primary: ${theme`colors.gray.300`};
    --text-primary-light: ${theme`colors.gray.300`};
    --text-secondary-light: ${theme`colors.gray.700`};
    --text-secondary: ${theme`colors.gray.600`};
    --text-caption: ${theme`colors.gray.400`};
    --text-strong: ${theme`colors.gray.200`};
    --pre-color: ${theme`colors.gray.200`};
    --pre-background: ${theme`colors.gray.800`};
  }

  body {
    ${tw`bg-primary text-primary`}
  }

  body.light,
  body.dark {
    ${tw`transition-colors duration-200`}
  }
`;
