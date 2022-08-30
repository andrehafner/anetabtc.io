import { StakingLength, StakingState } from "@entities/app";
import { useContext } from "react";
import { StakeContext } from ".";

const ConfirmStaking = () => {
  const {
    stakingAmount,
    text,
    calcRewards,
    setStakingState,
    submitStake,
    currency,
    apr,
  } = useContext(StakeContext);
  return (
    <div className="component p-5 w-full rounded-2xl mt-5 flex flex-col gap-4">
      <div className="border border-theme p-5 rounded-lg flex flex-col gap-4">
        <div className="flex flex-row items-center">
          Stake Amount
          <div className="ml-auto flex flex-row items-center gap-2">
            <img className="h-5" src="/logo.png"></img>
            {stakingAmount} {currency}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={submitStake}
          className="button clickable w-full rounded-lg py-1 px-2.5"
        >
          Confirm Stake
        </button>
        <button
          onClick={() => setStakingState(StakingState.init)}
          className="button-danger clickable w-full rounded-lg py-1 px-2.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmStaking;
