import ChakraWrapper from 'components/ChakraWrapper';
import { AuthProvider } from 'services/authContext';
import Sidebar from 'components/Sidebar';
import LoginPanel from 'components/LoginPanel';
import AddReactionPanel from 'components/AddReactionPanel';

import { getYoutubeId } from 'services/utils';
import { VideoReactions } from 'services/api';
import { useAuth } from 'services/authContext';
import { useEffect, useState } from 'react';

const PANEL = {
  login: 'login',
  create: 'create',
};

const SidebarWrapper = () => {
  const { api, user } = useAuth();
  const [videos, setVideos] = useState<VideoReactions | null>(null);
  const [showFormOnUserLogin, setShowFormOnUserLogin] =
    useState<boolean>(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const togglePanel = (panel: string) => () => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const updateVideos = async () => {
    const id = getYoutubeId(window.location.href);
    if (!id) {
      setVideos(null);
      return;
    }

    const res = await api.getReactionVideos(id);
    if (res.state === 'success') {
      setVideos(res.data);
    } else {
      setVideos(null);
    }
  };

  useEffect(() => {
    updateVideos();
    window.addEventListener('YT_VIDEO_ID', updateVideos, false);
    return () => {
      window.removeEventListener('YT_VIDEO_ID', updateVideos, false);
    };
  }, []);

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

const Wrapper = () => (
  <AuthProvider>
    <ChakraWrapper>
      <SidebarWrapper />
    </ChakraWrapper>
  </AuthProvider>
);

export default Wrapper;
