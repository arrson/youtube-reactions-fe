import {
  IconButton,
  Text,
  Portal,
  Flex,
  ScaleFade,
  Box,
} from '@chakra-ui/react';
import { TbX } from 'react-icons/tb';
import Container from '../Container';
import styles from './styles.module.scss';

const Panel = ({
  isOpen,
  children,
  title = 'Youtube Reactions',
  onClose,
}: {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <Portal>
    <ScaleFade initialScale={0.9} in={isOpen} unmountOnExit={true}>
      <Container className={styles.panel} variant="gray">
        <Flex justifyContent="space-between" alignItems="center" p={1}>
          <Text px={4}>{title}</Text>
          <IconButton
            variant="ghost"
            aria-label="close"
            icon={<TbX />}
            onClick={onClose}
          />
        </Flex>
        <Box p={4}>{children}</Box>
      </Container>
    </ScaleFade>
  </Portal>
);

export default Panel;
