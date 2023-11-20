import React from 'react';
import '../assets/Login.css';
import axios from 'axios';
import Navbar from '../components/containers/Navbar';
import UserForm from '../components/forms/Usuario';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';

function Usuarios() {
    const [isEditing, setIsEditing] = React.useState(false)
    const [userEdit, setUserEdit] = React.useState(null)
    const [activeTab, setActiveTab] = React.useState('home')
    const dispatch = useDispatch()
    const users = useSelector((state: any) => state.users.all || []);
    const userdata = useSelector((state: any) => state.users.user || {});
    const iconPlus: any = 'fas fa-plus';
    const iconPencil: any = 'fas fa-pencil';
    const iconTrash: any = 'fas fa-trash red';

    const resetEdit = () => {
        setUserEdit(null)
        setIsEditing(false)
        setActiveTab('home')
        setTimeout(() =>{
            getUsers()
        }, 300)
    };
    const edit = (user: any) => {
        setUserEdit(user)
        setIsEditing(true)
        setActiveTab('editor')
    };
    const del = (id: number) => {
        const asyncExec = async () => {
            try {
                const { data } = await axios.delete(`${process.env.REACT_APP_APIEP}/usuarios`, {
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
                    dispatch({type: 'users/setAll', payload: data})
                }, 300);
            } catch (error: any) {
                console.error(error)
            }
        }

        asyncExec()
    };
    const getUsers = () => {
        const asyncExec = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_APIEP}/usuarios`, {
                    headers: {
                        Authorization: `Bearer ${userdata.token}`
                    }
                })
    
                if (data.status === 400) {
                    throw new Error(data.message)
                }
                dispatch({type: 'users/setAll', payload: data})
            } catch (error: any) {
                console.error(error)
            }
        }
        asyncExec()
    };

    React.useEffect(() => {
        resetEdit()
    }, []);

    return (
        <div className="Usuarios">
            <Navbar />
            <div className='m-2'>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} id="nav-home-tab" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><b onClick={() => {resetEdit();}}>Usuarios</b></button>
                    <button className={`nav-link ${activeTab === 'editor' ? 'active' : ''}`} id="nav-editor-tab" type="button" role="tab" aria-controls="nav-editor" aria-selected="false"><FontAwesomeIcon icon={isEditing ? iconPencil : iconPlus} onClick={() => {setActiveTab('editor');}} /></button>
                </div>
                <div className="tab-content p-2" id="usuariosTabs">
                    <div className={`tab-pane fade container ${activeTab === 'home' ? 'show active' : ''}`} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className='row'>
                            {users.map((user: any, index: number) => {
                                return <div className="user-item border border-success rounded overflow-hidden m-1 p-2 mb-1 fs-4 col-sm-12 col-md-12 col-lg-12" key={`user-li-${index}`}>
                                    id: <b className='text-truncate'>{user.email}</b> <br />
                                    nombre: <b>{user.nombre}</b>
                                    {
                                        userdata.role >= 50 ? (
                                            <>
                                                {
                                                    user.id > 1 ? (
                                                        <>
                                                        <FontAwesomeIcon icon={iconTrash} className='btn btn-danger float-end' onClick={() => del(user.id)} />
                                                        </>
                                                    ) : ''
                                                }
                                                <FontAwesomeIcon icon={iconPencil} className='btn btn-secondary float-end' onClick={() => edit(user)} />
                                            </>
                                        ) : ''
                                    }
                                </div>
                            })}
                            {users.length === 0 ? (
                                <div className='col-sm-12 col-md-12 col-lg-12'>
                                    <h1>Agrega un nuevo usuario</h1>
                                </div>
                            ) : ''}
                        </div>
                    </div>
                    <div className={`tab-pane fade container ${activeTab === 'editor' ? 'show active' : ''}`} id="nav-editor" role="tabpanel" aria-labelledby="nav-editor-tab">
                            <UserForm user={userEdit} reset={resetEdit}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Usuarios;