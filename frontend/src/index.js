import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(

    <ChakraProvider> 
    {/* <Auth0Provider
      domain="the-warren-center.us.auth0.com"
      clientId="hvsbhpQc5ImpK85Gpoo3Mrlebbfs1ogZ"
      redirectUri={window.location.origin + "/users"} // add a function to check role
    > */}
      <App />
    {/* </Auth0Provider> */}
    </ChakraProvider>,

    document.getElementById('root')
);
