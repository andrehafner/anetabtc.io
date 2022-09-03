import { RootState } from "@services/store";
import { useSelector } from "react-redux";
import React, { useContext, useEffect, useState } from "react";
import { StakeContext } from ".";
import useErgoWallet from "@hooks/useErgoWallet";

const StakingInput = React.forwardRef(({}, ref) => {
  const { apr } = useContext(StakeContext);
  const { walletApi } = useSelector((state: RootState) => state.ergo);
  const { getNetaInWallet: getNetaInWalletAPI } = useErgoWallet();
  const [amount, setAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const getNetaInWallet = async () => {
    const maxNeta = await getNetaInWalletAPI();
    setMaxAmount(maxNeta > 0 ? String(maxNeta / Math.pow(10, 6)) : "");
  };

  useEffect(() => {
    getNetaInWallet();
  }, [walletApi]);

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
          onClick={() => setAmount(maxAmount)}
        >
          Max
        </button>
      </div>
    </div>
  );
});

export default StakingInput;
