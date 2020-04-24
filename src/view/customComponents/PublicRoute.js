import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


export const PublicRoute = ({ component, ...options }) => {
    const isAuthenticated = useSelector((state) =>{
        return state.isAuthenticated
    });

    const history = useHistory();

    useDispatch()({type: 'ADD_MORE_ONE_LOCATION_IN_STACK'});

    if (isAuthenticated) {
        history.replace('/home');
        return '';
    } else {
        return <Route {...options} component={component} />;
    }
  
    //const finalComponent = (isAuthenticated) ? HomePage : component;
    
};