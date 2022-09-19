import { SearchIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  Input,
  InputGroup,
  Popover,
  PopoverAnchor,
  PopoverContent,
  InputLeftElement,
  Spinner,
  Center,
  Divider,
} from '@chakra-ui/react';
import { useAuth } from 'services/authContext';
import React, { useEffect, useState } from 'react';
import SearchOption from './SearchOption';
// import youtube from 'services/youtube';

const ReactorSearch = () => {
  const { api } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [searchResults, setSearchResults] = useState([]);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const initialFocusRef = React.useRef();

  const onSearchSubmit = async (searchTerm) => {
    setLoading(true);
    try {
      const data = await api.searchChannelName(searchTerm);
      console.log('setting');
      setSearchResults(data);
    } catch (e) {
      console.log('error searching');
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(debouncedTerm), 800);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  useEffect(() => {
    if (searchTerm !== '') {
      onSearchSubmit(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  let searchDomContent = '';
  if (searchResults.length > 0) {
    searchDomContent = searchResults.map((result) => (
      <>
        <SearchOption
          key={result.channelId}
          thumbnail={result.thumbnail}
          name={result.name}
        />
        <Divider />
      </>
    ));
  }

  return (
    <>
      <Popover
        placement="bottom"
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
      >
        <PopoverAnchor>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon />
            </InputLeftElement>
            <Input
              onFocus={onToggle}
              onBlur={onToggle}
              onChange={(e) => setDebouncedTerm(e.target.value)}
              display="inline-flex"
              placeholder="Search..."
              ref={initialFocusRef}
              value={debouncedTerm}
            />
          </InputGroup>
        </PopoverAnchor>
        <PopoverContent fontSize="xl">
          {!loading && searchDomContent}
          {loading && (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ReactorSearch;
