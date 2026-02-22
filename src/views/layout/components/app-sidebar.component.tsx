import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import {
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    Sidebar,
} from '@/components/ui/sidebar';
import { RoutesEnum } from '@/routes/routes.enum';

const items = [
    {
        title: 'Dashboard',
        url: RoutesEnum.DASHBOARD,
        icon: LayoutDashboard,
        isActive: true,
    },
];

export default function AppSidebar() {
    return (
        <Sidebar collapsible="offcanvas" variant="inset">
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
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
