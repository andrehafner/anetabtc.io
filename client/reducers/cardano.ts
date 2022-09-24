import { Cip30Wallet } from "@cardano-sdk/cip30";
import { LocalStorageKey } from "@entities/app";
import { CardanoWalletName, ICardanoState } from "@entities/cardano";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lucid, WalletApi } from "lucid-cardano";

const initialState: ICardanoState = {
  walletApi: null,
  lucidClient: null,
  wallet: null,
};

const name = "cardano";

const reducers = {
  setWallet: (
    state: any,
    action: PayloadAction<{
      walletName: CardanoWalletName | null;
      walletApi: WalletApi | null;
      wallet: Cip30Wallet | null;
      lucidClient: Lucid | null;
    }>
  ) => {
    const { walletApi, walletName, wallet, lucidClient } = action.payload;
    state.walletApi = walletApi;
    state.lucidClient = lucidClient;
    state.wallet = wallet;
    if (walletName) {
      localStorage.setItem(LocalStorageKey.walletNameCardano, walletName);
    } else {
      localStorage.removeItem(LocalStorageKey.walletNameCardano);
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
