import * as React from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('app-container')).render(
  <React.StrictMode>
    <div></div>
  </React.StrictMode>
);

if (module.hot) module.hot.accept();
