import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ErrorPage from '../../../components/UX/ErrorPage';

jest.mock("react-router-dom", () => ({
      ...(jest.requireActual("react-router-dom")),
    useRouteError: () => {
        return {
            message: "Muajajaja an Error!"
        }
    }
}));
test('ErrorPage muestra mensaje default "Sorry, an unexpected error has occurred."', () => {
    const element = render(<ErrorPage />);
    expect(element.baseElement).toHaveTextContent("Sorry, an unexpected error has occurred.");
    expect(element.baseElement).toHaveTextContent("Muajajaja an Error!");
});