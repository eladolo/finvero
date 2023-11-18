import React from 'react';
import logo from '../assets/logo.svg';
import '../assets/Login.css';

function Login() {
    return (
        <div className="Login">
            <header className="Login-header">
                <img src={logo} className="Login-logo" alt="logo" />
            </header>
        </div>
    );
}

export default Login;