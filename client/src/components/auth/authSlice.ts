import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../app/api";
import setAuthToken from "../../app/setAuthToken";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  active: boolean;
  date: Date;
  deleted: boolean;
  role: string;
}

export interface IRegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IAuthState {
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  status: "idle" | "loading" | "failed";
}

export interface ILoginData {
  username: string;
  password: string;
}

const initialState: IAuthState = {
  token: localStorage.token,
  isAuthenticated: false,
  loading: true,
  user: undefined,
  status: "idle",
};

export const registerUserAndLoginWithToken = createAsyncThunk(
  "auth/register",
  async (args: IRegisterData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/users/register", args);
      const token = res.data.token || null;
      setAuthToken(token);
      const user = await dispatch(loadUserFromToken());
      return { token, user };
    } catch (err) {
      //dispatch alert
      return rejectWithValue("Error with registration.");
    }
  }
);

export const getTokenAndLogin = createAsyncThunk(
  "auth/login",
  async (args: ILoginData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/users/login", args);
      const token = res.data.token || null;
      setAuthToken(token);
      const user = await dispatch(loadUserFromToken());
      return { token, user };
    } catch (err: any) {
      //dispatch alert
      return rejectWithValue("Error with login");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.get("/users/logout");
      setAuthToken();
      //dispatch success alert
    } catch (err) {
      //dispatch failure alert
      return rejectWithValue("Error logging out!");
    }
  }
);

export const loadUserFromToken = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.token;
      setAuthToken(token);
      const res = await api.get("/users/auth"); //throws error if not authenticated
      const user = (res.data.user as IUser) || null;

      return { token, user };
    } catch (err: any) {
      return rejectWithValue("Unable to load user!");
    }
  }
);

export const onboardUser = createAsyncThunk(
  "auth/onboardUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/users/edit", { isOnboarded: true });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTokenAndLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTokenAndLogin.fulfilled, (state, _) => {
        state.status = "idle";
      })
      .addCase(getTokenAndLogin.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(loadUserFromToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.token = action.payload?.token;
        state.status = "idle";
        state.user = action?.payload?.user;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loadUserFromToken.rejected, (state) => {
        state.token = "";
        state.status = "idle";
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(registerUserAndLoginWithToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUserAndLoginWithToken.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.token = "";
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
