import React, { useEffect, useState } from 'react';
import {
  Text,
  LinkBox,
  LinkOverlay,
  useDisclosure,
  Button,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { TbPlus } from 'react-icons/tb';

import { getYoutubeId } from 'services/utils';
import { getReactionVideos } from 'services/api';

import Container from 'components/Container';
import Video from 'components/Video';
import AddReactionModal from 'components/AddReactionModal';

import styles from './styles.module.scss';

const Sidebar = () => {
  const [reactions, setReactions] = useState(false);
  const { isOpen, onToggle } = useDisclosure();

  const updateVideos = async () => {
    const id = getYoutubeId(window.location.href);
    const videos = await getReactionVideos(id);
    setReactions(
      videos.map((d) => ({
        id: d.id,
        url: `https://www.youtube.com/watch?v=${d.id}`,
        title: d.title,
        thumbnail: d.thumbnail,
      }))
    );
  };

  useEffect(() => {
    updateVideos();
    window.addEventListener('YT_VIDEO_ID', updateVideos, false);

    return () => {
      window.removeEventListener('YT_VIDEO_ID', updateVideos, false);
    };
  }, []);

  if (!reactions) return null;

  const content = reactions.length ? (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Text mb="1" fontWeight="bold" fontSize="lg">
          Reactions
        </Text>
        <IconButton
          aria-label="Add reaction"
          icon={<TbPlus />}
          onClick={onToggle}
          variant="ghost"
        />
      </Flex>
      {reactions.map((d) => (
        <LinkBox py="1" key={d.id}>
          <LinkOverlay className={styles.video} href={d.url} isExternal={false}>
            <Video image={d.thumbnail} title={d.title} />
          </LinkOverlay>
        </LinkBox>
      ))}
    </>
  ) : (
    <Button leftIcon={<TbPlus />} onClick={onToggle}>
      Add Reaction
    </Button>
  );

  return (
    <Container mb="1">
      <AddReactionModal
        isOpen={isOpen}
        onToggle={onToggle}
        onSubmit={() => {
          updateVideos();
          onToggle();
        }}
      />
      {content}
    </Container>
  );
};

export default Sidebar;
