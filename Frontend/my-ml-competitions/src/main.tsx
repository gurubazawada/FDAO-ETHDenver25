import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Import OnchainKitProvider and a chain (here using Base via wagmi)
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OnchainKitProvider
      chain={base}
      config={{
        appearance: {
          mode: 'light',
          name: 'Your App Name',
          logo: 'https://your-logo-url.com',
          theme: 'default',
        },
        wallet: {
          display: 'modal',
          termsUrl: 'https://your-terms-url.com',
          privacyUrl: 'https://your-privacy-url.com',
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OnchainKitProvider>
  </React.StrictMode>
);
