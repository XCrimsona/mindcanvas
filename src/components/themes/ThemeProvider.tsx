import { createContext, useState } from "react";

//An interface selection for any pref
type Theme =
  | "system"
  | "light"
  | "dark"
  | "beige"
  | "light-pink"
  | "dark-maroon"
  | "dark-pink"
  | "cyan-blue"
  | "grey"
  | "ash";

interface ColorThemeType {
  theme: Theme;
}
const themeContext = createContext<ColorThemeType>({
  theme: "system",
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themePref, setThemePref] = useState<Theme>("system");

  //progress to be continued...
};

export default ThemeProvider;
