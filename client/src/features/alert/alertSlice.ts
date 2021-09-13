import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface IAlert {
  id: string;
  alertType: string;
  msg: string;
}

const initialState = [] as IAlert[];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: {
      reducer: (state, action: PayloadAction<IAlert>) => {
        state.push(action.payload);
      },
      prepare: (alertType: string, msg: string) => {
        const id = nanoid();
        return { payload: { id, alertType, msg } };
      },
    },
  },
  extraReducers: (builder) => {},
});

export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;
