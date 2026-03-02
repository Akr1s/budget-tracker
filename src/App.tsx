import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { RoutesEnum } from "./routes/routes.enum";
import {
  LocalStorageKeys,
  LocalStorageService,
} from "./storage/local-storage.service";

function App() {
  const navigate = useNavigate();
  const isSetupCompleted = LocalStorageService.checkIfItemExists(
    LocalStorageKeys.ONBOARDING_DATA,
  );
  const defaultPath = isSetupCompleted
    ? RoutesEnum.DASHBOARD
    : RoutesEnum.ONBOARDING;

  useEffect(() => {
    navigate(defaultPath, { replace: true });
  }, []);

  return <Outlet />;
}

export default App;
