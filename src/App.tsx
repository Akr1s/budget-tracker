import { Navigate } from "react-router";
import { RoutesEnum } from "./routes/routes.enum";
import {
  LocalStorageKeys,
  localWebStorage,
} from "./storage/web-storage.constant";
import Layout from "./views/layout";

function App() {
  const isSetupCompleted = localWebStorage.has(
    LocalStorageKeys.ONBOARDING_DATA,
  );

  if (!isSetupCompleted) {
    return <Navigate to={`/${RoutesEnum.ONBOARDING}`} replace={true} />;
  }

  return <Layout />;
}

export default App;
