import { ModeToggle } from "@/components/mode-toggle.component";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RoutesEnum } from "@/routes/routes.enum";
import { RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.clear();
    navigate(`/${RoutesEnum.ONBOARDING}`, { replace: true });
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Reset data</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
