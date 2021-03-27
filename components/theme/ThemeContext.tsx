import React, { useContext } from "react";

type Theme = "light" | "dark";
const isTheme = (val: any): val is Theme => {
  return typeof val === "string" && (val === "light" || val === "dark");
};

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (isTheme(storedPrefs)) {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  return "dark";
};

type ThemeContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
const ThemeContext = React.createContext<ThemeContext | undefined>(undefined);

interface ThemeProviderProps {
  initialTheme?: Theme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { initialTheme, children } = props;

  const [theme, setTheme] = React.useState<Theme>(() => getInitialTheme());

  const rawSetTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { useThemeContext, ThemeProvider };
