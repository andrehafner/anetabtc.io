import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";
import { Theme } from "@entities/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReducersName } from "@entities/app";
import { IState } from "@entities/app";

const initialState: IState = {
  theme: Theme.dark,
  wallet: null,
  walletApi: null,
};

const name = "app";

const reducers = {
  [ReducersName.toggleTheme]: (state: any) => {
    if (state.theme === Theme.dark) {
      state.theme = Theme.light;
    } else {
      state.theme = Theme.dark;
    }
  },
  [ReducersName.setWallet]: (
    state: any,
    action: PayloadAction<{ wallet: Cip30Wallet; walletApi: WalletApi }>
  ) => {
    state.wallet = action.payload.wallet;
    state.walletApi = action.payload.walletApi;
  },
};

const appSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const { toggleTheme } = appSlice.actions;
export default appSlice.reducer;
