import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-navisai.us.auth0.com"
      clientId="YOUR_CLIENT_ID"
      authorizationParams={{
        redirect_uri: window.location.origin + '/dashboard'
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);