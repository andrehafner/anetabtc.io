import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import React, { Ref } from "react";

interface Props {
  apr: number;
}

const StakingInput = React.forwardRef(({ apr }: Props, ref) => {
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
        ></input>
        <div>MAX</div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <FontAwesomeIcon className="h-4" icon={faCoins}></FontAwesomeIcon>
        Staking Rewards
        <div className="ml-auto">23 cNETA</div>
      </div>
    </div>
  );
});

export default StakingInput;
