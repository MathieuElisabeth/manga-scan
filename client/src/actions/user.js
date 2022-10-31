export const login = (username, email, accessToken, bookmarks) => {
  return {
      type: 'LOGIN',
      payload: {
          username,
          email,
          accessToken,
          bookmarks
      }
  }
}

export const logout = () => {
  return {
      type: 'LOGOUT'
  }
}

export const addBookmark = (manga) => {
  return {
      type: 'ADD_BOOKMARK',
      payload: manga
  }
}

export const removeBookmark = (manga) => {
  return {
      type: 'REMOVE_BOOKMARK',
      payload: manga
  }
}

export const updateUser = (manga) => {
  return {
      type: 'UPDATE_USER',
      payload: manga
  }
}

