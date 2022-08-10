import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    theme: "dark",
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = "light";
    },
  },
});

export const { toggleTheme } = appSlice.actions;
export default appSlice.reducer;
