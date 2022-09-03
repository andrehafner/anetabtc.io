import Link from "next/link";
import { Blockchain, Currency } from "@entities/app";
import Spinner from "@components/Spinner";
import { INetaPortfolio } from "@entities/ergo";

interface Props {
  portfolio: INetaPortfolio;
}

export default ({ portfolio }: Props) => {
  return (
    <div className="w-full p-5 flex justify-center">
      <div className="max-w-lg w-full gap-4 flex flex-col items-center justify-center">
        <span className="w-fit text-3xl font-bold">Portfolio</span>
        <div className="w-full p-5 component rounded-2xl flex flex-col items-center gap-2">
          {portfolio ? (
            <div>
              Staked {Currency.NETA}: {portfolio.totalStaked} {Currency.NETA}
            </div>
          ) : (
            <div>You don't have any staked {Currency.NETA}</div>
          )}
          <Link href={`/${Blockchain.ergo}`}>
            <button className="button clickable rounded-lg px-2.5 py-1">
              Stake
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
