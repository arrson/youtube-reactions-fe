import { useMemo } from 'react';
import { IconButton, Text, Flex, Box } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import Container from '../Container';

import LoginPanel from 'components/LoginPanel';
import AddReactionForm from 'components/AddReactionForm';

interface PanelProps {
  panel: 'login' | 'create';
  onClose: () => void;
  onSubmit: () => void;
}

const Panel = ({ panel, onClose, onSubmit }: PanelProps) => {
  const PanelComponent = useMemo(() => {
    if (panel === 'login') {
      console.log('LOGIN');
      return LoginPanel;
    }
    // eslint-disable-next-line react/display-name
    return () => <AddReactionForm onSubmit={onSubmit} />;
  }, [panel]);

  return (
    <div
      style={{
        position: 'fixed',
        right: '12px',
        top: '12px',
        width: '300px',
        zIndex: '10000',
        borderRadius: '4px',
        boxShadow: 'rgb(0 0 0 / 35%) 0px 5px 15px',
      }}
    >
      <Container variant="gray">
        <Flex justifyContent="space-between" alignItems="center">
          <Text px={2}>Youtube Reactions</Text>
          <IconButton
            variant="ghost"
            aria-label="close"
            icon={<FaTimes />}
            onClick={onClose}
          />
        </Flex>
        <Box p={4}>
          <PanelComponent />
        </Box>
      </Container>
    </div>
  );
};

export default Panel;
