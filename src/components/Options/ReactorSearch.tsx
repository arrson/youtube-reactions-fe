import { SearchIcon } from '@chakra-ui/icons';
import {
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { differenceBy } from 'lodash';
import { Channel } from 'services/api';
import { useAuth } from 'services/authContext';
import { useEffect, useMemo, useRef, useState } from 'react';
import SearchResultList from './SearchResultList';

interface Props {
  onAddReactor: (c: Channel) => void;
  selectedReactors: Channel[];
}

const ReactorSearch = ({ onAddReactor, selectedReactors }: Props) => {
  const { api } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [searchResults, setSearchResults] = useState<Channel[]>([]);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const initialFocusRef = useRef();

  const onSearchSubmit = async (searchTerm: string) => {
    setLoading(true);
    try {
      const res = await api.searchChannelName(searchTerm);
      if (res.state === 'error') {
        throw new Error(res.data.message);
      }
      const filteredRes = differenceBy(res.data, selectedReactors, 'id');
      setSearchResults(filteredRes);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const filteredSearchRes = useMemo(() => {
    return differenceBy(searchResults, selectedReactors, 'id');
  }, [searchResults, selectedReactors]);

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

  return (
    <>
      <Popover
        placement="bottom"
        returnFocusOnClose={false}
        isOpen={isOpen && searchTerm}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
      >
        <PopoverAnchor>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <SearchIcon />
            </InputLeftElement>
            <Input
              bg="gray.600"
              onFocus={onToggle}
              onBlur={onToggle}
              fontWeight="bold"
              onChange={(e) => setDebouncedTerm(e.target.value)}
              ref={initialFocusRef}
              value={debouncedTerm}
              placeholder="Search..."
            />
          </InputGroup>
        </PopoverAnchor>
        <PopoverContent fontSize="xl">
          {!!error && <div>{error}</div>}
          {!loading && (
            <SearchResultList
              results={filteredSearchRes}
              onClick={onAddReactor}
            />
          )}
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
