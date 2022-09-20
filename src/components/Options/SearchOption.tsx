import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';

interface Props {
  thumbnail: string;
  name: string;
}
const SearchOption = ({ thumbnail, name }: Props) => {
  return (
    <Button size="lg">
      <Flex>
        <Avatar src={thumbnail} />
        <Box ml="3">
          <Text fontWeight="bold">{name}</Text>
        </Box>
      </Flex>
    </Button>
  );
};
export default SearchOption;
