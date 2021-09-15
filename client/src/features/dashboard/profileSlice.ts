import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IProfile {}

const initialState = {};

export const fetchProfileData = createAsyncThunk(
  "profile/data",
  async () => {}
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});

export default profileSlice.reducer;
