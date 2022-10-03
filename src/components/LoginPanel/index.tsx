import { Button, Center, Text, Flex } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from 'services/authContext';
import Panel from '../Panel';

const LoginButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    w={'full'}
    maxW={'md'}
    variant={'outline'}
    leftIcon={<FcGoogle />}
    onClick={onClick}
  >
    <Center>
      <Text>Sign in with Google</Text>
    </Center>
  </Button>
);

const LogoutButton = ({ onClick }: { onClick: () => void }) => (
  <Button w={'full'} maxW={'md'} variant={'outline'} onClick={onClick}>
    Sign out
  </Button>
);

const UserInfo = ({
  displayName,
  email,
}: {
  displayName: string;
  email: string;
}) => (
  <Flex alignItems="center" flexDirection="column" mb={10}>
    <Text>{displayName}</Text>
    <Text fontSize="xs">{email}</Text>
  </Flex>
);

const LoginPanel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user, login, logout } = useAuth();

  return (
    <Panel onClose={onClose} isOpen={isOpen}>
      <Flex alignItems="center" flexDirection="column" p={4}>
        {user ? (
          <>
            <UserInfo displayName={user.displayName} email={user.email} />
            <LogoutButton onClick={logout} />
          </>
        ) : (
          <LoginButton onClick={login} />
        )}
      </Flex>
    </Panel>
  );
};

export default LoginPanel;
