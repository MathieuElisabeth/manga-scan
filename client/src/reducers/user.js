const initialState = {
    isLogged: false,
    username: '',
    email: '',
    bookmarks: [],
  }
  
  const userReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
      case 'LOGIN':
        return {
          ...state,
          isLogged: true,
          username: payload.username,
          email: payload.email,
          bookmarks: payload.bookmarks || [],
        }
  
      case 'LOGOUT':
        return {
          isLogged: false,
          username: '',
          email: '',
          bookmarks: [],
        }
  
      case 'ADD_BOOKMARK': {
        const updated = [...state.bookmarks, payload]
        return {
          ...state,
          bookmarks: updated,
        }
      }
  
      case 'REMOVE_BOOKMARK': {
        const updated = state.bookmarks.filter((id) => id !== payload)
        return {
          ...state,
          bookmarks: updated,
        }
      }
  
      case 'UPDATE_USER':
        return {
          ...state,
          ...payload,
        }
  
      default:
        return state
    }
  }
  
  export default userReducer