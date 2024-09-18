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

    return (
        <Router>
            <Routes>
                <Route path="/" element={RoutesMiddleware(Dashboard, isAuthenticated)()} />
                {!currentUser && <><Route path="/login" element={<LogIn />} />
                    <Route path="/register" element={<Register />} /> </>}
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default RoutesConfig;
