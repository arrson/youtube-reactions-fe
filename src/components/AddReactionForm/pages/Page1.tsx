import { useState } from 'react';
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

import { getVideosInfo } from 'services/api';
import { getYoutubeId } from 'services/utils';
import { PageProps } from '../types';

const getVideoInfo = async ({
  original,
  reaction,
}: {
  original: string;
  reaction: string;
}) => {
  const videos = await getVideosInfo([original, reaction].join(','));
  return {
    original: videos.find((d) => d.id === original),
    reaction: videos.find((d) => d.id === reaction),
  };
};

const Page = ({ formValue, onSubmit }: PageProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const trySubmit = async () => {
    setIsLoading(true);

    const original = getYoutubeId(window.location.href);
    const reaction = getYoutubeId(url);
    if (!reaction) {
      setError('Invalid YouTube Url');
      setIsLoading(false);
      return;
    }

    try {
      const videos = await getVideoInfo({ original, reaction });
      setIsLoading(false);
      onSubmit({ ...formValue, ...videos, url });
    } catch (e) {
      setError('Invalid YouTube Url');
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalBody>
        <FormControl isInvalid={!!error}>
          <FormLabel>Related Video</FormLabel>
          <Input
            placeholder="Enter video url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button
          isDisabled={!url}
          isLoading={isLoading}
          colorScheme="blue"
          onClick={trySubmit}
        >
          Add Reaction
        </Button>
      </ModalFooter>
    </>
  );
};

export default Page;
