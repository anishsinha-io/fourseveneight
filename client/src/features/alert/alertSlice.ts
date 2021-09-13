import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";

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
    removeAlert: (state) => {
      state.pop();
    },
  },
  extraReducers: (builder) => {},
});

export const { setAlert, removeAlert } = alertSlice.actions;

export const removeAlertAsync = () => (dispatch: any) => {
  setTimeout(() => {
    dispatch(removeAlert());
  }, 5000);
};

export default alertSlice.reducer;
