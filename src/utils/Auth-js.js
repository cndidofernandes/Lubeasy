import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH_DOMAIN,
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      clientID: process.env.REACT_APP_AUTH_CLIENTE_ID,
      redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
      responseType: process.env.REACT_APP_AUTH_RESPONSE_TYPE,
      response_mode: process.env.REACT_APP_AUTH_QUERY,
      scope: process.env.REACT_APP_AUTH_SCOPE,
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  getProfile(callback) {

    /*const user = await this.auth0.getUser();
    console.log(user);*/

    return (this.profile) ? this.profile : this.auth0.client.userInfo(this.getIdToken(), function(err, user){
      console.log("user: ", user);
    });
  }

  getIdToken() {
    return (this.idToken) ? this.idToken : sessionStorage.getItem('it');
  }

  isAuthenticated() {
    const timeNow = new Date().getTime();
    return (this.expiresAt) ? timeNow < this.expiresAt : timeNow < sessionStorage.getItem('ea');
  }

  signIn(email, password, options, callback) {
    this.auth0.login({
      realm: 'Username-Password-Authentication',
      email: email,
      password: password,
      state: options.state,
      nonce: options.nonce,
      //prompt: 'none',
    }, callback);
  }

  signUp(user, callback) {
    this.auth0.signup({ 
      connection: 'Username-Password-Authentication',
      ...user,
    }, callback);
  }

  signOut() {
    // clear id token, profile, and expiration
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    this.auth0.logout({
        returnTo: 'http://localhost:3000',
        clientID: 'Jh3SxZEnAVceDBnd7gSkuZWxYkUmOIft',
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        this.expiresAt = authResult.idTokenPayload.exp * 1000;

        /*sessionStorage.setItem('it', this.idToken);
        sessionStorage.setItem('ea', this.expiresAt);*/
        resolve();
      });
    })

  }
  
}

const auth0Client = new Auth();

export default auth0Client;
