import { useState } from 'react';
import {
  Button,
  Input,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useAuth } from 'services/authContext';
import { getYoutubeId } from 'services/utils';
import { PageProps } from '../types';

const Page = ({ formValue, onSubmit }: PageProps) => {
  const { api } = useAuth();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const trySubmit = async () => {
    setIsLoading(true);

    const original = getYoutubeId(window.location.href);
    const reaction = getYoutubeId(url);
    if (!original) return;
    if (!reaction) {
      setError('Invalid YouTube Url');
      setIsLoading(false);
      return;
    }

    try {
      const { data: videos } = await api.getVideosInfo(
        [original, reaction].join(',')
      );
      setIsLoading(false);
      onSubmit({
        ...formValue,
        original: videos.find((d) => d.id === original),
        reaction: videos.find((d) => d.id === reaction),
        url,
      });
    } catch (e) {
      setError('Invalid YouTube Url');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box py={2}>
        <FormControl isInvalid={!!error}>
          <FormLabel>Related Video</FormLabel>
          <Input
            placeholder="Enter video url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      </Box>
      <Box py={2}>
        <Button
          isDisabled={!url}
          isLoading={isLoading}
          colorScheme="blue"
          onClick={trySubmit}
        >
          Add Reaction
        </Button>
      </Box>
    </>
  );
};

export default Page;
