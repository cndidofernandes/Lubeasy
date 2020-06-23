import React, { useEffect } from 'react';
import {Auth0} from '../../utils/Auth-spa';
import {useDispatch } from 'react-redux';
import { callIsAuthentication, callGetUser } from "../../redux/actions/AuthThunkAction";
import { parseQueryResult } from "../../utils/UtilAuth0";

import Cookies from 'universal-cookie';

export default function CallbackPage(props) {
  const dispatch = useDispatch();
  
  var isBackToPrevPage = false;

  const cookie = new Cookies();
  const {state} = parseQueryResult(props.location.search.split('?').slice(1).join(''));

  if( cookie.get(`login_info`) ){
    
    try{
      if(cookie.get(`login_info`)[state]){
        isBackToPrevPage = true;
        cookie.remove(`login_info`, { path: '/' });
      }
    }catch(e){
      isBackToPrevPage = false;
    }
    
  }
  
  useEffect(() => {

    Auth0().then((auth0) => {
      auth0.handleRedirectCallback().then(async value => {
        await dispatch(callIsAuthentication());
        dispatch(callGetUser());
        if ( isBackToPrevPage ) props.history.goBack(); else props.history.replace('/home');
      }).catch( (error) => {
        props.history.replace('/login?accountactivation=true');
      });
    });

  });

  return (
      <h5>Aguarde um momento...</h5>
  );
}