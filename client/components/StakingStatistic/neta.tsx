import { INetaStat } from "@entities/ergo";
import { i18nNumber } from "@/utils";

import StatBox from "./StatBox";

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
          <StatBox title="APR" value={`${stats.apr?.toFixed(2)}%`}></StatBox>
          <StatBox
            title="Number of Stakers"
            value={i18nNumber(stats.numberOfStakers ?? 0, 0)}
          ></StatBox>
          <StatBox
            title="Total NETA Staked"
            value={i18nNumber(stats.totalStaked ?? 0, 0)}
          ></StatBox>
        </div>
      </div>
    </div>
  );
};
