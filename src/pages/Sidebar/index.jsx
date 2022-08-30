import React from 'react';
import { createRoot } from 'react-dom/client';
import Sidebar from './Sidebar';
import ChakraWrapper from '../../components/ChakraWrapper';

const container = document.getElementById('sidebar-extention-container');

createRoot(container).render(
  <React.StrictMode>
    <ChakraWrapper>
      <Sidebar />
    </ChakraWrapper>
  </React.StrictMode>
);

if (module.hot) module.hot.accept();
