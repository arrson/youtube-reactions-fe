import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Sidebar from 'scenes/Sidebar';
import { getYoutubeId } from 'services/utils';

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
  const updateSidebar = async () => {
    document.getElementById(SIDEBAR_ID)?.remove();

    const id = getYoutubeId(window.location.href);
    if (!id) return;

    const container = document.createElement('div');
    container.id = SIDEBAR_ID;

    const parentNode = await waitForElm(
      '#secondary > #secondary-inner > #related'
    );
    parentNode?.prepend(container);
    createRoot(container).render(
      <React.StrictMode>
        <Sidebar id={id} />
      </React.StrictMode>
    );
  };

  window.addEventListener('load', () => {
    document.body.addEventListener('yt-navigate-start', updateSidebar);
    updateSidebar();
  });
})();
