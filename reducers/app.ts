import { IAppState, LocalStorageKey, Theme } from "@entities/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAppState = {
  theme: Theme.dark,
};

const name = "app";

const reducers = {
  toggleTheme: (state: any) => {
    if (state.theme === Theme.dark) {
      state.theme = Theme.light;
      localStorage.setItem(LocalStorageKey.theme, Theme.light);
    } else {
      state.theme = Theme.dark;
      localStorage.setItem(LocalStorageKey.theme, Theme.dark);
    }
  },
  setTheme: (state: any, action: PayloadAction<Theme>) => {
    state.theme = action.payload;
    localStorage.setItem(LocalStorageKey.theme, action.payload);
  },
};

const app = createSlice({
  name,
  initialState,
  reducers,
});

export const { toggleTheme, setTheme } =
  app.actions;
export default app.reducer;
