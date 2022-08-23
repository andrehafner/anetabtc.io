import { NETA_PROJECT_ID } from "@entities/app";
import { StakeNetaDTO } from "@entities/ergo";
import axios from "axios";

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const stakeNeta = async (request: StakeNetaDTO) => {
  const res = await axios.post(
    `${process.env.ERGOPAD_API_URL}/staking/${NETA_PROJECT_ID}/stake/`,
    request,
    { ...defaultOptions }
  );
  const unsignedTx = res.data;
  const signedTx = await ergo.sign_tx(unsignedTx); // eslint-disable-line
  await ergo.submit_tx(signedTx); // eslint-disable-line
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
