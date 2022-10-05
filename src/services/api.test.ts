import { getApi, Channel } from './api';

const fetchMock = (global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve('result'),
  })
) as jest.Mock);

describe('Api utility test', () => {
  afterEach(async () => {
    fetchMock.mockClear();
  });
  describe('getReactionVideos', () => {
    it('should call route without channelId param', async () => {
      const api = getApi();
      const id = 'test-id';
      api.getReactionVideos(id);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringMatching('^((?!channelId).)*$'),
        expect.any(Object)
      );
    });

    it('should call route with channelId param', async () => {
      const api = getApi();
      const id = 'test-id';
      const channels: Channel[] = [
        {
          id: 'id1',
          name: 'name1',
          img: 'img1',
        },
      ];
      api.getReactionVideos(id, channels);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('id1'),
        expect.any(Object)
      );
    });
  });
});
