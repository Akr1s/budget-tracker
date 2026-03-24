import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./components/app-sidebar.component";
import Header from "./components/header.component";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider
      className="max-h-svh"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Sidebar />
      <SidebarInset className="overflow-y-auto">
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
