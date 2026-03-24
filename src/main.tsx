import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/config";

import { RouterProvider } from "react-router/dom";
import { router } from "./routes";
import { SettingsProvider } from "./settings/settings-provider.component";
import { ThemeProvider } from "./theme/theme-provider.component";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </ThemeProvider>
  </StrictMode>,
);
