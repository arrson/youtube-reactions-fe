const BASE_URL = 'https://youtube-reaction-server.herokuapp.com';

const makeRequest = async (method: string, url: string, data?: object) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : null,
  });

  const content = await response.json();
  return content;
};

export const getReactionVideos = (id: string) =>
  makeRequest('get', `/videos/${id}/videos`);

export const createReaction = (videoId: string, reactionId: string) =>
  makeRequest('post', `/reactions`, { videoId, reactionId });

export const reportReaction = (reactionId: string) =>
  makeRequest('post', `/reactions/${reactionId}/report`);