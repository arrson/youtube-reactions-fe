import React from 'react';
import { createRoot } from 'react-dom/client'
import Popup from './Popup';
import './index.css';

createRoot(document.getElementById('app-container')).render(<Popup />);

if (module.hot) module.hot.accept();