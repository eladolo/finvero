import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import ReportesTabla from '../../../components/UI/ReportesTabla';

test('ReportesTabla muestra un boton de generar reporte', () => {
    const element = render(<ReportesTabla />);
    const content = element.getByText("Generar reporte");
    expect(content).toBeInTheDocument();
});

test('ReportesTabla muestra una lista default de productos', () => {
    const element = render(<ReportesTabla />);
    expect(element.baseElement).toHaveTextContent("Lorem ipsum");
    expect(element.baseElement).toHaveTextContent("Foo baz");
    expect(element.baseElement).toHaveTextContent("Bazz ipfoo");
});

test('ReportesTabla muestra una lista custom de productos', () => {
    const mockHeaders = ['ID', 'CustomHeader']
    const mockData = [{
        id: 1,
        customHeaderData: 45.50
    }, {
        id: 1456,
        customHeaderData: `Foo 12345` 
    }]
    const element = render(<ReportesTabla data={mockData} headers={mockHeaders} />);
    expect(element.baseElement).toHaveTextContent("ID");
    expect(element.baseElement).toHaveTextContent("CustomHeader");
    expect(element.baseElement).toHaveTextContent("Foo 12345");
});

test('ReportesTabla muestra una lista custom de productos con data para reporte de ordenes', () => {
    const mockHeaders = ['Nombre', 'Precio', 'Cantidad']
    const mockData = [
        {
            nombre: 'Producto uno',
            precio: 10,
            addToCart: 4
        },
        {
            nombre: 'Producto dos',
            precio: 21.5,
            addToCart: 7
        },
    ]
    const mockData2 = [
        {
            nombre: 'Producto uno',
            precio: 10,
            addToCart: 9
        },
        {
            nombre: 'Producto dos',
            precio: 21.5,
            addToCart: 1
        },
    ]
    const mockData3 = [
        {
            nombre: 'Producto tres',
            precio: 39,
            addToCart: 2
        },
        {
            nombre: 'Producto dos',
            precio: 21.5,
            addToCart: 4
        },
    ]
    const mockOrdenes = [
        {
            createdAt: new Date('2023-11-22'),
            productos: JSON.stringify(mockData)
        },
        {
            createdAt: new Date('2023-11-20'),
            productos: JSON.stringify(mockData2)
        },
        {
            createdAt: new Date('2023-10-20'),
            productos: JSON.stringify(mockData3)
        },
    ]
    const tmpDataTabla = []
    const tmpData = {}
    mockOrdenes.map((orden) => {
        const productos = JSON.parse(orden.productos)
        productos.map((producto) => {
            if (tmpData[producto.nombre]) {
                tmpData[producto.nombre].cuenta += producto.addToCart
            } else {
                tmpData[producto.nombre] = {
                    ...producto,
                    cuenta: producto.addToCart
                }
            }
            return producto
        })
        return orden
    })
    Object.entries(tmpData).map((prod) => {
        const [key, value] = prod
        tmpDataTabla.push({
            nombre: key,
            precio: '$ ' + value.precio.toFixed(2),
            cantidad: value.cuenta
        })
        return prod
    })
    const element = render(<ReportesTabla data={tmpDataTabla} headers={mockHeaders} ordenes={mockOrdenes} />);
    expect(element.baseElement).toHaveTextContent("Nombre");
    expect(element.baseElement).toHaveTextContent("Precio");
    expect(element.baseElement).toHaveTextContent("Cantidad");
    expect(element.baseElement).toHaveTextContent("Producto uno");
    expect(element.baseElement).toHaveTextContent(("$ 10.00"));
    expect(element.baseElement).toHaveTextContent(("13"));
    expect(element.baseElement).toHaveTextContent("Producto dos");
    expect(element.baseElement).toHaveTextContent(("$ 21.50"));
    expect(element.baseElement).toHaveTextContent(("12"));
    expect(element.baseElement).toHaveTextContent("Producto tres");
    expect(element.baseElement).toHaveTextContent(("$ 39.00"));
    expect(element.baseElement).toHaveTextContent(("2"));
});

