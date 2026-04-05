import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router/dom";
import { bootstrapI18n } from "./i18n/bootstrap-i18n";
import { router } from "./routes";
import { SettingsProvider } from "./settings/settings-provider.component";
import { ThemeProvider } from "./theme/theme-provider.component";

bootstrapI18n().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <SettingsProvider>
          <RouterProvider router={router} />
        </SettingsProvider>
      </ThemeProvider>
    </StrictMode>,
  );
});
