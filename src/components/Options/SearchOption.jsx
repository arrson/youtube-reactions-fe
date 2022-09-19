import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';

const SearchOption = (props) => {
  return (
    <Button size="lg">
      <Flex>
        <Avatar src={props.thumbnail} />
        <Box ml="3">
          <Text fontWeight="bold">{props.name}</Text>
        </Box>
      </Flex>
    </Button>
  );
};
export default SearchOption;
