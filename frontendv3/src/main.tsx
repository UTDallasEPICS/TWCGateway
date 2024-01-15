import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-723z7f5wvs37uaci.us.auth0.com"
        clientId="Ehb9dR3K2X6AXwZzCXiyE1f6z4NcXGYN"
        authorizationParams={{
          redirect_uri: `http://localhost:3000/login`,
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
