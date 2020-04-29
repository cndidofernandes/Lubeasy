import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux'
import storeApp from "./redux/StoreApp";

Sentry.init({dsn: "https://9be457cd8f144d0d9e5fcbb472cb4947@sentry.io/1871166"});

ReactDOM.render(
    <Provider store={storeApp}>
      <CssBaseline/>
      <App/>
    </Provider>,
  
  document.getElementById('root')
);


//serviceWorker.register();

//import * as serviceWorker from './serviceWorker'

//serviceWorker.register();
//registerServiceWorkFcm();

/*function registerServiceWorkFcm() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./firebase-messaging-sw.js")
      .then(function(registration) {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch(function(err) {
        console.log("Service worker registration failed, error:", err);
      });
  }
}*/
