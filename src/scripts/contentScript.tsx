import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Sidebar from 'components/Sidebar';
import Panel from 'components/Panel';

import { MESSAGES } from 'services/utils';
import { EVENTS, publish, subscribe } from 'services/events';
import { User } from 'services/api';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import ChakraWrapper from 'components/ChakraWrapper';
import { AuthProvider } from 'services/authContext';

const createShadowRoot = (container: HTMLElement, react: React.ReactNode) => {
  const shadowRoot = container.attachShadow({ mode: 'open' });
  const myCache = createCache({
    container: shadowRoot,
    key: 'c',
  });

  const style = document.createElement('style');
  style.appendChild(
    document.createTextNode(`
    html { 
      font-size: 14px;
    }`)
  );
  shadowRoot.appendChild(style);

  const rootElement = document.createElement('html');
  shadowRoot.appendChild(rootElement);

  return createRoot(rootElement).render(
    <React.StrictMode>
      <CacheProvider value={myCache}>
        <AuthProvider>
          <ChakraWrapper>{react}</ChakraWrapper>
        </AuthProvider>
      </CacheProvider>
    </React.StrictMode>
  );
};

const waitForElm = (selector: string): Promise<Element | null> => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

const SIDEBAR_ID = 'yt-reaction-extention-sidebar';
const PANEL_ID = 'yt-reaction-extention-panel';

(() => {
  let user: User | undefined;
  let activePanel: string | boolean = false;

  const loadSidebar = async () => {
    const container = document.createElement('div');
    container.id = SIDEBAR_ID;
    const parentNode = await waitForElm(
      '#secondary > #secondary-inner > #related'
    );
    parentNode?.prepend(container);

    const onCreate = () => {
      loadPanel(user ? 'create' : 'login');
    };

    createShadowRoot(container, <Sidebar onCreate={onCreate} />);
  };

  const closePanel = () => {
    const panel = document.getElementById(PANEL_ID);
    panel?.remove();
    activePanel = false;
  };

  const loadPanel = (panel: 'login' | 'create') => {
    closePanel();
    const container = document.createElement('div');
    container.id = PANEL_ID;
    document.body.appendChild(container);
    createShadowRoot(
      container,
      <Panel
        panel={panel}
        onClose={closePanel}
        onSubmit={() => {
          closePanel();
          publish(EVENTS.reactionCreated);
        }}
      />
    );
    activePanel = panel;
  };

  window.addEventListener('load', () => {
    let isLoaded = false;
    chrome.runtime.onMessage.addListener((request) => {
      if (request.message === MESSAGES.videoId) {
        if (!isLoaded) {
          loadSidebar();
          isLoaded = true;
        }
        publish(EVENTS.ytvideoId);
      }
      return true;
    });

    const subscriptions = {
      [EVENTS.userUpdated]: (e: CustomEvent) => {
        if (user === e.detail.user) return;
        user = e.detail.user;

        // assume user logged in as a result of trying to create a reaction
        // show reaction panel
        if (activePanel === 'login') {
          loadPanel('create');
        }
      },
    };

    Object.keys(subscriptions).forEach((event) => {
      subscribe(event, subscriptions[event]);
    });
  });
})();
