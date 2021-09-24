import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../app/api";
import axios from "axios";

export interface INewPost {
  slug?: string;
  title: string;
  image: any;
  imageAlt: string;
  summary: string;
  content: string;
}

export interface IComment {
  user: string;
  post?: string;
  comment?: IComment;
  content: string;
  date: Date;
  directChildComments: IComment[];
}

export interface IPost {
  title: string;
  user: string;
  summary: string;
  content: string;
  image?: string;
  imageAlt: string;
  author: string;
  likes: number;
  comments: string[];
  date: Date;
  slug: string;
  deleted: boolean;
  _id: string;
}

export interface IPostState {
  status: "idle" | "loading" | "failed";
  post: IPost;
  posts: IPost[];
}

const initialState = {
  status: "idle",
  post: {} as IPost,
  posts: [] as IPost[],
};

export const getAndLoadPosts = createAsyncThunk(
  "post/loadAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/posts");
      return res.data;
    } catch (err) {
      return rejectWithValue("Error loading posts!");
    }
  }
);

export const loadPost = createAsyncThunk(
  "/post/loadPost",
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/posts/${slug}`);
      if (!res.data.post) {
      }
      return res.data.post;
    } catch (err) {
      return rejectWithValue("Error loading post!");
    }
  }
);

//todo refactor -> the following functions are basically the same
export const createPost = createAsyncThunk(
  "post/createPost",
  async (args: INewPost, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      const { title, image, imageAlt, summary, content } = args;
      formData.append("image", image);
      formData.append("title", title);
      formData.append("imageAlt", imageAlt);
      formData.append("summary", summary);
      formData.append("content", content);

      const apiInstance = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const token = localStorage.token;
      if (token) apiInstance.defaults.headers.common["Authorization"] = token;
      await apiInstance.post("/posts", formData);
      dispatch(getAndLoadPosts());
    } catch (err) {
      return rejectWithValue("Error creating post!");
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (args: INewPost, { dispatch, rejectWithValue }) => {
    try {
      const { title, image, imageAlt, summary, content, slug } = args;
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("imageAlt", imageAlt);
      formData.append("summary", summary);
      formData.append("content", content);

      const apiInstance = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const token = localStorage.token;
      if (token) apiInstance.defaults.headers.common["Authorization"] = token;
      await apiInstance.patch(`/posts/update/${slug}`, formData);
      dispatch(getAndLoadPosts);
    } catch (err) {
      rejectWithValue("Error updating post");
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (slug: string, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/posts/delete/${slug}`);
      dispatch(getAndLoadPosts());
    } catch (err) {
      return rejectWithValue("Error deleting post");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAndLoadPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAndLoadPosts.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action?.payload.posts;
      })
      .addCase(getAndLoadPosts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(loadPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.post = action.payload;
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.status = "failed";
        state.post = {} as IPost;
      });
  },
});

export default postSlice.reducer;
