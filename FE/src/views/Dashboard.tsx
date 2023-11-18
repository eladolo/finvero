import React from 'react';
import '../assets/Login.css';
import Navbar from '../components/containers/Navbar';

function Dashboard() {
    return (
        <div className="Login">
            <Navbar />
            <header className="Login-header">
                Dashboard
            </header>
        </div>
    );
}

export default Dashboard;