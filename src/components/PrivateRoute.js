// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const role = localStorage.getItem('role'); // Assuming role is stored as '1' for admin

    return role === '1' ? children : <Navigate to="/" />;
};

export default PrivateRoute;
