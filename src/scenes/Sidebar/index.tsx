import { useState } from 'react';
import ChakraWrapper from 'components/ChakraWrapper';
import { AuthProvider } from 'services/authContext';
import Sidebar from 'components/Sidebar';
import LoginPanel from 'components/LoginPanel';

const Wrapper = () => {
  const [showLogin, setShowLogin] = useState(false);
  const toggle = () => setShowLogin(!showLogin);

  return (
    <AuthProvider>
      <ChakraWrapper>
        {!!showLogin && (
          <LoginPanel
            onClose={() => {
              setShowLogin(false);
            }}
          />
        )}
        {/* <button onClick={toggle}>show login</button> */}
        <Sidebar toggleLoginPanel={toggle} />
      </ChakraWrapper>
    </AuthProvider>
  );
};

export default Wrapper;
