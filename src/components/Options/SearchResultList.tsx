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
      {results.map((r, index) => {
        return (
          <>
            <SearchOption
              key={r.id}
              thumbnail={r.img}
              name={r.name}
              onClick={() => {
                onClick(r);
              }}
            />
            {index !== results.length - 1 ? <Divider /> : null}
          </>
        );
      })}
    </>
  );
};

export default SearchResultList;
