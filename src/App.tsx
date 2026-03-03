import { Navigate } from "react-router";
import { RoutesEnum } from "./routes/routes.enum";
import {
  LocalStorageKeys,
  LocalStorageService,
} from "./storage/local-storage.service";
import Layout from "./views/layout";

function App() {
  const isSetupCompleted = LocalStorageService.checkIfItemExists(
    LocalStorageKeys.ONBOARDING_DATA,
  );

  if (!isSetupCompleted) {
    return <Navigate to={`/${RoutesEnum.ONBOARDING}`} replace={true} />;
  }

  return <Layout />;
}

export default App;
