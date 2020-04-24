import React, { useEffect } from 'react';

import {PrivateRoute} from "./view/customComponents/PrivateRoute";
import {PublicRoute} from "./view/customComponents/PublicRoute";

import HomePage from './view/pages/HomePage';
import DetalheProdutoPage from './view/pages/DetalheProdutoPage';
import MinhasComprasPage from './view/pages/MinhasComprasPage';
import SignUpPage from './view/pages/SignUpPage';
import LoginPage from './view/pages/LoginPage';
import NotFoundPage from './view/pages/NotFoundPage';
import CallbackPage from "./view/pages/CallbackPage";
import AccountCreatedPage from "./view/pages/AccountCreatedPage";
import SplashScreenPage from "./view/pages/SplashScreenPage";
import AboutPage from "./view/pages/AboutPage";

import { useSelector, useDispatch } from 'react-redux';
import { callIsAuthentication, callGetUser } from "./redux/actions/AuthThunkAction";
import { ThemeProvider } from '@material-ui/styles';
import ThemeApp from './view/ThemeApp'
import { BrowserRouter as Router, Switch,  Route} from 'react-router-dom';


function ContentApp() {
    
    return (
        <ThemeProvider theme={ThemeApp}>
            <Router>
                <Switch>
                    <PrivateRoute exact path={'/'} component={HomePage} />
                    <PrivateRoute path={'/home'} component={HomePage} />
                    <PrivateRoute path={'/meusdownloads'} component={MinhasComprasPage} />

                    <PublicRoute path={'/login'} component={LoginPage} />
                    <PublicRoute path={'/accountcreated'} component={AccountCreatedPage} />
                    <PublicRoute path={'/signup'} component={SignUpPage} />

                    <Route path={'/callback'} component={CallbackPage} />
                    <Route path={'/about'} component={AboutPage} />
                    <Route path={'/produto/:uuid'} component={DetalheProdutoPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </ThemeProvider>    
    )
}

function App(){
    const dispatch = useDispatch();

    //ComponentDidMount
    useEffect( () => {
        dispatch(callIsAuthentication());
    }, []);

    const isAuthenticated = useSelector((state) =>{
        return state.isAuthenticated;
    });

    if(isAuthenticated === true) dispatch(callGetUser());

    if (isAuthenticated === null) return (<SplashScreenPage />);

    return (
        <ContentApp />
    );
}


export default App;