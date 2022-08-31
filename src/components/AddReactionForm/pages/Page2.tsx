import { useState } from 'react';
import {
  Icon,
  Text,
  Button,
  IconButton,
  Flex,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import { TbArrowsUpDown } from 'react-icons/tb';
import Video from 'components/Video';

import { PageProps } from '../types';

const Page = ({ formValue, onSubmit }: PageProps) => {
  const [videos, setVideos] = useState({
    original: formValue.original,
    reaction: formValue.reaction,
  });

  return (
    <>
      <ModalBody>
        <Video
          title={videos.reaction.title}
          image={videos.reaction.thumbnail}
          subtitle="Reaction Video"
          variant="gray"
        />
        <Flex mt={2} mb={2} alignItems="center">
          <IconButton
            aria-label="switch"
            colorScheme="blue"
            variant="outline"
            mr={2}
            icon={<Icon as={TbArrowsUpDown} />}
            onClick={() => {
              setVideos({
                original: videos.reaction,
                reaction: videos.original,
              });
            }}
          />
          <Text>is a reaction to</Text>
        </Flex>
        <Video
          title={videos.original.title}
          image={videos.original.thumbnail}
          subtitle="Original Video"
          variant="gray"
        />
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="blue"
          onClick={() => {
            onSubmit({ ...formValue, ...videos });
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </>
  );
};

export default Page;
