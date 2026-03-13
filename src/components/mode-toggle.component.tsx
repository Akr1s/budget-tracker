import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/theme/use-theme.hook";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const { t: tCommon } = useTranslation("common");

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">{tCommon("toggleTheme")}</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            {tCommon("themeLight")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            {tCommon("themeDark")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            {tCommon("themeSystem")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent>{tCommon("toggleTheme")}</TooltipContent>
    </Tooltip>
  );
}
