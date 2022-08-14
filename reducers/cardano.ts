import { Cip30Wallet, WalletApi } from "@cardano-sdk/cip30";
import { LocalStorageKey, Theme } from "@entities/app";
import { CardanoWalletName, ICardanoState } from "@entities/cardano";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICardanoState = {
  wallet: null,
  walletApi: null,
};

const name = "cardano";

const reducers = {
  setWallet: (
    state: any,
    action: PayloadAction<{
      walletName: CardanoWalletName | null;
      wallet: Cip30Wallet | null;
      walletApi: WalletApi | null;
    }>
  ) => {
    const { wallet, walletApi, walletName } = action.payload;
    state.wallet = wallet;
    state.walletApi = walletApi;
    if (walletName) {
      localStorage.setItem(LocalStorageKey.walletName, walletName);
    } else {
      localStorage.removeItem(LocalStorageKey.walletName);
    }
  },
};

const cardanoSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const { setWallet } = cardanoSlice.actions;
export default cardanoSlice.reducer;
