import { createBrowserRouter } from "react-router";

import App from "../App";
import { RoutesEnum } from "./routes.enum";
import Dashboard from "../views/dashboard";
import Onboarding from "../views/onboarding";
import Transactions from "@/views/transactions";
import { Navigate } from "react-router";

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
    ],
  },
  {
    path: RoutesEnum.ONBOARDING,
    Component: Onboarding,
  },
]);
