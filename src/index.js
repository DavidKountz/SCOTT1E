import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
    // had to disable strict mode because
    // it was causing keypresses to register twice
);