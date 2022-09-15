import Link from "next/link";

import NetaStakeBox from "./NetaStakeBox";

import { Blockchain, Currency } from "@entities/app";
import { INetaPortfolio, INetaStakeBox } from "@entities/ergo";
import { i18nNumber } from "@/utils";

interface Props {
  portfolio: INetaPortfolio;
}

export default ({ portfolio }: Props) => {
  return (
    <>
      <div className="w-full p-5 flex justify-center">
        <div className="max-w-lg w-full gap-4 flex flex-col items-center justify-center">
          <span className="w-fit text-3xl font-bold">Portfolio</span>

          <div className="w-full p-5 component rounded-2xl flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="w-fit text-xl font-bold">
                Total Staked Tokens
              </span>
              {portfolio ? (
                <div>
                  Staked {Currency.NETA}: {i18nNumber(portfolio.totalStaked, 6)}{" "}
                  {Currency.NETA}
                </div>
              ) : (
                <div>You don't have any staked {Currency.NETA}</div>
              )}
              <Link href={`/${Blockchain.ergo}`}>
                <button className="w-fit button clickable rounded-lg px-2.5 py-1">
                  Stake
                </button>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="w-fit text-xl font-bold">Stake Boxes</span>
              {Object.values(portfolio.addresses)
                .reduce((acc: INetaStakeBox[], val) => {
                  return acc.concat(val.stakeBoxes);
                }, [])
                .map((stakeBox) => (
                  <NetaStakeBox
                    key={stakeBox.boxId}
                    stakeBox={stakeBox}
                  ></NetaStakeBox>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
