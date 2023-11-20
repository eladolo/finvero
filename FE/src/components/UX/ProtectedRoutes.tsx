import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouter = () => {
    const StorageToken = sessionStorage.getItem('token');

    return StorageToken ? <Outlet /> :<Navigate to="/" replace/>;
};

export default ProtectedRouter;