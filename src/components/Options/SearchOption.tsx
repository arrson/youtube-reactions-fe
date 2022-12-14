import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';

interface Props {
  thumbnail: string;
  name: string;
  onClick: () => void;
}

const SearchOption = ({ thumbnail, name, onClick }: Props) => {
  return (
    <>
      <Button size="lg" onClick={onClick} h="100%" borderRadius="none">
        <Flex>
          <Avatar src={thumbnail} />
          <Box ml="3">
            <Text fontWeight="bold">{name}</Text>
          </Box>
        </Flex>
      </Button>
    </>
  );
};
export default SearchOption;
