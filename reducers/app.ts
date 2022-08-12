import { Cip30Wallet, WalletApi, WalletName } from "@cardano-sdk/cip30";
import { LocalStorageKey, Theme } from "@entities/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IState } from "@entities/app";

const initialState: IState = {
  theme: Theme.dark,
  wallet: null,
  walletApi: null,
  modalChild: null,
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
    action: PayloadAction<{
      walletName: WalletName;
      wallet: Cip30Wallet;
      walletApi: WalletApi;
    }>
  ) => {
    const { wallet, walletApi, walletName } = action.payload;
    state.wallet = wallet;
    state.walletApi = walletApi;
    localStorage.setItem(LocalStorageKey.walletName, walletName);
  },
  setModalChild: (state: any,
    action: PayloadAction<JSX.Element>) => {
      state.modalChild = action.payload
  }
};

const appSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const { toggleTheme, setTheme, setWallet, setModalChild } = appSlice.actions;
export default appSlice.reducer;
