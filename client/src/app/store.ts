import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
import authReducer from "../components/auth/authSlice";
import postReducer from "../components/post/postSlice";
import commentReducer from "../components/comment/commentSlice";
import profileReducer from "../components/profile/profileSlice";
import questionReducer from "../components/question/questionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
    profile: profileReducer,
    question: questionReducer,
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
