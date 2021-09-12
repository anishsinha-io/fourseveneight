import { createSlice } from "@reduxjs/toolkit";

export interface IAlert {
  alertType: string;
  msg: string;
}

const initialState = [] as IAlert[];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default alertSlice.reducer;
