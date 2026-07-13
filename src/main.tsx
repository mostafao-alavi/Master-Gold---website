import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize the React application and render it into the root element.
// این بخش برنامه ری‌اکت را راه‌اندازی کرده و آن را درون عنصر ریشه (root) رندر می‌کند.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

