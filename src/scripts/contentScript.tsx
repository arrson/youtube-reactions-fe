import * as React from 'react';
import { createRoot } from 'react-dom/client';

import ChakraWrapper from 'components/ChakraWrapper';
import Sidebar from 'components/Sidebar';

(() => {
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

  const SIDEBAR_ID = 'sidebar-extention-container';
  const loadSidebar = async () => {
    const container = document.createElement('div');
    container.id = SIDEBAR_ID;

    const parentNode = await waitForElm(
      '#secondary > #secondary-inner > #related'
    );
    parentNode?.prepend(container);
    createRoot(container).render(
      <React.StrictMode>
        <ChakraWrapper>
          <Sidebar />
        </ChakraWrapper>
      </React.StrictMode>
    );
  };

  window.addEventListener('load', () => {
    let isLoaded = false;
    chrome.runtime.onMessage.addListener((request) => {
      if (request.message === 'ytvideoid') {
        if (!isLoaded) {
          loadSidebar();
          isLoaded = true;
        }
        // send a custom event to the react component to update
        const event = new CustomEvent('YT_VIDEO_ID', { detail: {} });
        window.dispatchEvent(event);
      }
    });
  });
})();
