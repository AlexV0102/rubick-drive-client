import { getItemLocalStorage, setItemLocalStorage } from "./localStorage";

export { setInitialTheme, handleThemeSwitch };

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

const setStoredTheme = setItemLocalStorage("theme");

const getPreferredTheme = () => {
  const storedTheme = getItemLocalStorage("theme");
  if (storedTheme) return storedTheme;
  return window.matchMedia(`(prefers-color-scheme: ${DARK_THEME})`).matches
    ? DARK_THEME
    : LIGHT_THEME;
};

const setTheme = (theme) => {
  const isAutoDark =
    theme === "auto" &&
    typeof window &&
    window.matchMedia(`(prefers-color-scheme: ${DARK_THEME})`).matches;
  const appliedTheme = isAutoDark ? DARK_THEME : theme;
  document.documentElement.setAttribute("data-bs-theme", appliedTheme);
};
const handleThemeSwitch = () => {
  const theme = getPreferredTheme() === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  setStoredTheme(theme);
  setTheme(theme);
};

const setInitialTheme = () => {
  setTheme(getPreferredTheme());
};

if (typeof window !== "undefined") setInitialTheme();
