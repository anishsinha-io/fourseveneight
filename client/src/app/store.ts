import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alert/alertSlice";
import postReducer from "../features/post/postSlice";
import commentReducer from "../features/comment/commentSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    post: postReducer,
    comment: commentReducer,
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
