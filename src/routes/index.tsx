import { createBrowserRouter, Navigate } from "react-router";

import App from "../App";
import { RoutesEnum } from "./routes.enum";
import Dashboard from "../views/dashboard";
import Onboarding from "../views/onboarding";
import Settings from "@/views/settings";
import Transactions from "@/views/transactions";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: <Navigate to={RoutesEnum.DASHBOARD} replace={true} />,
      },
      {
        path: RoutesEnum.DASHBOARD,
        Component: Dashboard,
      },
      {
        path: RoutesEnum.TRANSACTIONS,
        Component: Transactions,
      },
      {
        path: RoutesEnum.SETTINGS,
        Component: Settings,
      },
    ],
  },
  {
    path: RoutesEnum.ONBOARDING,
    Component: Onboarding,
  },
]);
