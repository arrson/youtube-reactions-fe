import {
  Text,
  LinkBox,
  LinkOverlay,
  Button,
  IconButton,
  Flex,
  Box,
  Tooltip,
  Divider,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { TbPlus } from 'react-icons/tb';
import Container from 'components/Container';
import Video from 'components/Video';
import { VideoReactions } from 'services/api';
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

const Sidebar = ({
  videos,
  onCreate,
}: {
  videos: VideoReactions;
  onCreate: () => void;
}) => {
  const videoSections = useMemo(() => {
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

    return sections;
  }, [videos]);

  const content = videoSections.length ? (
    <>
      {videoSections}
      <Divider mb={2} />
    </>
  ) : (
    <Button mb={2} leftIcon={<TbPlus />} onClick={onCreate}>
      Add Reaction
    </Button>
  );

  return <Container>{content}</Container>;
};

export default Sidebar;
