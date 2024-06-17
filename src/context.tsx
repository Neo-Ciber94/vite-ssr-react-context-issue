import { createContext, useContext } from "react";

export type Theme = "dark" | "light";

console.log("### importing context.tsx (this should happen once)");
export const ThemeContext = createContext<Theme | null>(null);

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('"ThemeContext" was not available');
  }

  return theme;
}
