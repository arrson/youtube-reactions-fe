import { youtubeParser, getReactions } from '../../services/utils';

const loadReactions = async (id: string) => {
  const reactions = await getReactions(id);
  console.log('RENDER Reactions for: ', id, reactions);
}

// // Direct Links
// const id = youtubeParser(document.URL);
// if (id) {
//   loadReactions(id);
// }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'ytvideoid') {
    loadReactions(request.id);
  }
});
