import { createBrowserRouter } from 'react-router';

import App from '../App';
import { RoutesEnum } from './routes.enum';
import Dashboard from '../views/dashboard';
import Onboarding from '../views/onboarding';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: RoutesEnum.DASHBOARD,
                Component: Dashboard,
            },
            {
                path: RoutesEnum.ONBOARDING,
                Component: Onboarding,
            },
        ],
    },
]);
