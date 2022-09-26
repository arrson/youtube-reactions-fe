import {
  Avatar,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Channel } from 'services/api';

interface Props {
  reactors: Channel[];
  onDelete: (id: string) => void;
}

const SelectedReactorsList = ({ reactors, onDelete }: Props) => {
  const creatorList = reactors.map((creator) => {
    return (
      <WrapItem key={creator.id}>
        <Tag size="lg" colorScheme="blue">
          <Avatar
            size="md"
            src={creator.img}
            name={creator.name}
            ml={-1}
            mr={2}
          />
          <TagLabel>{creator.name}</TagLabel>
          <TagCloseButton onClick={() => onDelete(creator.id)} />
        </Tag>
      </WrapItem>
    );
  });

  return <Wrap justify="center">{creatorList}</Wrap>;
};

export default SelectedReactorsList;
