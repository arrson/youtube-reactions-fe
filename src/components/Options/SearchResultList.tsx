import { Divider } from '@chakra-ui/react';
import { Channel } from 'services/api';
import SearchOption from './SearchOption';

interface Props {
  results: Channel[];
  onClick: (c: Channel) => void;
}

const SearchResultList = ({ results, onClick }: Props) => {
  return (
    <>
      {results.map((result) => (
        <>
          <SearchOption
            key={result.id}
            thumbnail={result.img}
            name={result.name}
            onClick={() => {
              onClick(result);
            }}
          />
          <Divider />
        </>
      ))}
    </>
  );
};

export default SearchResultList;
