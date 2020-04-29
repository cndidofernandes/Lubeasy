import React from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import HomePage from '../pages/HomePage';


export const PublicRoute = ({ component, ...options }) => {
    const isAuthenticated = useSelector((state) =>{
        return state.isAuthenticated
    });

    useDispatch()({type: 'ADD_MORE_ONE_LOCATION_IN_STACK'});

    const finalComponent = isAuthenticated ? HomePage : component;

    return <Route {...options} component={finalComponent} />;
    
};