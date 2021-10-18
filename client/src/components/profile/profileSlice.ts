import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../app/api";

export interface IExperience {
  title?: string;
  company?: string;
  location?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  description?: string;
  slug?: string;
}
export interface IEducation {
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  description?: string;
  slug?: string;
}
export interface ISocial {
  youtube?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
}

export interface IProfile {
  user: any;
  username: string;
  backgroundPhoto?: string;
  currentJobTitle?: string;
  photo?: string;
  company?: string;
  website?: string;
  location?: string;
  status?: string;
  skills?: string[];
  bio?: string;
  githubUsername?: string;
  experience?: IExperience[];
  education?: IEducation[];
  social?: ISocial;
  date?: Date;
  spaces?: string[];
}

export interface IProfileState {
  profile: IProfile;
  status: "idle" | "loading" | "failed";
}

const initialState: IProfileState = {
  profile: {} as IProfile,
  status: "idle",
};

export const fetchUserProfile = createAsyncThunk(
  "profile/data",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.get("/profiles");
      return res.data.profile;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const fetchProfileFromQuery = createAsyncThunk(
  "profile/queryData",
  async (username: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/profiles/${username}`);
      console.log(res.data.profile);
      return res.data.profile;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const createEmptyProfile = createAsyncThunk(
  "profile/createEmpty",
  async (profileObject: IProfile, { rejectWithValue }) => {
    try {
      await api.post("/profiles", profileObject);
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (profileObject: any, { rejectWithValue }) => {
    try {
      await api.post("/profiles", profileObject);
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (_, { dispatch, rejectWithValue }) => {
    try {
    } catch (err) {}
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileFromQuery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfileFromQuery.fulfilled, (state, action) => {
        state.status = "idle";
        state.profile = action.payload;
      })
      .addCase(fetchProfileFromQuery.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default profileSlice.reducer;
