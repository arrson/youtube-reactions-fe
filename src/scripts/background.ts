import { youtubeParser } from '../services/utils';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // if (!changeInfo.url) return;
  // const id = youtubeParser(changeInfo.url);
  // if (id) {
  //   chrome.tabs.sendMessage(tabId, {
  //     message: 'ytvideoid',
  //     id: id,
  //   });
  // }

  if (changeInfo.status === 'complete' && tab?.url?.includes('http')) {
    const id = youtubeParser(tab.url);
    if (id) {
      chrome.scripting.executeScript(
        { target: { tabId: tabId }, files: ['./injectScript.bundle.js'] }
        // () => {
        //   chrome.scripting.executeScript(
        //     { target: { tabId: tabId }, files: ['./sidebar.bundle.js'] },
        //     () => {}
        //   );
        // }
      );
    }
  }
});
