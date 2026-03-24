import { useTranslation } from "react-i18next";

import AboutCard from "./components/about-card.component";
import AppearanceCard from "./components/appearance-card.component";
import DataManagementCard from "./components/data-management-card.component";
import RegionalCard from "./components/regional-card.component";

export default function Settings() {
  const { t: tSettings } = useTranslation("settings");

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        {tSettings("title")}
      </h1>

      <AppearanceCard />
      <RegionalCard />
      <DataManagementCard />
      <AboutCard />
    </div>
  );
}
