import React from 'react';
import '../assets/Orden.scss';
import axios from 'axios';
import Navbar from '../components/containers/Navbar';
import ProductosList from '../components/UI/ProductosList';
import OrdenForm from '../components/forms/Orden';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';

function Ordenes() {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [isEditing, setIsEditing] = React.useState(false)
    const [ordenEdit, setOrdenEdit] = React.useState(null)
    const [activeTab, setActiveTab] = React.useState('home')
    const dispatch = useDispatch()
    const ordenes = useSelector((state: any) => state.ordenes.all || []);
    const userdata = useSelector((state: any) => state.users.user || {});
    const iconPlus: any = 'fas fa-plus';
    const iconPencil: any = 'fas fa-pencil';
    const iconTrash: any = 'fas fa-trash red';

    const resetEdit = () => {
        setOrdenEdit(null)
        setIsEditing(false)
        setActiveTab('home')
        setTimeout(() =>{
            getOrdenes()
        }, 300)
    };
    const edit = (user: any) => {
        setOrdenEdit(user)
        setIsEditing(true)
        setActiveTab('editor')
    };
    const del = (id: number) => {
        const asyncExec = async () => {
            try {
                const { data } = await axios.delete(`${process.env.REACT_APP_APIEP}/ordenes`, {
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
                    dispatch({type: 'ordenes/setAll', payload: data})
                }, 300);
            } catch (error: any) {
                console.error(error)
            }
        }

        asyncExec()
    };
    const getOrdenes = React.useCallback(() => {
        const asyncExec = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_APIEP}/ordenes/user`, {
                    headers: {
                        Authorization: `Bearer ${userdata.token}`
                    },
                    params: {
                        id:userdata.uid
                    }
                })
    
                if (data.status === 400) {
                    throw new Error(data.message)
                }
                dispatch({type: 'ordenes/setAll', payload: data})
            } catch (error: any) {
                console.error(error)
            }
        }
        asyncExec()
    }, [userdata, dispatch]);

    React.useEffect(() =>{
        if (!isLoaded) {
            getOrdenes()
            setIsLoaded(true)
        }
    }, [getOrdenes, isLoaded])

    return (
        <div className="Ordenes">
            <Navbar />
            <div className='m-2'>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} id="nav-home-tab" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><b onClick={() => {resetEdit();}}>Ordenes</b></button>
                    <button className={`nav-link ${activeTab === 'editor' ? 'active' : ''}`} id="nav-editor-tab" type="button" role="tab" aria-controls="nav-editor" aria-selected="false"><FontAwesomeIcon icon={isEditing ? iconPencil : iconPlus} onClick={() => {setActiveTab('editor');}} /></button>
                </div>
                <div className="tab-content" id="ordenesTabs">
                    <div className={`tab-pane fade container h-82 overflow-auto ${activeTab === 'home' ? 'show active' : ''}`} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className='row p-4'>
                            {ordenes.map((orden: any, index: number) => {
                                return <div className="orden-item border border-success rounded overflow-hidden m-1 mb-1 fs-4 col-sm-12 col-md-12 col-lg-12 p-4" key={`orden-li-${index}`}>
                                    {
                                        userdata.role >= 50 ? (
                                            <>
                                                {
                                                    orden.id > -1 ? (
                                                        <>
                                                        <FontAwesomeIcon icon={iconTrash} className='btn btn-danger float-end' onClick={() => del(orden.id)} />
                                                        </>
                                                    ) : ''
                                                }
                                                <FontAwesomeIcon icon={iconPencil} className='btn btn-secondary float-end' onClick={() => edit(orden)} />
                                            </>
                                        ) : ''
                                    }
                                    <b>#{orden.id}</b><br />
                                    $<b className='text-truncate'>{orden.total.toFixed(2)}</b><br />
                                    <b>{orden.nombre}</b><br/>
                                    <ProductosList productos={JSON.parse(orden.productos)} />
                                </div>
                            })}
                            {ordenes.length === 0 ? (
                                <div className='col-sm-12 col-md-12 col-lg-12'>
                                    <h1 className='c-pointer' onClick={() => setActiveTab("editor")}>Agrega una nueva orden</h1>
                                </div>
                            ) : ''}
                        </div>
                    </div>
                    <div className={`tab-pane fade container ${activeTab === 'editor' ? 'show active' : ''}`} id="nav-editor" role="tabpanel" aria-labelledby="nav-editor-tab">
                            <OrdenForm orden={ordenEdit} reset={resetEdit} isediting={isEditing} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ordenes;