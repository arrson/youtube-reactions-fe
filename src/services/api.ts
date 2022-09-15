const BASE_URL = process.env.API_URL || 'https://yt-reactions-server.fly.dev';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  channelId: string;
  updatedAt: string;
  createdAt: string;
}

export interface VideoReactions {
  reactions: Video[];
  reactionTo: Video[];
  otherReactions: Video[];
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

type ResponseStatus = 'success' | 'error';
interface BaseSuccess {
  state: 'success';
  status: number;
}

interface Error {
  state: 'error';
  status: number;
  data: { message: string; statusCode: number };
}

interface GetReactionVideos extends BaseSuccess {
  data: VideoReactions;
}
interface GetVideos extends BaseSuccess {
  data: Video[];
}
interface GetUserProfile extends BaseSuccess {
  data: User;
}

export const getBaseUrl = () => BASE_URL;

export const getApi = (token?: string) => {
  const makeRequest = async (
    method: string,
    url: string,
    data?: object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<{ state: ResponseStatus; data: any; status: number }> => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Accept', 'application/json');
    requestHeaders.set('Content-Type', 'application/json');

    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${BASE_URL}${url}`, {
      method: method,
      headers: requestHeaders,
      body: data ? JSON.stringify(data) : null,
    });

    const content = await response.json();

    const state =
      response.status < 200 || response.status > 300 ? 'error' : 'success';

    return { state, data: content, status: response.status };
  };

  return {
    getReactionVideos: (id: string): Promise<GetReactionVideos | Error> =>
      makeRequest('get', `/videos/${id}/videos`),
    getVideosInfo: (id: string): Promise<GetVideos | Error> =>
      makeRequest('get', `/videos?id=${id}`),
    createReaction: (videoId: string, reactionId: string) =>
      makeRequest('post', `/reactions`, { videoId, reactionId }),
    reportReaction: (reactionId: string) =>
      makeRequest('post', `/reactions/${reactionId}/report`),
    getUserProfile: (): Promise<GetUserProfile | Error> =>
      makeRequest('get', `/users/profile`),
  };
};
