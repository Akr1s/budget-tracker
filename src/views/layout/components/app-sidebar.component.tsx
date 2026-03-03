import { LayoutDashboard, List } from "lucide-react";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar,
} from "@/components/ui/sidebar";
import { RoutesEnum } from "@/routes/routes.enum";
import { useLocation, useNavigate } from "react-router";

const items = [
  {
    title: "Dashboard",
    url: `/${RoutesEnum.DASHBOARD}`,
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    url: `/${RoutesEnum.TRANSACTIONS}`,
    icon: List,
  },
];

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const checkIsActive = (url: string) => location.pathname.startsWith(url);

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={checkIsActive(item.url)}
                onClick={() => navigate(item.url)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
