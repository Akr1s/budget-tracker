import { ModeToggle } from "@/components/mode-toggle.component";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RoutesEnum } from "@/routes/routes.enum";
import { IndexedDBService } from "@/storage/index-db.service";
import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Header() {
  const { t: tCommon } = useTranslation("common");
  const navigate = useNavigate();

  const handleReset = async () => {
    localStorage.clear();
    await IndexedDBService.clearAll();
    navigate(`/${RoutesEnum.ONBOARDING}`, { replace: true });
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="-ml-1" />
          </TooltipTrigger>
          <TooltipContent>{tCommon("toggleSidebar")}</TooltipContent>
        </Tooltip>
        <h1 className="text-base font-medium">{tCommon("appTitle")}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleReset}>
                <RotateCcw className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">{tCommon("resetData")}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{tCommon("resetData")}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
