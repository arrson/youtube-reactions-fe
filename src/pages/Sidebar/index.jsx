import React from 'react';
import { render } from 'react-dom';
import Sidebar from './Sidebar';

render(<Sidebar />, window.document.querySelector('#sidebar-extention-container'));

if (module.hot) module.hot.accept();