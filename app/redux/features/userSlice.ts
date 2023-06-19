import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: String;
};

const initialState = {
    name: "",
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setUserName: (state, action: PayloadAction<String>) => {
        state.name = action.payload;
        return state;
    },
  },
});

export const userActions = {...user.actions};
export default user.reducer;