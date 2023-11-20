import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProductoForm(props: any) {
    const userdata = useSelector((state: any) => state.users.user || {});    
    const dispatch = useDispatch()

    const iconSend: any = "fa-solid fa-share";

    const [nombre, setNombre] = React.useState('');
    const [cantidad, setcantidad] = React.useState(0);
    const [precio, setPrecio] = React.useState(0.0);
    const [isNew, setIsNew] = React.useState(false);
    const submit = (e: any) => {
        e.preventDefault();
        let data = isNew ? {} : {...props.producto };
        
        data.nombre = nombre
        data.cantidad = cantidad;
        data.precio = precio
        data.uid = userdata.uid

        try {
            dispatch({type: 'productos/processProducto', payload: {
                isnew: isNew,
                data
            }});
            props.reset();
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        if (props.producto !== null) {
            setNombre(props.producto.nombre);
            setcantidad(props.producto.cantidad);
            setPrecio(props.producto.precio);
            setIsNew(false);
        } else {
            setNombre('');
            setcantidad(0);
            setPrecio(0.0);
            setIsNew(true);
        }
    }, [props]);

    return (
        <>
            <form className="container" onSubmit={submit}>
                <div className='row'>
                    <br/>
                    <div className='col-sm-12 col-md-6 col-lg-6'>
                        <br/><label>Nombre:</label><br/>
                        <input type="text" className="form-control" placeholder="nombre" required max="144" value={nombre} onInput={(e:any) => setNombre(e.currentTarget.value)} />
                    </div>
                    <div className='col-sm-12 col-md-3 col-lg-3'>
                        <br/><label>Cantidad: {cantidad}</label><br/>
                        <input type="range" className="input-range w-100" required max="999" value={cantidad} onInput={(e:any) => setcantidad(e.currentTarget.value)} />
                    </div>
                    <div className='col-sm-12 col-md-3 col-lg-3'>
                        <br/><label>Precio: ${precio}</label><br/>
                        <input type="number" className="form-control" placeholder="precio" step="0.01" min="0" required max="127" value={precio} onInput={(e:any) => setPrecio(e.currentTarget.value)} />
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                        <br/><br/>
                        <button type='submit' className='btn btn-secondary w-100' disabled={precio > 0 && nombre !== '' && cantidad > 0 ? false : true}>
                            <FontAwesomeIcon icon={iconSend} />
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ProductoForm