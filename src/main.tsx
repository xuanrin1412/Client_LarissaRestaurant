// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './Redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="168028316531-h3v5am2t1be1e1v42nre3cghlvdp1dic.apps.googleusercontent.com">
  <Provider store={store}>
    <App />
  </Provider>
  </GoogleOAuthProvider>
  // </React.StrictMode >,
)

