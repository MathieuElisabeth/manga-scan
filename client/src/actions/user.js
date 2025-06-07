import axios from "axios"
import { api } from "../utils/api"

export const login = (username, email, bookmarks) => {
  return {
      type: 'LOGIN',
      payload: {
          username,
          email,
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

export const checkAuth = () => async (dispatch) => {
  try {
    const res = await api.get(`${import.meta.env.VITE_API_URL}/api/user/profile`);

    if (!res.ok) throw new Error('Session expired');

    const data = await res.json();

    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  } catch (err) {
    dispatch({ type: 'LOGOUT' });
  }
};


