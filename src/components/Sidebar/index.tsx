import { useEffect, useState } from 'react';
import {
  Text,
  LinkBox,
  LinkOverlay,
  useDisclosure,
  Button,
  IconButton,
  Flex,
  Box,
  Tooltip,
} from '@chakra-ui/react';
import { TbPlus } from 'react-icons/tb';

import { getYoutubeId } from 'services/utils';
import { getReactionVideos, VideoReactions } from 'services/api';

import Container from 'components/Container';
import Video from 'components/Video';
import AddReactionModal from 'components/AddReactionModal';

import styles from './styles.module.scss';

const getUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const Title = ({
  title,
  onToggle,
  showAddReaction = true,
}: {
  title: string;
  onToggle: () => void;
  showAddReaction?: boolean;
}) => (
  <Flex alignItems="center" justifyContent="space-between">
    <Text mb="1" fontWeight="bold" fontSize="md">
      {title}
    </Text>
    {!!showAddReaction && (
      <Tooltip label="Add reaction">
        <span>
          <IconButton
            aria-label="Add reaction"
            icon={<TbPlus />}
            onClick={onToggle}
            variant="ghost"
          />
        </span>
      </Tooltip>
    )}
  </Flex>
);

const VideoLink = ({
  id,
  thumbnail,
  title,
}: {
  id: string;
  thumbnail: string;
  title: string;
}) => (
  <LinkBox py="1">
    <LinkOverlay className={styles.video} href={getUrl(id)} isExternal={false}>
      <Video image={thumbnail} title={title} />
    </LinkOverlay>
  </LinkBox>
);

const Sidebar = () => {
  const [videos, setVideos] = useState<VideoReactions | null>(null);
  const { isOpen, onToggle } = useDisclosure();

  const updateVideos = async () => {
    const id = getYoutubeId(window.location.href);
    if (!id) {
      setVideos(null);
      return;
    }

    const videos = await getReactionVideos(id);
    setVideos(videos);
  };

  useEffect(() => {
    updateVideos();
    window.addEventListener('YT_VIDEO_ID', updateVideos, false);
    return () => {
      window.removeEventListener('YT_VIDEO_ID', updateVideos, false);
    };
  }, []);

  if (!videos) return null;

  const sections = [];

  if (videos.reactions.length) {
    sections.push(
      <Box key="reactions" mb="2">
        <Title
          title="Reactions"
          onToggle={onToggle}
          showAddReaction={!sections.length}
        />
        {videos.reactions.map((d) => (
          <VideoLink key={d.id} {...d} />
        ))}
      </Box>
    );
  }

  if (videos.reactionTo.length) {
    sections.push(
      <Box key="reactionTo" mb="2">
        <Title
          title="Reaction To"
          onToggle={onToggle}
          showAddReaction={!sections.length}
        />
        {videos.reactionTo.map((d) => (
          <VideoLink key={d.id} {...d} />
        ))}
      </Box>
    );
  }

  if (videos.otherReactions.length) {
    sections.push(
      <Box key="otherReactions" mb="2">
        <Title
          title="Other Reactions"
          onToggle={onToggle}
          showAddReaction={!sections.length}
        />
        {videos.otherReactions.map((d) => (
          <VideoLink key={d.id} {...d} />
        ))}
      </Box>
    );
  }

  const content = sections.length ? (
    sections
  ) : (
    <Button leftIcon={<TbPlus />} onClick={onToggle}>
      Add Reaction
    </Button>
  );

  return (
    <Container>
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
