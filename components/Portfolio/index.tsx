import useWallet from "@hooks/useErgoWallet";
import { getStakingPortfolio } from "@services/ergo";
import { RootState } from "@services/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Currency } from "@entities/app";
import Spinner from "@components/Spinner";

interface Props {
  currency: Currency;
  parentPath: string;
  portfolio: number;
  loading: boolean;
}

export default ({ currency, parentPath, portfolio, loading }: Props) => {
  return (
    <div className="w-full p-5 flex justify-center">
      <div className="max-w-lg w-full gap-4 flex flex-col items-center justify-center">
        <span className="w-fit text-3xl font-bold">Portfolio</span>
        <div className="w-full p-5 component rounded-2xl flex flex-col items-center gap-2">
          {loading ? (
            <div className="flex items-center justify-center w-full gap-2">
              Loading portfolio<Spinner className="h-4"></Spinner>
            </div>
          ) : portfolio ? (
            <div>
              Staked {currency}: {portfolio} {currency}
            </div>
          ) : (
            <div>You don't have any staked {currency}</div>
          )}
          <Link href={parentPath ?? "/"}>
            <button className="button clickable rounded-lg px-2.5 py-1">
              Stake
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
