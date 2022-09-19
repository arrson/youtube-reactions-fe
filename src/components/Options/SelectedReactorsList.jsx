import { useState } from 'react';
import { creators } from '../../data/TestData';
import { Box, Avatar, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

const SelectedReactorsList = (props) => {
  const reactors = creators;
  // localStorage.getItem('reactors') != null
  //   ? localStorage.getItem('reactors')
  //   : creators; // FOR TESTING PURPOSES ATM

  const [userReactors, setUserReactors] = useState(reactors);

  const deleteReactor = (id) => {
    const deleted = userReactors.filter((reactor) => reactor.id !== id);
    localStorage.setItem(
      'reactors',
      deleted.map((x) => x.id)
    );
    setUserReactors(deleted);
  };

  const creatorList = userReactors.map((creator) => {
    return (
      <Tag key={creator.id} size="lg" colorScheme="blue" borderRadius="full">
        <Avatar size="md" src={creator.img_url} name={creator.name} />
        <TagLabel>{creator.name}</TagLabel>
        <TagCloseButton onClick={() => deleteReactor(creator.id)} />
      </Tag>
    );
  });

  return <Box>{creatorList}</Box>;
};

export default SelectedReactorsList;
