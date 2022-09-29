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
      const res = await api.getVideosInfo([original, reaction].join(','));
      if (res.state === 'error') {
        throw new Error(res.data.message);
      }

      let resolved = {
        original: res.data.find((d) => d.id === original),
        reaction: res.data.find((d) => d.id === reaction),
      };

      if (!resolved.original || !resolved.reaction) {
        throw new Error('unable to get video.');
      }

      // attempt to detect direction of videos
      if (
        resolved.original.title.toLowerCase().includes('react') &&
        !resolved.reaction.title.toLowerCase().includes('react')
      ) {
        resolved = { original: resolved.reaction, reaction: resolved.original };
      }

      setIsLoading(false);
      onSubmit({
        ...formValue,
        ...resolved,
        url,
      });
    } catch (e) {
      setError(e.message);
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
