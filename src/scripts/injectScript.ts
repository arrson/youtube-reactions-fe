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

(() => {
  // this id corresponds with id in Sidebar/index.tsx
  const SIDEBAR_ID = 'sidebar-extention-container';

  const loadSidebar = async () => {
    if (document.getElementById(SIDEBAR_ID) !== null) {
      // send a custom event to the react componet to update
      const message = {};
      const event = new CustomEvent('YT_VIDEO_ID', { detail: message });
      window.dispatchEvent(event);
      return;
    }

    const container = document.createElement('div');
    container.id = SIDEBAR_ID;

    const reactJS_script = document.createElement('script');
    reactJS_script.src = chrome.runtime.getURL('sidebar.bundle.js');
    container.appendChild(reactJS_script);

    const parentNode = await waitForElm(
      '#secondary > #secondary-inner > #related'
    );

    parentNode?.prepend(container);
  };

  if (window.YT_SIDEBAR_LOADED !== window.location.href) {
    loadSidebar();
    window.YT_SIDEBAR_LOADED = window.location.href;
  }
})();
