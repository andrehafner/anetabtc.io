type ErgoAddress = string;
type ErgoStakeBoxID = string;

export interface IUnstakeNeta {
  address: ErgoAddress;
  addresses: ErgoAddress[];
  amount: number;
  stakeBox: ErgoStakeBoxID;
  txFormat: string;
  utxos: string[];
}
