import React from 'react';
import { createRoot } from 'react-dom/client'
import Sidebar from './Sidebar';

const container = document.getElementById('sidebar-extention-container');
if (container) {
  createRoot(container).render(<Sidebar />);
}

if (module.hot) module.hot.accept();
