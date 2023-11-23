import { render } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import ProtectedRoutes from '../../../components/UX/ProtectedRoutes';

test('ProtectedRoutes redirect to /', () => {
    const Mocktest = ()=> {
        return(
            <BrowserRouter basename='/'>
                <ProtectedRoutes/>
            </BrowserRouter>
        )
    };
    const element = render(<Mocktest />);
    expect(element.baseElement).toContainHTML("<body><div /></body>");
});