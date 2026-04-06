import { createContext } from "react";

export type ITheme = "dark" | "light" | "system";

type ThemeProviderState = {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
