import { GetStakeNetaTxDTO, INetaPortfolio, INetaStat } from "@entities/ergo";
import axios from "axios";
import { IUnstakeNeta } from "./ergo.dto";

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getStakeNetaTx = async (request: GetStakeNetaTxDTO) => {
  const res = await axios.post(
    `${process.env.ERGOPAD_API_URL}/staking/${process.env.NETA_PROJECT_ID}/stake/`,
    request,
    { ...defaultOptions }
  );
  const unsignedTx = res.data;
  return unsignedTx;
};

export const getStakingPortfolio = async (
  addresses: string[]
): Promise<INetaPortfolio> => {
  const res = await axios.post(
    `${process.env.ERGOPAD_API_URL}/staking/${process.env.NETA_PROJECT_ID}/staked/`,
    { addresses },
    { ...defaultOptions }
  );
  return res.data;
};

export const getStakedNetaStats = async (): Promise<INetaStat> => {
  const { data } = await axios.get(
    `${process.env.ERGOPAD_API_URL}/staking/${process.env.NETA_PROJECT_ID}/status/`
  );
  const stats: INetaStat = {
    cycleStart: data["Cycle start"] ?? 0,
    apr: data["APY"] ?? 0,
    numberOfStakers: data["Staking boxes"] ?? 0,
    totalStaked: data["Total amount staked"] ?? 0,
  };
  return stats;
};

export const unstakeNeta = async (body: IUnstakeNeta) => {
  const res = await axios.post(
    `${process.env.ERGOPAD_API_URL}/staking/${process.env.NETA_PROJECT_ID}/unstake/`,
    body,
    defaultOptions
  );
  return res.data;
};
