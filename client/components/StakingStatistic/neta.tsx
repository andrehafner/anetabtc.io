import Link from "next/link";
import { Currency } from "@entities/app";
import Spinner from "@components/Spinner";
import { INetaStat } from "@entities/ergo";
import { i18nNumber } from "@/utils";

interface Props {
  stats: Partial<INetaStat>;
}

export default ({ stats }: Props) => {
  return (
    <div className="w-full p-5 flex justify-center">
      <div className="w-full gap-4 flex flex-col items-center justify-center">
        <span className="w-fit text-center text-3xl font-bold">
          NETA Staking Statistics
        </span>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <div className="flex flex-col items-center p-5 component rounded-2xl gap-2 justify-center text-xl w-full sm:w-56">
            <div className="font-bold">APR</div>
            <div>{stats.apr?.toFixed(2)}%</div>
          </div>
          <div className="flex flex-col items-center p-5 component rounded-2xl gap-2 justify-center text-xl w-full sm:w-56">
            <div className="font-bold">Number of Stakers</div>
            <div>{i18nNumber(stats.numberOfStakers ?? 0, 0)}</div>
          </div>
          <div className="flex flex-col items-center p-5 component rounded-2xl gap-2 justify-center text-xl w-full sm:w-56">
            <div className="font-bold">Total NETA Staked</div>
            <div>{i18nNumber(stats.totalStaked ?? 0, 0)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
