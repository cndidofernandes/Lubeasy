import createAuth0Client from '@auth0/auth0-spa-js';

export const Auth0 = async () => {
  return await createAuth0Client({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    client_id: process.env.REACT_APP_AUTH_CLIENTE_ID,
    audience: process.env.REACT_APP_AUTH_AUDIENCE,
    scope: 'openid profile',
    redirect_uri: process.env.REACT_APP_AUTH_REDIRECT_URI,
  });
} 

export async function isAuthenticated(){
  const auth0 = await Auth0();
  const isAuthenticated = await auth0.isAuthenticated();
  return isAuthenticated;
}

export async function getUser(){
  const auth0 = await Auth0();
  return await auth0.getUser();;
}



