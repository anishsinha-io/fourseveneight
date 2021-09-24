import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../app/api";

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
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (slug: string, { dispatch, rejectWithValue }) => {
    try {
    } catch (err) {}
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
      });
  },
});

export default commentSlice.reducer;
