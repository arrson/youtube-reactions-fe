import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

const ChakraWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
    {localStorage.setItem(
      'chakra-ui-color-mode',
      theme.config.initialColorMode
    )}
    <ChakraProvider resetCSS={false} theme={theme}>
      {children}
    </ChakraProvider>
  </>
);

export default ChakraWrapper;
