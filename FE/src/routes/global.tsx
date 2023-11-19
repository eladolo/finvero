import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from '../components/UI/ProtectedRoutes';
import Login from '../views/Login';
import Registro from '../views/Registro';
import Dashboard from '../views/Dashboard';
import Ordenes from '../views/Ordenes';
import Usuarios from '../views/Usuarios';
import ErrorPage from '../components/UI/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/registro',
        element: <Registro />,
        errorElement: <ErrorPage />,
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/ordenes',
                element: <Ordenes />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/usuarios',
                element: <Usuarios />,
                errorElement: <ErrorPage />,
            },
        ]
    }
]);

export default router;
