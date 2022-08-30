import React, { useEffect, useState } from 'react';
import { youtubeParser } from '../../services/utils';
import { getReactionVideos } from '../../services/api';

import { Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Container from 'components/Container';
import Video from './components/Video';

import styles from './styles.module.scss';

const Sidebar = () => {
  const [reactions, setReactions] = useState(false);
  useEffect(() => {
    (async () => {
      const id = youtubeParser(window.location.href);
      const videos = await getReactionVideos(id);
      setReactions(
        videos.map((d) => ({
          id: d.id,
          url: `https://www.youtube.com/watch?v=${d.id}`,
          title: d.title,
          thumbnail: d.thumbnail,
        }))
      );
    })();
  }, []);

  if (!reactions || !reactions.length) return null;

  return (
    <Container mb="1">
      <Text mb="1" fontWeight="bold" fontSize="lg">
        Reactions
      </Text>
      {reactions.map((d) => (
        <LinkBox py="1" key={d.id}>
          <LinkOverlay className={styles.video} href={d.url} isExternal={false}>
            <Video image={d.thumbnail} title={d.title} />
          </LinkOverlay>
        </LinkBox>
      ))}
    </Container>
  );
};

export default Sidebar;
