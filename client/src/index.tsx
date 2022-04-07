import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';

import './index.css';

import App from './App';
import { ContextProvider } from './hooks';

const rootElement = document.getElementById('root');

const root = ReactDOMClient.createRoot(rootElement as HTMLElement);

root.render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
