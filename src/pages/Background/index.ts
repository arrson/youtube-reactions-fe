import { youtubeParser } from '../../services/utils';

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!changeInfo.url) return;

  const id = youtubeParser(changeInfo.url);
  if (id) {
    chrome.tabs.sendMessage(tabId, {
      message: 'ytvideoid',
      id: id
    });
  }
});
