// Return video id or false
// export const youtubeParser = (url: string) => {
//   const regExp =
//     /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
//   const match = url.match(regExp);
//   return match && match[7].length == 11 ? match[7] : false;
// };

const regExp =
  /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/; // eslint-disable-line

export const getYoutubeId = (url: string) => {
  const match = url.match(regExp);
  return match?.length && match[1];
};
