import { createContext } from "react";
export const ThemeContext = createContext({
  theme: "",
  setTheme: (theme) => {
    console.log(theme);
  },
});
