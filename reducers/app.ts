import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";
import { LocalStorageKey, Theme } from "@entities/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IState } from "@entities/app";

const initialState: IState = {
  theme: Theme.dark,
  wallet: null,
  walletApi: null,
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
  setWallet: (
    state: any,
    action: PayloadAction<{ wallet: Cip30Wallet; walletApi: WalletApi }>
  ) => {
    state.wallet = action.payload.wallet;
    state.walletApi = action.payload.walletApi;
    // localStorage.setItem(LocalStorageKey.walletName)
  },
};

const appSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const { toggleTheme, setTheme, setWallet } = appSlice.actions;
export default appSlice.reducer;
