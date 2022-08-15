import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import React, { Ref, useContext, useState } from "react";
import { StakeContext } from ".";

const StakingInput = React.forwardRef(({}, ref) => {
  const { calcRewards } = useContext(StakeContext);
  const [amount, setAmount] = useState("");

  return (
    <div className="border border-theme p-5 rounded-lg flex flex-col gap-4">
      Stake Amount
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
        <button className="clickable button rounded-lg py-1 px-2.5">MAX</button>
      </div>
      <div className="flex flex-row items-center gap-2">
        <FontAwesomeIcon className="h-4" icon={faCoins}></FontAwesomeIcon>
        Staking Rewards
        <div className="ml-auto">
          {isNaN(Number(amount)) ? 0 : calcRewards(Number(amount))} cNETA
        </div>
      </div>
    </div>
  );
});

export default StakingInput;
