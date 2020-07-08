import React, { useEffect } from 'react';

export default function CallbackPage(props) {

  
  useEffect(() => {

    /*Auth0().then((auth0) => {
      auth0.handleRedirectCallback().then(async value => {
        await dispatch(callIsAuthentication());
        dispatch(callGetUser());
        if ( isBackToPrevPage ) props.history.goBack(); else props.history.replace('/home');
      }).catch( (error) => {
        props.history.replace('/login?accountactivation=true');
      });
    });*/

  });

  return (
      <h5>Aguarde um momento...</h5>
  );
}