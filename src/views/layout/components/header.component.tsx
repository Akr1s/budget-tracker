import { ModeToggle } from "@/components/mode-toggle.component";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t: tCommon } = useTranslation("common");

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="-ms-1" />
          </TooltipTrigger>
          <TooltipContent>{tCommon("toggleSidebar")}</TooltipContent>
        </Tooltip>
        <h1 className="text-base font-medium">{tCommon("appTitle")}</h1>
        <div className="ms-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
