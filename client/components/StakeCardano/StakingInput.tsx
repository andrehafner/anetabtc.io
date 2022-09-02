import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import { CnetaStakingContext } from ".";
import useErrorHandler from "@hooks/useErrorHandler";
import { STAKING_INFO } from "@entities/cardano";

const StakingInput = React.forwardRef(({}, ref) => {
  const { stakingLength } = useContext(CnetaStakingContext);
  const { handleError } = useErrorHandler();
  const [amount, setAmount] = useState("");

  return (
    <div className="border border-theme p-5 rounded-lg flex flex-col gap-4">
      <div className="flex items-center">Stake Amount</div>
      <div className="flex flex-row items-center gap-2">
        <img src="/logo.png" className="h-8"></img>
        <input
          type={"number"}
          className="bg-transparent border border-theme rounded-lg p-1 w-full"
          min={0}
          ref={ref as any}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <button
          className="clickable button rounded-lg py-1 px-2.5"
          onClick={() => {}}
        >
          Max
        </button>
      </div>
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faCoins} className="h-4 mr-2"></FontAwesomeIcon>
        Staking Rewards
        <div className="ml-auto">
          {Math.floor(
            STAKING_INFO[stakingLength].calcRewards(Number(amount))
          ).toFixed(0)}{" "}
          cNETA
        </div>
      </div>
    </div>
  );
});

export default StakingInput;
