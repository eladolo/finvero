import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ProductoForm from './Productos'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../assets/Orden.scss'

function OrdenForm(props: any) {
    const userdata = useSelector((state: any) => state.users.user || {})
    const [isEditing, setIsEditing] = React.useState(false)
    const [productoEdit, setProductoEdit] = React.useState(null)
    const [activeTab, setActiveTab] = React.useState('orden')
    
    const dispatch = useDispatch()
    const productos = useSelector((state: any) => state.productos.all || [])

    const iconSend: any = "fa-solid fa-share"
    const iconPlus: any = 'fas fa-plus'
    const iconPencil: any = 'fas fa-pencil'
    const iconTrash: any = 'fas fa-trash red'

    const [nombre, setNombre] = React.useState('')
    const [isNew, setIsNew] = React.useState(false)

    const submit = (e: any) => {
        e.preventDefault();
        let data = isNew ? {} : {...props.orden};
        
        data.uid = userdata.uid;
        data.nombre = nombre
        data.total = total
        data.productos = JSON.stringify(productosOrden)

        try {
            dispatch({type: 'ordenes/processOrden', payload: {
                isnew: isNew,
                data
            }});
            resetEdit();
            props.reset();
        } catch (error) {
            console.error(error);
        }
    }
    const resetEdit = () => {
        setProductoEdit(null)
        setIsEditing(false)
        setActiveTab('orden')
        setTimeout(() =>{
            getProductos()
        }, 300)
    }
    const edit = (user: any) => {
        setProductoEdit(user)
        setIsEditing(true)
        setActiveTab('editor')
    }
    const del = (id: number) => {
        const asyncExec = async () => {
            try {
                const { data } = await axios.delete(`${process.env.REACT_APP_APIEP}/productos`, {
                    headers: {
                        Authorization: `Bearer ${userdata.token}`
                    },
                    data: {
                        id
                    }
                })
    
                if (data.status === 400) {
                    throw new Error(data.message)
                }
                setTimeout(() => {
                    resetEdit()
                }, 300);
            } catch (error: any) {
                console.error(error)
            }
        }

        asyncExec()
    }
    const getProductos = () => {
        const asyncExec = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_APIEP}/productos/user`, {
                    headers: {
                        Authorization: `Bearer ${userdata.token}`
                    },
                    params: {
                        id: userdata.uid
                    }
                })
    
                if (data.status === 400) {
                    throw new Error(data.message)
                }
                dispatch({type: 'productos/setAll', payload: data})
            } catch (error: any) {
                console.error(error)
            }
        }
        asyncExec()
    }
    const updateProductos = (producto: any, value: any) => {
        const tmp: any = availableProducts.slice(0).map((prod: any) => {
            const newProd: any = {
                ...prod
            }
            if (newProd.id === producto.id) {
                newProd.addToCart = parseInt(value, 10)
            }
            return newProd
        })
        const newTmp = [ 
            ...tmp,
            ...outstockProducts
        ]
        dispatch({type: 'productos/setAll', payload: newTmp})
        
        let tmpProductosOrden: any =  []
        if (productosOrden.some((product: any) => product.id === producto.id)) {
            tmpProductosOrden = productosOrden.slice(0).map((newTmp: any) => {
                let tmp: any = {
                    ...newTmp
                } 
                if (tmp.id === producto.id) {
                    tmp = producto
                    tmp.addToCart = parseInt(value, 10)
                }
                return tmp
            })
        } else {
            tmpProductosOrden = productosOrden.slice(0)
            tmpProductosOrden.push({
                ...producto,
                addToCart: parseInt(value, 10)
            })
        }
    }
    const availableProducts: any = productos.slice(0).filter((prod:any) => prod.cantidad > 0).map((prod: any) => {
        return {
            ...prod,
            addToCart: prod.addToCart ? prod.addToCart : 0
        }
    })
    const outstockProducts: any = productos.slice(0).filter((prod:any) => prod.cantidad === 0).map((prod: any) => {
        return {
            ...prod,
            addToCart: 0
        }
    })
    const productosOrden: any = availableProducts.slice(0).filter((tmp:any) => tmp.addToCart > 0)
    const total =  productosOrden.reduce((accum: number, last: any) => {
        return accum + (last.addToCart * last.precio)
    }, 0)
    React.useEffect(() => {
        if (props.orden !== null) {
            setNombre(props.orden.nombre)
            setIsNew(false)

            const tmpOrdenProductos = JSON.parse(props.orden.productos)
            const tmpProductos = productos.slice(0).map((pre: any) => {
                const producto = {
                    ...pre
                }

                tmpOrdenProductos.map((tmpProduct: any) => {
                   if (tmpProduct.id === producto.id) {
                        producto.addToCart = tmpProduct.addToCart
                        producto.precio = tmpProduct.precio
                   }
                   return tmpProduct
                })

                return producto
            })
            dispatch({type: 'productos/setAll', payload: tmpProductos})
            setActiveTab('orden')
        }
        else if (props.orden === null) {
            setNombre(userdata.nombre)
            setIsNew(true)
            resetEdit()
            setActiveTab('orden')
        }
        // eslint-disable-next-line 
    }, [userdata.nombre, props.orden, dispatch])

    return (
        <div className='order-form'>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className={`nav-link ${activeTab === 'orden' ? 'active' : ''}`} id="nav-orden-tab" type="button" role="tab" aria-controls="nav-orden" aria-selected="true"><b onClick={() => {setActiveTab('orden')}}>Orden</b></button>
                <button className={`nav-link ${activeTab === 'producto' ? 'active' : ''}`} id="nav-producto-tab" type="button" role="tab" aria-controls="nav-producto" aria-selected="true"><b onClick={() => {setActiveTab('producto'); setIsEditing(false)}}>Productos</b></button>
                <button className={`nav-link ${activeTab === 'editor' ? 'active' : ''}`} id="nav-editor-tab" type="button" role="tab" aria-controls="nav-editor" aria-selected="false"><FontAwesomeIcon icon={isEditing ? iconPencil : iconPlus} onClick={() => {setActiveTab('editor');}} /></button>
            </div>
            <div className="tab-content mt-2" id="productosTabs">
                <div className={`tab-pane fade container ${activeTab === 'orden' ? 'show active' : ''}`} id="nav-orden" role="tabpanel" aria-labelledby="nav-orden-tab"> 
                    <form className="container" onSubmit={submit}>
                        <div className='row'>
                            <br/>
                            <div className='col-6'>
                                <label>Nombre: </label><br/>
                                <input type="text" className="form-control" placeholder="nombre" required max="127" value={nombre} onInput={(e:any) => setNombre(e.currentTarget.value)} />
                            </div>
                            <div className='col-6 text-center'>
                                <br/>
                                <b className='fs-1 '>${total.toFixed(2)}</b>
                            </div>
                            <div className='col-12 p-2'>
                                <div className="nav nav-tabs" id="nav-tab-orden-productos" role="tablist">
                                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Productos {availableProducts.length}</button>
                                    {
                                        productosOrden.length ? (
                                            <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">En orden {productosOrden.reduce((acc: number, last: any) => last.addToCart + acc, 0) + ' | ' + productosOrden.length}</button>
                                        ) : ''
                                    }
                                </div>
                                <div className='tab-content h-40 overflow-auto p-3'>
                                    <div className='tab-pane fade show active' id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab container">
                                        <br/>
                                        <div className='row p-4 w-90'>
                                            {availableProducts.map((producto: any, index: number) => {
                                                return <div className={`producto-item border border-success rounded overflow-hidden fs-4 col-sm-12 col-md-4 col-lg-4 p-4 mt-2 ${producto.addToCart > 0 ? 'bg-warning' : ''}`} key={`producto-li-${index}`}>
                                                    <b className="float-end">${producto.precio.toFixed(2)}</b>
                                                    <h2 className='text-truncate' title={producto.nombre}>{producto.nombre}</h2>
                                                    Disponibles: <b>{producto.cantidad - producto.addToCart}</b><br/>
                                                    En orden: <b>{producto.addToCart}</b><br/>
                                                    <input type="range" className='input-range-control w-100' value={producto.addToCart} max={producto.cantidad} onInput={(e) => updateProductos(producto, e.currentTarget.value)}/>
                                                </div>
                                            })}
                                            {productos.length === 0 ? (
                                                <div className='col-12 text-center'>
                                                    <h1 className='c-pointer' onClick={() => setActiveTab("editor")}>Agrega mas productos</h1>
                                                </div>
                                            ) : ''}
                                            {availableProducts.length === 0 && productos.length > 0 ? (
                                                <div className='col-12 text-center'>
                                                    <h1 className='c-pointer' onClick={() => setActiveTab("editor")}>Actualiza la cantidad de productos disponibles</h1>
                                                </div>
                                            ) : ''}
                                        </div>
                                    </div>
                                    <div className='tab-pane fade container' id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <br/>
                                        <div className='row w-90'>
                                            {productosOrden.map((producto: any, index: number) => {
                                                return <div className={`producto-item border border-black rounded overflow-hidden mb-1 fs-4 col-sm-12 col-md-4 col-lg-4 p-2 ${producto.addToCart > 0 ? 'bg-success white' : ''}`} key={`producto-li-${index}`}>
                                                    <b className="float-end fs-6">${producto.precio.toFixed(2)}</b>
                                                    <h2 className='text-truncate' title={producto.nombre}>{producto.nombre}</h2>
                                                    Cantidad: <b>{producto.addToCart}</b>
                                                    <b className="float-end fs-3">${(producto.precio * producto.addToCart).toFixed(2)}</b><br/>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-12 col-lg-12'>
                                <br/><br/>
                                <button type='submit' className='btn btn-secondary w-100'  disabled={productosOrden.length === 0 ? true : false}>
                                    <FontAwesomeIcon icon={iconSend} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={`tab-pane fade container ${activeTab === 'producto' ? 'show active' : ''}`} id="nav-producto" role="tabpanel" aria-labelledby="nav-producto-tab">
                    <div className='row'>
                        {productos.map((producto: any, index: number) => {
                            return <div className="user-item border border-success rounded overflow-hidden m-1 mb-1 fs-4 col-sm-12 col-md-12 col-lg-12 p-2" key={`user-li-${index}`}>
                                <h1 className='text-truncate'>
                                    {producto.nombre}
                                    <b className="float-end">${producto.precio.toFixed(2)}</b>
                                </h1><br />
                                disponibles: <b>{producto.cantidad}</b><br/>
                                {
                                    userdata.role >= 50 ? (
                                        <>
                                            <FontAwesomeIcon icon={iconTrash} className='btn btn-danger float-end' onClick={() => del(producto.id)} />
                                            <FontAwesomeIcon icon={iconPencil} className='btn btn-secondary float-end' onClick={() => edit(producto)} />
                                        </>
                                    ) : ''
                                }
                            </div>
                        })}
                        {productos.length === 0 ? (
                            <div className='col-sm-12 col-md-12 col-lg-12'>
                                <h1 className='c-pointer' onClick={() => setActiveTab("editor")}>Agrega mas productos</h1>
                            </div>
                        ) : ''}
                    </div>
                </div>
                <div className={`tab-pane fade container ${activeTab === 'editor' ? 'show active' : ''}`} id="nav-editor" role="tabpanel" aria-labelledby="nav-editor-tab">
                    <ProductoForm producto={productoEdit} reset={resetEdit} />
                </div>
            </div>
        </div>
    )
}

export default OrdenForm