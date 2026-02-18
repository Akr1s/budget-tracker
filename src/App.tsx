import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { RoutesEnum } from './routes/routes.enum';

function App() {
    const navigate = useNavigate();
    const isSetupCompleted = false;
    const defaultPath = isSetupCompleted ? RoutesEnum.DASHBOARD : RoutesEnum.ONBOARDING;

    useEffect(() => {
        navigate(defaultPath, { replace: true });
    }, []);

    return <Outlet />;
}

export default App;
