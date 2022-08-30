import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode, Styles } from '@chakra-ui/theme-tools';
import { StyleFunctionProps } from '@chakra-ui/styled-system';

const colors = {
  color: mode('gray.800', '#fff'),
  background: mode('#F9F9F9', '#181818'),
  contentBackground: mode('#EDF2F6', '#212121'),
};

const youtubeContainer = document.getElementById('contentContainer') as Element;
const initialColorMode =
  window.getComputedStyle(youtubeContainer).backgroundColor ===
  'rgb(249, 249, 249)'
    ? 'light'
    : 'dark';

const config: ThemeConfig = {
  initialColorMode,
  useSystemColorMode: false,
};
const styles: Styles = {
  global: () => ({ body: { bg: '' } }),
};

const components = {
  Modal: {
    baseStyle: (props: StyleFunctionProps) => ({
      dialog: {
        bg: colors.background(props),
      },
    }),
  },
  Input: {
    baseStyle: {
      borderRadius: '2',
    },
  },
  Button: {
    baseStyle: {
      borderRadius: '2',
    },
  },
  CustomBox: {
    baseStyle: (props: StyleFunctionProps) => ({
      bg: colors.background(props),
      color: colors.color(props),
    }),
    variants: {
      content: (props: StyleFunctionProps) => ({
        bg: colors.contentBackground(props),
      }),
    },
  },
};

const theme = extendTheme({
  colors,
  fontSizes: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '28px',
    '5xl': '36px',
    '6xl': '48px',
  },
  config,
  styles,
  components,
});

export default theme;
