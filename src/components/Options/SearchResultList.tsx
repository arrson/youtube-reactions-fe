import { Divider } from '@chakra-ui/react';
import { ChannelSearchResult } from 'services/api';
import SearchOption from './SearchOption';

interface Props {
  results: ChannelSearchResult[];
}

const SearchResultList = ({ results }: Props) => {
  return (
    <>
      {results.map((result) => (
        <>
          <SearchOption
            key={result.channelId}
            thumbnail={result.imgUrl}
            name={result.channelName}
          />
          <Divider />
        </>
      ))}
    </>
  );
};

export default SearchResultList;
