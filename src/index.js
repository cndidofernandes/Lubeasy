import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux'
import storeApp from "./redux/StoreApp";
import * as serviceWorker from './serviceWorker'

Sentry.init({dsn: "https://9be457cd8f144d0d9e5fcbb472cb4947@sentry.io/1871166"});

ReactDOM.render(
    <Provider store={storeApp}>
      <CssBaseline/>
      <App/>
    </Provider>,
  
  document.getElementById('root')
);

serviceWorker.register();
