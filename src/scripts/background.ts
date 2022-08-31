import { getYoutubeId } from '../services/utils';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab?.url?.includes('http')) {
    const id = getYoutubeId(tab.url);
    if (id) {
      chrome.tabs.sendMessage(tabId, { message: 'ytvideoid', id: id });
    }
  }
});
