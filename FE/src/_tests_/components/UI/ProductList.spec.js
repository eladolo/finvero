import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductosList from '../../../components/UI/ProductosList';

test('ProductosList muestra un boton de productos', () => {
    const mockData = [{
        nombre: 'Producto 1',
        addToCart: 2,
        precio: 45.50
    }]
    const element = render(<ProductosList productos={mockData} />);
    const content = element.getByText("Productos");
    expect(content).toBeInTheDocument();
});

test('ProductosList muestra una lista de productos', () => {
    const mockData = [{
        nombre: 'Producto 1',
        addToCart: 2,
        precio: 45.50
    }, {
        nombre: 'Producto 2',
        addToCart: 4,
        precio: 5
    }]
    const element = render(<ProductosList productos={mockData} />);
    const content = element.getByText("Productos");
    fireEvent.click(content);
    expect(element.baseElement).toHaveTextContent("$91");
    expect(element.baseElement).toHaveTextContent("$20");
});