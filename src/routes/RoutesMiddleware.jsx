import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoutesMiddleware = (Component, conditionFn) => {
    const status = useSelector(state => state.user.status);
    return (props) => {
        if (conditionFn()) {
            return <Component {...props} />;
        } else if (status === "failed") {
            return <Navigate to="/login" />;
        }
    };
};

export default RoutesMiddleware;
