import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.scss';
import App from '@/App.jsx';

const entryPoint = document.getElementById('root');

createRoot(entryPoint).render(
  <StrictMode>
    <App />
  </StrictMode>
);
