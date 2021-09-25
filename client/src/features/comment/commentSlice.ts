import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../app/api";

export interface INewComment {
  slug: string;
  content: string;
}

export interface IComment {
  user: string;
  post?: string;
  comment?: string;
  content: string;
  date: string;
}

export interface ICommentState {
  status: "idle" | "loading" | "failed";
  comments: IComment[];
}

const initialState = {
  status: "idle",
  comments: [] as IComment[],
};

export const getRootComments = createAsyncThunk(
  "comment/rootComments",
  async (slug: string, { dispatch, rejectWithValue }) => {
    try {
      const comments = await api.get("/comments");
      console.log(comments);
      return comments;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getChildComments = createAsyncThunk(
  "comment/childComments",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
    } catch (err) {}
  }
);

export const createRootComment = createAsyncThunk(
  "comment/createComment",
  async (args: INewComment, { dispatch, rejectWithValue }) => {
    try {
      const { slug, content } = args;
      console.log(args);
      await api.post(`/comments/${slug}`, { content });
      dispatch(getRootComments(slug));
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRootComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRootComments.fulfilled, (state, action) => {})
      .addCase(getRootComments.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(createRootComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRootComment.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(createRootComment.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default commentSlice.reducer;
