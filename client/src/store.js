import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
// import { AnyAction } from 'redux';

// return async(dispatch: Dispatch<AnyAction>, getState: () => State)

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
})

export const useAppDispatch = () => useDispatch() // Export a hook that can be reused to resolve types

export default store;