/*
 * Note:
 * No longer using the load in iframe approach, since we want
 * the videos to flow with the page content
 */

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'ytvideoid') {
//     // loadReactions(request.id);
//     // showMenu();
//   }
// });

// const ELEMENT_ID = 'youtubeReactionVideos';
// const showMenu = () => {
//   if (document.getElementById(ELEMENT_ID) !== null) {
//     return;
//   }

//   var iframe = document.createElement('iframe');
//   iframe.id = ELEMENT_ID;
//   // Must be declared at web_accessible_resources in manifest.json
//   iframe.src = chrome.runtime.getURL('sidebar.html');
//   iframe.style.cssText = 'width:100%;height:300px;';

//   // load in youtube sidebar
//   const parentNode = document.querySelector(
//     '#secondary > #secondary-inner > #related'
//   );
//   parentNode?.prepend(iframe);
// };
