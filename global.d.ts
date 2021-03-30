// enable loading image files
declare module "*.svg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.gif";
declare module "*.mp4";

type Theme = "dark" | "light";

declare interface Window {
  __theme: Theme;
  __onThemeChange: (newTheme: Theme) => void;
  __setPreferredTheme: (newTheme: Theme) => void;
}
