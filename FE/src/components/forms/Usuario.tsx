import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UserForm(props: any) {
    const userdata = useSelector((state: any) => state.users.user || {});
    const dispatch = useDispatch()
    const iconSend: any = "fa-solid fa-share";
    const [email, setEmail] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState(1);
    const [isNew, setIsNew] = React.useState(false);
    const submit = (e: any) => {
        e.preventDefault();
        let data = isNew ? {} : {...props.user, oldpassword: ''};
        
        data.email = email
        data.nombre = nombre
        data.oldpassword = data.password
        data.password = password
        data.role = role

        try {
            dispatch({type: 'users/processUser', payload: {
                isnew: isNew,
                data
            }});
            props.reset();
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        if (props.user !== null) {
            setEmail(props.user.email);
            setNombre(props.user.nombre);
            setPassword(props.user.password);
            setRole(props.user.role);
            setIsNew(false);
        } else {
            setEmail('');
            setNombre('');
            setPassword('');
            setRole(1);
            setIsNew(true);
        }
    }, [props]);

    return (
        <form className="container" onSubmit={submit}>
            <div className='row'>
                <br/>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                    <input type="email" className="form-control" placeholder="email" required max="127" value={email} onInput={(e:any) => setEmail(e.currentTarget.value)} disabled={!isNew} />
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                    <input type="text" className="form-control" placeholder="nombre" required max="127" value={nombre} onInput={(e:any) => setNombre(e.currentTarget.value)} />
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6'>
                    <br/>
                    <input type="password" className="form-control" placeholder="password" required max="127" value={password} onInput={(e:any) => setPassword(e.currentTarget.value)} />
                </div>
                {
                    userdata?.role >= 80 ? (
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <br/>
                            <label>Role: {role}</label><br/>
                            <input type="range" className="range-input w-100" min="1" max="100" placeholder="role" value={role} onChange={(e:any) => setRole(e.currentTarget.value)} disabled={props?.user?.id === 1}/>
                        </div>
                    ) : ''
                }
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <br/><br/>
                    <button type='submit' className='btn btn-secondary w-100'>
                        <FontAwesomeIcon icon={iconSend} />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default UserForm