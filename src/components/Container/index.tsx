import React from 'react';
import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

enum Variant {
  content = 'content',
}
export interface ContainerProps extends BoxProps {
  variant: Variant;
}

const CustomBox = (props: ContainerProps) => {
  const styles = useStyleConfig('CustomBox', {});
  return <Box mx="0" px="0" {...props} __css={styles}></Box>;
};

export default CustomBox;
