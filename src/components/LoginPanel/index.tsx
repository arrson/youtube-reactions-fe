import { Button, Center, Text, Flex } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from 'services/authContext';

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

const LoginPanel = () => {
  const { user, login, logout } = useAuth();

  return (
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
  );

  //{ onClose }: { onClose: () => void }
  // return (
  //   <Portal>
  //     <Container className={styles.panel} variant="gray">
  //       <Flex justifyContent="space-between" alignItems="center">
  //         <Text px={2}>Youtube Reactions</Text>
  //         <IconButton
  //           variant="ghost"
  //           aria-label="close"
  //           icon={<FaTimes />}
  //           onClick={onClose}
  //         />
  //       </Flex>
  //       <Flex alignItems="center" flexDirection="column" p={4}>
  //         {user ? (
  //           <>
  //             <UserInfo displayName={user.displayName} email={user.email} />
  //             <LogoutButton onClick={logout} />
  //           </>
  //         ) : (
  //           <LoginButton onClick={login} />
  //         )}
  //       </Flex>
  //     </Container>
  //   </Portal>
  // );
};

export default LoginPanel;
