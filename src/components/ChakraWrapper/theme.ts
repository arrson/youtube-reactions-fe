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
  youtubeContainer &&
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
  Button: {
    baseStyle: {
      borderColor: 'transparent',
    },
    variants: {
      ghost: {
        bg: 'transparent',
      },
    },
  },
  CloseButton: {
    baseStyle: {
      borderColor: 'transparent',
      background: 'transparent',
      margin: '8px',
    },
  },
  Modal: {
    baseStyle: (props: StyleFunctionProps) => ({
      dialogContainer: {
        fontSize: '14px',
      },
      dialog: {
        bg: colors.background(props),
      },
    }),
  },
  Input: {
    baseStyle: {
      field: {
        boxSizing: 'border-box',
      },
    },
    variants: {
      outline: (props: StyleFunctionProps) => ({
        field: {
          borderColor: mode('#E2E8F0', '#4B4B4B')(props),
        },
      }),
    },
  },
  CustomBox: {
    baseStyle: (props: StyleFunctionProps) => ({
      bg: colors.background(props),
      color: colors.color(props),
      fontSize: '14px',
    }),
    variants: {
      gray: (props: StyleFunctionProps) => ({
        bg: colors.contentBackground(props),
        borderRadius: '2',
        p: '2',
      }),
    },
  },
};

// default theme, but em instead of rem
// since youtube have a 10px font-size
const defaultTheme = {
  breakpoints: {
    base: '0em',
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 2000,
    sticky: 2100,
    banner: 2200,
    overlay: 1300,
    modal: 2400,
    popover: 2500,
    skipLink: 2600,
    toast: 2700,
    tooltip: 2800,
  },
  radii: {
    none: '0',
    sm: '0.125em',
    base: '0.25em',
    md: '0.375em',
    lg: '0.5em',
    xl: '0.75em',
    '2xl': '1em',
    '3xl': '1.5em',
    full: '9999px',
  },
  fontSizes: {
    xs: '0.75em',
    sm: '0.875em',
    md: '1em',
    lg: '1.125em',
    xl: '1.25em',
    '2xl': '1.5em',
    '3xl': '1.875em',
    '4xl': '2.25em',
    '5xl': '3em',
    '6xl': '3.75em',
    '7xl': '4.5em',
    '8xl': '6em',
    '9xl': '8em',
  },
  sizes: {
    '1': '0.25em',
    '2': '0.5em',
    '3': '0.75em',
    '4': '1em',
    '5': '1.25em',
    '6': '1.5em',
    '7': '1.75em',
    '8': '2em',
    '9': '2.25em',
    '10': '2.5em',
    '12': '3em',
    '14': '3.5em',
    '16': '4em',
    '20': '5em',
    '24': '6em',
    '28': '7em',
    '32': '8em',
    '36': '9em',
    '40': '10em',
    '44': '11em',
    '48': '12em',
    '52': '13em',
    '56': '14em',
    '60': '15em',
    '64': '16em',
    '72': '18em',
    '80': '20em',
    '96': '24em',
    px: '1px',
    '0.5': '0.125em',
    '1.5': '0.375em',
    '2.5': '0.625em',
    '3.5': '0.875em',
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '14em',
    '2xs': '16em',
    xs: '20em',
    sm: '24em',
    md: '28em',
    lg: '32em',
    xl: '36em',
    '2xl': '42em',
    '3xl': '48em',
    '4xl': '56em',
    '5xl': '64em',
    '6xl': '72em',
    '7xl': '80em',
    '8xl': '90em',
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  space: {
    '1': '0.25em',
    '2': '0.5em',
    '3': '0.75em',
    '4': '1em',
    '5': '1.25em',
    '6': '1.5em',
    '7': '1.75em',
    '8': '2em',
    '9': '2.25em',
    '10': '2.5em',
    '12': '3em',
    '14': '3.5em',
    '16': '4em',
    '20': '5em',
    '24': '6em',
    '28': '7em',
    '32': '8em',
    '36': '9em',
    '40': '10em',
    '44': '11em',
    '48': '12em',
    '52': '13em',
    '56': '14em',
    '60': '15em',
    '64': '16em',
    '72': '18em',
    '80': '20em',
    '96': '24em',
    px: '1px',
    '0.5': '0.125em',
    '1.5': '0.375em',
    '2.5': '0.625em',
    '3.5': '0.875em',
  },
};

const theme = extendTheme({
  ...defaultTheme,
  colors,
  config,
  styles,
  components,
});

export default theme;
