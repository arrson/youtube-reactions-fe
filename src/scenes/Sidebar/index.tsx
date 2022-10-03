import ChakraWrapper from 'components/ChakraWrapper';
import { AuthProvider } from 'services/authContext';
import Sidebar from 'components/Sidebar';
import LoginPanel from 'components/LoginPanel';
import AddReactionPanel from 'components/AddReactionPanel';

import { VideoReactions } from 'services/api';
import { useAuth } from 'services/authContext';
import { useEffect, useState } from 'react';
import { getChromeStorage, LOCAL_STORAGE } from 'services/utils';

const PANEL = {
  login: 'login',
  create: 'create',
};

interface SidebarProps {
  id: string;
}

const SidebarWrapper = ({ id }: SidebarProps) => {
  const { api, user } = useAuth();
  const [videos, setVideos] = useState<VideoReactions | null>(null);
  const [showFormOnUserLogin, setShowFormOnUserLogin] =
    useState<boolean>(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const togglePanel = (panel: string) => () => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const updateVideos = async () => {
    if (!id) {
      setVideos(null);
      return;
    }

    const userReactors = await getChromeStorage(LOCAL_STORAGE.userReactors);
    const res = await api.getReactionVideos(id, userReactors);
    if (res.state === 'success') {
      setVideos(res.data);
    } else {
      setVideos(null);
    }
  };

  useEffect(() => {
    updateVideos();
  }, [id]);

  // assume the user is logging in to create a reaction
  useEffect(() => {
    if (showFormOnUserLogin && user) {
      setActivePanel(PANEL.create);
      setShowFormOnUserLogin(false);
    }
  }, [user, showFormOnUserLogin]);

  return (
    <>
      <LoginPanel
        isOpen={activePanel === PANEL.login}
        onClose={togglePanel(PANEL.login)}
      />
      <AddReactionPanel
        isOpen={activePanel === PANEL.create}
        onClose={togglePanel(PANEL.create)}
        onSubmit={() => {
          updateVideos();
          setActivePanel(null);
        }}
      />
      {!!videos && (
        <Sidebar
          videos={videos}
          onCreate={() => {
            // show login panel if user is not logged in
            if (!user) {
              setShowFormOnUserLogin(true);
            }
            setActivePanel(user ? PANEL.create : PANEL.login);
          }}
        />
      )}
    </>
  );
};

const Wrapper = (props: SidebarProps) => (
  <AuthProvider>
    <ChakraWrapper>
      <SidebarWrapper {...props} />
    </ChakraWrapper>
  </AuthProvider>
);

export default Wrapper;
