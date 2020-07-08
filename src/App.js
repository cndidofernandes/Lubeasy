import React, { useEffect } from 'react';

import {PrivateRoute} from "./view/customComponents/PrivateRoute";
import {PublicRoute} from "./view/customComponents/PublicRoute";

import HomePage from './view/pages/HomePage';
import DetalheProdutoPage from './view/pages/DetalheProdutoPage';
import MinhasSubscricoesPage from './view/pages/MinhasSubscricoesPage';
import SubscricaoPage from './view/pages/SubscricaoPage';
import MinhasComprasPage from './view/pages/MinhasComprasPage';
import SignUpPage from './view/pages/SignUpPage';
import LoginPage from './view/pages/LoginPage';
import LoginDesvioPage from './view/pages/LoginDesvioPage';
import ForgetPasswordPage from './view/pages/ForgetPasswordPage';
import NotFoundPage from './view/pages/NotFoundPage';
import ProdutoCompradoPage from "./view/pages/ProdutoCompradoPage";
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

                    <Route exact path={'/'} component={HomePage} />
                    <PrivateRoute path={'/minhas-compras'} component={MinhasComprasPage} />
                    <PrivateRoute path={'/minhas-subscricoes'} component={MinhasSubscricoesPage} />
                    <PrivateRoute path={'/subscricao/:idSubscricao/:nomeDaSubscricao'} component={SubscricaoPage} />
                    <PrivateRoute path={'/produto-comprado/:idCompra/produto/:idProduto'} component={ProdutoCompradoPage} />
                    

                    <PublicRoute path={'/login'} component={LoginPage} />
                    <PublicRoute path={'/entrar'} component={LoginDesvioPage} />
                    <PublicRoute path={'/accountcreated'} component={AccountCreatedPage} />
                    <PublicRoute path={'/signup'} component={SignUpPage} />
                    <PublicRoute path={'/forget-password'} component={ForgetPasswordPage} />

                    
                    <Route path={'/home'} component={HomePage} />
                    <Route path={'/produto/:uuid'} component={DetalheProdutoPage} />
                    <Route path={'/about'} component={AboutPage} />
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