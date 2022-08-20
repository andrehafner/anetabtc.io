import { IAppState, LocalStorageKey, Theme } from "@entities/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAppState = {
  theme: Theme.dark,
  errorModalSetting: {
    text: "",
    open: false,
  },
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
  setErrorModalSetting: (
    state: IAppState,
    action: PayloadAction<{ text?: string; open?: boolean }>
  ) => {
    state.errorModalSetting = {
      text: action.payload.text ?? "Something went wrong",
      open: action.payload.open ?? true,
    };
  },
};

const app = createSlice({
  name,
  initialState,
  reducers,
});

export const { toggleTheme, setTheme, setErrorModalSetting } = app.actions;
export default app.reducer;
