import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./Store/Store";
import {BrowserRouter} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
      <Provider store={store}>
          <BrowserRouter>
              <GoogleOAuthProvider
                  script-src={"https://accounts.google.com/gsi/"}
                  clientId="260867558541-e8p1u9g7t7kqmrcbntjh0i1614i1025u.apps.googleusercontent.com">
                  <App />
              </GoogleOAuthProvider>

          </BrowserRouter>
      </Provider>
);


