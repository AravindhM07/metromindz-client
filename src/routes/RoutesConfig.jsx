import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import RoutesMiddleware from './RoutesMiddleware';

import LogIn from '../components/auth/LogIn';
import Register from '../components/auth/Register';
import Dashboard from '../components/dashboard/Dashboard';
import NotFound from '../components/NotFound';

const RoutesConfig = () => {

    const currentUser = useSelector(state => state.user.currentUser);
    const isAuthenticated = () => currentUser !== null;
    const isUnAuthenticated = () => currentUser === null;

    return (
        <Router>
            <Routes>
                <Route path="/" element={RoutesMiddleware(Dashboard, isAuthenticated)()} />
                <Route path="/login" element={RoutesMiddleware(LogIn, isUnAuthenticated)()} />
                <Route path="/register" element={RoutesMiddleware(Register, isUnAuthenticated)()} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default RoutesConfig;
