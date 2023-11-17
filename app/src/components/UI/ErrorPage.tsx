import { useRouteError } from 'react-router-dom';
import '../../assets/ErrorPage.css';
export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                🩻
                <br />
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
