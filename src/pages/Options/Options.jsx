import React from 'react';
import SelectedReactorsList from 'components/Options/SelectedReactorsList';

import ReactorSearch from 'components/Options/ReactorSearch';
import { Box, Center, VStack } from '@chakra-ui/react';

const Options = (props) => {
  return (
    <Center>
      <VStack>
        <Box shadow="md" borderWidth="1px">
          <ReactorSearch></ReactorSearch>
        </Box>
        <Box maxW="lg" shadow="md" borderWidth="1px">
          <SelectedReactorsList></SelectedReactorsList>
        </Box>
      </VStack>
    </Center>
  );
};

export default Options;
