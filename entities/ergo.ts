export interface IErgoState {
  walletApi: NautilusErgoApi | null;
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

export interface StakeNetaDTO {
  amount: number;
  wallet: string;
  utxos: string[];
  txFormat: string;
  addresses: string[];
}
