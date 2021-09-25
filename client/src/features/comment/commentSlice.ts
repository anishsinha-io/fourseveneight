import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../app/api";

export interface INewComment {
  slug: string;
  content: string;
}

export interface INewChildComment {
  _id: string;
  content: string;
}

export interface IComment {
  _id: string;
  user: string;
  post?: string;
  comment?: string;
  content: string;
  directChildComments?: IComment[];
  date: string;
  author: string;
}

export interface ICommentState {
  status: "idle" | "loading" | "failed";
  comments: IComment[];
  comment: IComment;
  replyingToComment: boolean;
}

const initialState = {
  status: "idle",
  comments: [] as IComment[],
  comment: {} as IComment,
  replyingToComment: false,
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
  "comment/createRootComment",
  async (args: INewComment, { dispatch, rejectWithValue }) => {
    try {
      const { slug, content } = args;
      await api.post(`/comments/${slug}`, { content });
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const createChildComment = createAsyncThunk(
  "comment/createChildComment",
  async (args: INewChildComment, { rejectWithValue }) => {
    try {
      const { _id, content } = args;
      console.log(args);
      await api.post(`/comments/child/${_id}`, { content });
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComment: {
      //todo change PayloadAction<any> to PayloadAction<T> where T is defined
      reducer: (state, action: any) => {
        state.comment = action.payload.comment;
      },
      prepare: (comment: IComment) => {
        return { payload: { comment } };
      },
    },
    toggleReplyingToComment(state) {
      state.replyingToComment = !state.replyingToComment;
    },
  },
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

export const { setComment, toggleReplyingToComment } = commentSlice.actions;

export default commentSlice.reducer;
