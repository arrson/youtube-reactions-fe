// events from react components and the content script (in the same window)
export const EVENTS = {
  ytvideoId: 'ytvideoId', // new video id

  showLogin: 'showLogin',
  showCreate: 'showCreate',
  hidePanel: 'hidePanel',

  userUpdated: 'userUpdated',
  reactionCreated: 'userUpdated',
};

export const subscribe = (eventName, listener) => {
  window.addEventListener(eventName, listener);
};

export const unsubscribe = (eventName, listener) => {
  window.removeEventListener(eventName, listener);
};

export const publish = (eventName, data = {}) => {
  const event = new CustomEvent(eventName, { detail: data });
  window.dispatchEvent(event);
};
