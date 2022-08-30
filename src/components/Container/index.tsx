import React from 'react';
import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

export interface ContainerProps extends BoxProps {
  variant: null | 'gray';
}

const CustomBox = (props: ContainerProps) => {
  const css = useStyleConfig('CustomBox', {});
  return <Box {...props} __css={css}></Box>;
};

export default CustomBox;
