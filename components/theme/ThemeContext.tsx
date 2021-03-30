import React, { useContext } from "react";

type ThemeContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
const ThemeContext = React.createContext<ThemeContext | undefined>(undefined);

const ThemeProvider: React.FC = (props) => {
  const { children } = props;

  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return window.__theme;
    }
    return "light";
  });

  React.useEffect(() => {
    let __onThemeChange: typeof window.__onThemeChange | undefined = undefined;
    if (typeof window !== "undefined") {
      __onThemeChange = window.__onThemeChange;
      window.__onThemeChange = (newTheme) => setTheme(newTheme);
    }

    return () => {
      if (typeof window !== "undefined" && __onThemeChange !== undefined) {
        window.__onThemeChange = __onThemeChange;
      }
    };
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme !== window.__theme) {
        window.__setPreferredTheme(theme);
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { useThemeContext, ThemeProvider };
