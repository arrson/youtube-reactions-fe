import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

export interface ContainerProps extends BoxProps {
  variant?: undefined | 'gray';
}

const CustomBox = (props: ContainerProps) => {
  const css = useStyleConfig('CustomBox', props);
  return <Box {...props} __css={css}></Box>;
};

export default CustomBox;
