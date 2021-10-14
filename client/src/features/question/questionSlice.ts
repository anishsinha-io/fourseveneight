import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../app/api";

export interface INewQuestion {
  title: string;
  content: string;
  category: string;
  tags: string[];
  embeddedMediaFiles: string[];
}

export interface IQuestion extends INewQuestion {
  _id: string;
  author: string;
  date: Date;
  user: string;
}

export interface IQuestionState {
  question: IQuestion;
  questions: IQuestion[];
  userQuestions: IQuestion[];
  status: "idle" | "loading" | "failed";
}

const initialState: IQuestionState = {
  question: {} as IQuestion,
  questions: [],
  userQuestions: [],
  status: "idle",
};

export const loadQuestions = createAsyncThunk(
  "question/loadQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/questions");
      const questions = res.data;
      return questions;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loadUserQuestions = createAsyncThunk(
  "question/loadUserQuestions",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/questions/${userId}`);
      const userQuestions = res.data;
      return userQuestions;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createQuestion = createAsyncThunk(
  "question/createQuestion",
  async (args: INewQuestion, { dispatch, rejectWithValue }) => {
    try {
      await api.post("/questions/create", args);
      console.log("here");
      dispatch(loadQuestions);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editQuestion = createAsyncThunk(
  "question/editQuestion",
  async (args: IQuestion, { dispatch, rejectWithValue }) => {
    try {
      const { content, category, tags, embeddedMediaFiles, title } = args;
      await api.patch(`/questions/edit/${args._id}`, {
        content,
        category,
        tags,
        embeddedMediaFiles,
        title,
      });
      dispatch(loadQuestions);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const removeQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (questionId: string, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(questionId);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loadQuestion = createAsyncThunk(
  "question/loadQuestion",
  async (questionId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/questions/${questionId}`);
      return res.data.question;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadQuestions.fulfilled, (state, action) => {
        state.status = "idle";
        state.questions = action.payload;
      })
      .addCase(loadQuestions.rejected, (state) => {
        state.status = "failed";
        state.questions = [];
      })
      .addCase(loadUserQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUserQuestions.fulfilled, (state, action) => {
        state.status = "idle";
        state.userQuestions = action.payload;
      })
      .addCase(loadUserQuestions.rejected, (state) => {
        state.status = "failed";
        state.userQuestions = [];
      })
      .addCase(createQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createQuestion.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(createQuestion.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(editQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editQuestion.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(editQuestion.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(removeQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeQuestion.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(removeQuestion.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(loadQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadQuestion.fulfilled, (state, action) => {
        state.status = "idle";
        state.question = action.payload;
      })
      .addCase(loadQuestion.rejected, (state) => {
        state.status = "failed";
        state.question = {} as IQuestion;
      });
  },
});

export default questionSlice.reducer;
