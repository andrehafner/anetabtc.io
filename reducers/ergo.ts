import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";
import { LocalStorageKey, Theme } from "@entities/app";
import { CardanoWalletName, ICardanoState } from "@entities/cardano";
import { IErgoState } from "@entities/ergo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IErgoState = {
  walletApi: null,
};

const name = "ergo";

const reducers = {
  setWallet: (
    state: any,
    action: PayloadAction<{
      walletApi: any | null;
    }>
  ) => {
    const { walletApi } = action.payload;
    state.walletApi = walletApi;
    if (walletApi) {
      localStorage.setItem(LocalStorageKey.walletNameErgo, 'nautilus');
    } else {
      localStorage.removeItem(LocalStorageKey.walletNameErgo);
    }
  },
};

const ergoSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const { setWallet } = ergoSlice.actions;
export default ergoSlice.reducer;
