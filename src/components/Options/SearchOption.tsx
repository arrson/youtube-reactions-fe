import { Avatar, Box, Button, Divider, Flex, Text } from '@chakra-ui/react';

interface Props {
  thumbnail: string;
  name: string;
  onClick: () => void;
}

const SearchOption = ({ thumbnail, name, onClick }: Props) => {
  return (
    <>
      <Button size="lg" onClick={onClick}>
        <Flex>
          <Avatar src={thumbnail} />
          <Box ml="3">
            <Text fontWeight="bold">{name}</Text>
          </Box>
        </Flex>
      </Button>
      <Divider />
    </>
  );
};
export default SearchOption;
