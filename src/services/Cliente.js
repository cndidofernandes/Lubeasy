import axios from "axios";
import {domain_api} from "../utils/ApiConfig";
import Cookies from 'universal-cookie';


export function removeAllDataCookies() {
    const cookies = new Cookies();
    cookies.remove('user', { path: '/' });
}

export function getUserCookie() {
    const cookies = new Cookies();
    return cookies.get('user');
}

export function getTokenAccess() {
    const cookies = new Cookies();
    return cookies.get('user').tokenAccess;
}

export function setUserCookie(user) {
    const cookies = new Cookies();
    cookies.set('user', user, { path: '/', sameSite: 'strict', maxAge: 2592000});
}

export function setAutorCookie(dataLogin) {
    const cookies = new Cookies();
    cookies.set('loggedIn', dataLogin, { path: '/', sameSite: 'strict'});
}

export function isAuthenticated() {
    const cookies = new Cookies();
    return !!cookies.get('user');
}


export function createUser(user, callback) {
    
    axios({
        baseURL: domain_api,
        url: '/cliente',
        method: 'post',
        data: user,
    }).then(function (response) {
        if(response.status === 201)
            callback(response, null);
        else
            callback(null, {});
            
    }).catch(function (error) {
        callback(null, error)
    });

}

export function login(email, senha, callback) {
    
    axios({
        baseURL: domain_api,
        url: `/cliente?email=${email}&senha=${senha}`,
        method: 'get',
    }).then(function (response) {
        
        setUserCookie(response.data);
        callback(response, null);

    }).catch(function (error) {
        callback(null, error)
    });

}

export function loginAutor(email, senha, callback) {

    axios({
        baseURL: process.env.REACT_APP_API_FACILITADOR_URL,
        url: `/autor/login?email=${email}&senha=${senha}`,
        method: 'get'
    })
    .then(function (response) {
        setAutorCookie(response.data);
        callback(response, null);
    })
    .catch(function (error) {
        callback(null, error)
    });

}

export function becomeClienteAutor(user, onSuccess, onFailure) {

    axios({
        baseURL: domain_api,
        url: '/cliente/autor',
        method: 'post',
        data: user,
        headers: {Authorization: 'Bearer '},
    }).then(function (response) {
        onSuccess(response);
    }).catch(function (error) {
        onFailure(error);
    });

}

