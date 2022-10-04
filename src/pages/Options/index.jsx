import { createRoot } from 'react-dom/client';
import Options from './Options';
import ChakraWrapper from 'components/ChakraWrapper';
import './index.css';

createRoot(document.getElementById('app-container')).render(
  <ChakraWrapper>
    <Options title={'Settings'} />{' '}
  </ChakraWrapper>
);

if (module.hot) module.hot.accept();
