import { Box, Image, Text } from '@chakra-ui/react';
import Container from '../Container';

interface VideoProps {
  title: string;
  image: string;
  subtitle?: string;
  variant?: null | 'gray';
}

const Video = ({ title, image, subtitle, variant }: VideoProps) => (
  <Container p="2" variant={variant}>
    {!!subtitle && (
      <Text mb="2" fontSize="xs">
        {subtitle}
      </Text>
    )}
    <Box display="flex" alignItems="start">
      <Image
        htmlHeight="60px"
        htmlWidth="auto"
        objectFit="cover"
        src={image}
        alt={title}
        mr="4"
      />
      <Text fontSize="md" py="2" fontWeight="semibold">
        {title}
      </Text>
    </Box>
  </Container>
);

export default Video;
