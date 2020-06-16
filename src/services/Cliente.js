import axios from "axios";
import {domain_api} from "../utils/ApiConfig";
import {Auth0} from "../utils/Auth-spa";
import Cookies from 'universal-cookie';

export function updateUser(user) {
    var usuario = user;
    usuario.user_id = user.sub;
    delete usuario.sub;
    delete usuario.updated_at;
    delete usuario['https://other.info.user/loginsCount'];

    const cookies = new Cookies();

    if (cookies.get('isUpdateUserNextTime') === true || cookies.get('isUpdateUserNextTime') === undefined){
        Auth0().then((auth0) => {
            auth0.getTokenSilently().then((accessToken) => {
                axios({
                    baseURL: domain_api,
                    url: '/cliente',
                    method: 'post',
                    headers: {Authorization: 'Bearer '+accessToken},
                    data: usuario,
                }).then(function (response) {
                    if(response.status === 201)
                        cookies.set('isUpdateUserNextTime', false, { path: '/' });
                    else
                        cookies.set('isUpdateUserNextTime', true, { path: '/' });
                }).catch(function (error) {
                    if (error.response){
                        if (error.response.status === 500)
                            cookies.set('isUpdateUserNextTime', false, { path: '/' });
                        else
                            cookies.set('isUpdateUserNextTime', true, { path: '/' });
                    }else{
                        cookies.set('isUpdateUserNextTime', true, { path: '/' });
                    }
                });
            });
        }).catch(function (error) {
            cookies.set('isUpdateUserNextTime', true, { path: '/' });
        });
    }

}

export function becomeClienteAutor(user, onSuccess, onFailure) {

    Auth0().then((auth0) => {
        auth0.getTokenSilently().then((accessToken) => {
            axios({
                baseURL: domain_api,
                url: '/cliente/autor',
                method: 'post',
                data: user,
                headers: {Authorization: 'Bearer '+accessToken},
            }).then(function (response) {
                onSuccess(response);
            }).catch(function (error) {
                onFailure(error);
            });
        });
    }).catch(function (error) {
        onFailure(error);
    });

}

