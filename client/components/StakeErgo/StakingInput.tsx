import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import React, { Ref, useContext, useEffect, useState } from "react";
import { StakeContext } from ".";
import useErgoWallet from "@hooks/useErgoWallet";
import { Currency } from "@entities/app";
import useErrorHandler from "@hooks/useErrorHandler";

const StakingInput = React.forwardRef(({}, ref) => {
  const { calcRewards, currency, apr } = useContext(StakeContext);
  const { maxNeta } = useErgoWallet();
  const { handleError } = useErrorHandler();
  const [amount, setAmount] = useState("");

  const handleMaxAmount = async () => {
    const maxNetaTrueAmount = maxNeta / Math.pow(10, 6);
    setAmount(String(maxNetaTrueAmount));
  };

  useEffect(() => {});

  return (
    <div className="border border-theme p-5 rounded-lg flex flex-col gap-4">
      <div className="flex items-center">
        Stake Amount
        <div className="text-agreen ml-auto">APR {apr}%</div>
      </div>
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
          onClick={handleMaxAmount}
        >
          Max
        </button>
      </div>
    </div>
  );
});

export default StakingInput;
