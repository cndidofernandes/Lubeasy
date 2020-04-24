import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from "../pages/LoginPage";


export const PrivateRoute = ({ component, ...options }) => {  
  const isAuthenticated = useSelector((state) => {
    return state.isAuthenticated;
  });

  const history = useHistory();

  useDispatch()({type: 'ADD_MORE_ONE_LOCATION_IN_STACK'});

  if (isAuthenticated) {
    return <Route {...options} component={component} />;
  } else {
    return <Route {...options} component={LoginPage} />;
  }

};