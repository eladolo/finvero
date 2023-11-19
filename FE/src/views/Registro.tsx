import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/Login.css';

function Registro() {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const iconSend: any = "fa-solid fa-share";
    let navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.token) {
            navigate('/dashboard');
        }
    }, [ navigate])

    const submit = async (e: any) => {
        e.preventDefault();
        const form = {
            nombre:user,
            email,
            password
        };
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_APIEP}/login/signup`, form);
    
            if (data.status >= 400) {
                setErrorMessage(data.response);
            } else {
                const { data } = await axios.post(`${process.env.REACT_APP_APIEP}/login/signin`, form);

                if (data.status === parseInt('401')) {
                    setErrorMessage(data.response);
                } else {
                    sessionStorage.setItem('token', data.token);
                    dispatch({type: 'users/setUser', payload: data });
                    navigate('/dashboard');
                }
            }
        } catch (error: any) {
            setErrorMessage(error.message);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };
    return (
        <form onSubmit={submit} className="Login container mt-10">
            <br /><br /><br />
            <span className={'text-danger fs-1 ' + (errorMessage !== '' ? '' : 'd-none')}>{errorMessage}</span>
            <br /><br /><br />
            <b className='fs-1'>Registro</b>
            <br />
            <div className='row'>
                <div className='col-sm-12 col-lg-6'>
                    <input type="email" className="form-control" placeholder="Email" value={email} onInput={(e) => setEmail(e.currentTarget.value)} aria-label='email input' required />
                </div>
                <div className='col-sm-12 col-lg-6'>
                    <input type="text" className="form-control" placeholder="User" value={user} onInput={(e) => setUser(e.currentTarget.value)} aria-label='user input' required />
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <br />
                    <input type="password" className="form-control" placeholder="Password" value={password} onInput={(e) => setPassword(e.currentTarget.value)} aria-label='password input' required />
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <br />
                    <button type='submit' className='btn btn-primary w-100' aria-label='login button'>
                        <FontAwesomeIcon icon={iconSend} />
                    </button>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <br />
                    <button type='button' className='btn btn-secondary w-100' aria-label='login button' onClick={() => navigate("/")}>
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Registro;