test('ReportesTabla muestra una lista filtrada de productos', async() => {
    const mockHeaders = ['Nombre', 'Precio', 'Cantidad']
    const mockData = [
        {
            nombre: 'Producto uno',
            precio: 10,
            addToCart: 4
        },
        {
            nombre: 'Producto dos',
            precio: 21.5,
            addToCart: 7
        },
    ]
    const mockData2 = [
        {
            nombre: 'Producto uno',
            precio: 10,
            addToCart: 9
        },
        {
            nombre: 'Producto dos',
            precio: 21.5,
            addToCart: 1
        },
    ]
    const mockData3 = [
        {
            nombre: 'Producto tres',
            precio: 39,
            addToCart: 2
        },
        {
            nombre: 'Producto dos',
            precio: 21.5,
            addToCart: 4
        },
    ]
    const mockOrdenes = [
        {
            createdAt: new Date('11/22/2023'),
            productos: JSON.stringify(mockData)
        },
        {
            createdAt: new Date('11/12/2023'),
            productos: JSON.stringify(mockData2)
        },
        {
            createdAt: new Date('10/02/2023'),
            productos: JSON.stringify(mockData3)
        },
    ]
    const tmpDataTabla = []
    const tmpData = {}
    mockOrdenes.map((orden) => {
        const productos = JSON.parse(orden.productos)
        productos.map((producto) => {
            if (tmpData[producto.nombre]) {
                tmpData[producto.nombre].cuenta += producto.addToCart
            } else {
                tmpData[producto.nombre] = {
                    ...producto,
                    cuenta: producto.addToCart
                }
            }
            return producto
        })
        return orden
    })
    Object.entries(tmpData).map((prod) => {
        const [key, value] = prod
        tmpDataTabla.push({
            nombre: key,
            precio: '$ ' + value.precio.toFixed(2),
            cantidad: value.cuenta
        })
        return prod
    })
    const element = await act(() => render(<ReportesTabla data={tmpDataTabla} headers={mockHeaders} ordenes={mockOrdenes} />));
    const inputStat = element.getByPlaceholderText('Inicio')
    const inputEnd = element.getByPlaceholderText('Fin')
    const btnReporte = element.getByText("Generar reporte")
    await act(async () => {
        fireEvent.focus(inputStat)
        fireEvent.input(inputStat, {target:{value:"11/22/2023"}})
        fireEvent.focus(inputEnd)
        fireEvent.input(inputEnd, {target:{value:"11/22/2023"}})
        fireEvent.click(btnReporte)
    })
    expect(element.baseElement).toHaveTextContent("Producto uno");
    expect(element.baseElement).toHaveTextContent(("$ 10.00"));
    expect(element.baseElement).toHaveTextContent(("4"));
    await act(async () => {
        fireEvent.focus(inputStat)
        fireEvent.input(inputStat, {target:{value:"11/12/2023"}})
        fireEvent.focus(inputEnd)
        fireEvent.input(inputEnd, {target:{value:"11/12/2023"}})
        fireEvent.click(btnReporte)
    })
    expect(element.baseElement).toHaveTextContent("Producto dos");
    expect(element.baseElement).toHaveTextContent(("$ 21.50"));
    expect(element.baseElement).toHaveTextContent(("1"));
    await act(async () => {
        fireEvent.focus(inputStat)
        fireEvent.input(inputStat, {target:{value:"10/02/2023"}})
        fireEvent.focus(inputEnd)
        fireEvent.input(inputEnd, {target:{value:"10/02/2023"}})
        fireEvent.click(btnReporte)
    })
    expect(element.baseElement).toHaveTextContent("Producto tres");
    expect(element.baseElement).toHaveTextContent(("$ 39.00"));
    expect(element.baseElement).toHaveTextContent(("2"));
});