import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App';
import ErrorPage from '../components/UI/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
]);

export default router;
