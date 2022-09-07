import {
  IUtilModalType,
  IAppState,
  LocalStorageKey,
  Theme,
  IUtilModalSetting,
} from "@entities/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAppState = {
  theme: Theme.dark,
  utilModalSetting: {
    type: IUtilModalType.info,
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
  setUtilModalSetting: (
    state: IAppState,
    action: PayloadAction<Partial<IUtilModalSetting>>
  ) => {
    state.utilModalSetting = {
      type: action.payload.type ?? IUtilModalType.info,
      text: action.payload.text ?? "",
      open: action.payload.open ?? true,
    };
  },
};

const app = createSlice({
  name,
  initialState,
  reducers,
});

export const { toggleTheme, setTheme, setUtilModalSetting } = app.actions;
export default app.reducer;
