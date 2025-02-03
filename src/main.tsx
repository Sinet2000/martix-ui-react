import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApiProvider } from './context/ApiProvider'; // Import the provider
import './styles/globals.css';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
