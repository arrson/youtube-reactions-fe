import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

interface VideoProps {
  title: string;
  image: string;
  subtitle?: string;
}

const Video = ({ title, image, subtitle }: VideoProps) => {
  return (
    <Box py="2">
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
    </Box>
  );
};

export default Video;
