import { LayoutDashboard, List, Settings } from "lucide-react";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar,
} from "@/components/ui/sidebar";
import { RoutesEnum } from "@/routes/routes.enum";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const items = [
  {
    titleKey: "sidebar.dashboard",
    url: `/${RoutesEnum.DASHBOARD}`,
    icon: LayoutDashboard,
  },
  {
    titleKey: "sidebar.transactions",
    url: `/${RoutesEnum.TRANSACTIONS}`,
    icon: List,
  },
  {
    titleKey: "sidebar.settings",
    url: `/${RoutesEnum.SETTINGS}`,
    icon: Settings,
  },
] as const;

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t: tCommon } = useTranslation("common");

  const checkIsActive = (url: string) => location.pathname.startsWith(url);

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const title = tCommon(item.titleKey);
            return (
              <SidebarMenuItem key={item.titleKey}>
                <SidebarMenuButton
                  tooltip={title}
                  isActive={checkIsActive(item.url)}
                  onClick={() => navigate(item.url)}
                >
                  {item.icon && <item.icon />}
                  <span>{title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
