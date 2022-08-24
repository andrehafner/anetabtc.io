export const NETA_POLICY_ID =
  "a1f2d3519d5737ec4faf18ee38de856c418420b0f31871489f50ac5518297400";
export const ERGO_TX_FORMAT = "eip-12";
/**
 * temporary project ID because NETA is not in ergopad yet
 */
export const NETA_PROJECT_ID = "paideia";

export interface IErgoState {
  walletApi: NautilusErgoApi | null;
}

export interface IAssetInUTXO {
  tokenId: string;
  amount: string;
}

export interface IErgoUTXO {
  boxId: string;
  transactionId: string;
  index: 2;
  ergoTree: string;
  creationHeight: number;
  value: string;
  assets: IAssetInUTXO[];
  confirmed: boolean;
}

export enum ErgoWalletName {
  nautilus = "nautilus",
}

export interface NautilusErgoApi {
  auth: Function;
  constructor: Function;
  get_balance: Function;
  get_change_address: Function;
  get_unused_addresses: Function;
  get_used_addresses: Function;
  get_utxos: Function;
  sign_data: Function;
  sign_tx: Function;
  sign_tx_input: Function;
  submit_tx: Function;
}

export interface GetStakeNetaTxDTO {
  amount: number;
  wallet: string;
  utxos: string[];
  txFormat: string;
  addresses: string[];
}
