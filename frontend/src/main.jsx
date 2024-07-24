import './styles/main.css';
import '@mantine/core/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <Auth0Provider
        domain="dev-723z7f5wvs37uaci.us.auth0.com"
        clientId="Ehb9dR3K2X6AXwZzCXiyE1f6z4NcXGYN"
        cacheLocation="localstorage"
        authorizationParams={{
          redirect_uri: `${import.meta.env.VITE_APP_BASE_URL}/login-redirect`,
        }}
      >
        <App />
      </Auth0Provider>
      {/* <Auth0Provider
        domain="dev-8ey6pfp5cskacl7c.us.auth0.com"
        clientId="twj9UnkcaBzQmFD8yyiG7uRtQNBQ8Dff"
        cacheLocation="localstorage"
        authorizationParams={{
          redirect_uri: `${import.meta.env.VITE_APP_BASE_URL}/login-redirect`,
        }}
      >
        <App />
      </Auth0Provider> */}
    </MantineProvider>
  </React.StrictMode>
);
