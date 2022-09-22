import { Box, Avatar, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { Channel } from 'services/api';

interface Props {
  reactors: Channel[];
  onDelete: (id: string) => void;
}

const SelectedReactorsList = ({ reactors, onDelete }: Props) => {
  const creatorList = reactors.map((creator) => {
    return (
      <Tag key={creator.id} size="lg" colorScheme="blue" borderRadius="full">
        <Avatar size="md" src={creator.img} name={creator.name} />
        <TagLabel>{creator.name}</TagLabel>
        <TagCloseButton onClick={() => onDelete(creator.id)} />
      </Tag>
    );
  });

  return <Box>{creatorList}</Box>;
};

export default SelectedReactorsList;
