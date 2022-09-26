import UserReactors from 'components/Options/UserReactors';

import ReactorSearch from 'components/Options/ReactorSearch';
import { Box, Center, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Channel } from 'services/api';

const Options = () => {
  const [userReactors, setUserReactors] = useState<Channel[]>([]);

  useEffect(() => {
    chrome.storage.local.get(['userReactors'], function (result) {
      if (!result.userReactors) return;
      setUserReactors(result.userReactors);
    });
  }, []);

  const setReactors = (channels: Channel[]) => {
    setUserReactors(channels);
    chrome.storage.local.set({ userReactors: channels }, function () {
      //TODO Error handling
      console.log(chrome.runtime.lastError);
    });
  };
  const addReactor = (c: Channel) => {
    setReactors([...userReactors, c]);
  };

  const deleteReactor = (id: string) => {
    const deleted = userReactors.filter((reactor) => reactor.id !== id);
    setReactors(deleted);
  };

  return (
    <Center>
      <VStack w="full" spacing={10} p={10}>
        <Box w="25%">
          <ReactorSearch
            onAddReactor={addReactor}
            selectedReactors={userReactors}
          ></ReactorSearch>
        </Box>
        <Box w="40%">
          <UserReactors
            reactors={userReactors}
            onDelete={deleteReactor}
          ></UserReactors>
        </Box>
      </VStack>
    </Center>
  );
};

export default Options;
