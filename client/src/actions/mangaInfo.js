export const mangaInfo = (info) => {
  return {
      type: 'GET_MANGA_INFO',
      payload: {
          ...info
      }
  }
}