import { NETA_PROJECT_ID } from "@entities/app";
import { GetStakeNetaTxDTO } from "@entities/ergo";
import axios from "axios";

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getStakeNetaTx = async (request: GetStakeNetaTxDTO) => {
  const res = await axios.post(
    `${process.env.ERGOPAD_API_URL}/staking/${NETA_PROJECT_ID}/stake/`,
    request,
    { ...defaultOptions }
  );
  const unsignedTx = res.data;
  return unsignedTx;
};

export const getStakingPortfolio = async (
  addresses: string[]
): Promise<number> => {
  const res = await axios.post(
    `${process.env.ERGOPAD_API_URL}/staking/${NETA_PROJECT_ID}/staked/`,
    { addresses },
    { ...defaultOptions }
  );
  return res.data.totalStaked;
};
