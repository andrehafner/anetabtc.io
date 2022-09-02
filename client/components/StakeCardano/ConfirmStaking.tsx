import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { StakingState } from "@entities/app";
import { useContext } from "react";
import { CnetaStakingContext } from ".";
import { STAKING_INFO } from "@entities/cardano";

const ConfirmStaking = () => {
  const { stakingAmount, setStakingState, submitStake, stakingLength } =
    useContext(CnetaStakingContext);

  return (
    <div className="component p-5 w-full rounded-2xl mt-5 flex flex-col gap-4">
      <div className="border border-theme p-5 rounded-lg flex flex-col gap-4">
        <div className="flex flex-row items-center">
          Stake Amount
          <div className="ml-auto flex flex-row items-center gap-2">
            <img className="h-5" src="/logo.png"></img>
            {stakingAmount} cNETA
          </div>
        </div>
        <div className="flex flex-row items-center">
          <FontAwesomeIcon
            icon={faCoins}
            className="h-4 mr-2"
          ></FontAwesomeIcon>
          Staking Rewards
          <div className="ml-auto">
            {Math.floor(
              STAKING_INFO[stakingLength].calcRewards(Number(stakingAmount))
            ).toFixed(0)}{" "}
            cNETA
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => submitStake()}
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
