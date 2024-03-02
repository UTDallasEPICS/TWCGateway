import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <ChakraProvider > */}
      <BrowserRouter>
        <Auth0Provider
          domain="dev-723z7f5wvs37uaci.us.auth0.com"
          clientId="Ehb9dR3K2X6AXwZzCXiyE1f6z4NcXGYN"
          cacheLocation="localstorage"
          authorizationParams={{
            redirect_uri: `http://localhost:3000/login-redirect`,
          }}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    {/* </ChakraProvider> */}
  </React.StrictMode>
);
