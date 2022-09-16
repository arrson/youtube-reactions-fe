import { useEffect, useState } from 'react';
import {
  Text,
  LinkBox,
  LinkOverlay,
  Button,
  IconButton,
  Flex,
  Box,
  Tooltip,
} from '@chakra-ui/react';
import { TbPlus } from 'react-icons/tb';

import { getYoutubeId } from 'services/utils';
import { VideoReactions } from 'services/api';
import { useAuth } from 'services/authContext';
import { subscribe, unsubscribe, EVENTS } from 'services/events';

import Container from 'components/Container';
import Video from 'components/Video';

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
    <LinkOverlay
      style={{
        display: 'block',
        color: 'inherit',
        textDecoration: 'none',
      }}
      href={getUrl(id)}
      isExternal={false}
    >
      <Video image={thumbnail} title={title} />
    </LinkOverlay>
  </LinkBox>
);

const Sidebar = ({ onCreate }: { onCreate: () => void }) => {
  const { api } = useAuth();
  const [videos, setVideos] = useState<VideoReactions | null>(null);
  const updateVideos = async () => {
    const id = getYoutubeId(window.location.href);
    if (!id) {
      setVideos(null);
      return;
    }

    const { data, state } = await api.getReactionVideos(id);
    if (state === 'success') {
      setVideos(data);
    } else {
      setVideos([]);
      console.error(data.message);
    }
  };

  useEffect(() => {
    updateVideos();
    subscribe(EVENTS.ytvideoId, updateVideos);
    subscribe(EVENTS.reactionCreated, updateVideos);
    return () => {
      unsubscribe(EVENTS.ytvideoId, updateVideos);
      unsubscribe(EVENTS.reactionCreated, updateVideos);
    };
  }, []);

  if (!videos) return null;

  const sections = [];

  if (videos.reactions.length) {
    sections.push(
      <Box key="reactions" mb="2">
        <Title
          title="Reactions"
          onToggle={onCreate}
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
          onToggle={onCreate}
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
          onToggle={onCreate}
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
    <Button leftIcon={<TbPlus />} onClick={onCreate}>
      Add Reaction
    </Button>
  );

  return <Container>{content}</Container>;
};

export default Sidebar;
