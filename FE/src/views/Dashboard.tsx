import React from 'react';
import { useSelector } from 'react-redux'
import '../assets/Login.css';
import Navbar from '../components/containers/Navbar';

function Dashboard() {
    const userdata = useSelector((state: any) => state.users.user || {});
    return (
        <div className="Login">
            <Navbar />
            <header className="Login-header">
                Welcome {userdata?.nombre || ''}
            </header>
        </div>
    );
}

export default Dashboard;