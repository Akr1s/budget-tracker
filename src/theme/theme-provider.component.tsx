import { ThemeProviderContext, type ITheme } from "@/theme/provider.constant";
import {
  LocalStorageKeys,
  LocalStorageService,
} from "@/storage/local-storage.service";
import { useEffect, useState } from "react";

type IThemeProviderProps = {
  children: React.ReactNode;
};

const defaultTheme: ITheme = "system";

function readInitialTheme(): ITheme {
  const savedTheme = LocalStorageService.getPlainString(LocalStorageKeys.THEME);

  return (savedTheme ?? defaultTheme) as ITheme;
}

export function ThemeProvider({ children }: IThemeProviderProps) {
  const [theme, setTheme] = useState<ITheme>(readInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (next: ITheme) => {
      LocalStorageService.setItem(LocalStorageKeys.THEME, next);
      setTheme(next);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
