import { useEffect, useState } from "react";

import { i18nNumber } from "@/utils";
import Header from "@components/Header";
import StatBox from "@components/StakingStatistic/StatBox";
import useErrorHandler from "@hooks/useErrorHandler";
import { getStakedNetaStats } from "@services/ergo";
import { INetaStat } from "@entities/ergo";
import Loading from "@components/Loading";

export default function Dashboard() {
  const { handleError } = useErrorHandler();

  const [loading, setLoading] = useState(true);
  const [netaStats, setNetaStats] = useState<INetaStat>({
    totalStaked: 0,
    numberOfStakers: 0,
    cycleStart: 0,
    apr: 0,
  });

  const init = async () => {
    try {
      const [netaStatsRes] = await Promise.all([getStakedNetaStats()]);
      setNetaStats(netaStatsRes);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <Loading></Loading>
  ) : (
    <>
      <Header></Header>
      <div className="w-full p-5 flex flex-col justify-center">
        <div className="w-full p-5 flex justify-center">
          <div className="w-full gap-4 flex flex-col items-center justify-center">
            <span className="w-fit text-center text-3xl font-bold">
              NETA Staking Statistics
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <StatBox
                title="APR"
                value={`${netaStats.apr?.toFixed(2)}%`}
              ></StatBox>
              <StatBox
                title="Number of Stakers"
                value={i18nNumber(netaStats.numberOfStakers ?? 0, 0)}
              ></StatBox>
              <StatBox
                title="Total NETA Staked"
                value={i18nNumber(netaStats.totalStaked ?? 0, 0)}
              ></StatBox>
            </div>
          </div>
        </div>
        <div className="w-full p-5 flex justify-center">
          <div className="w-full gap-4 flex flex-col items-center justify-center">
            <span className="w-fit text-center text-3xl font-bold">
              cNETA Staking Statistics
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <StatBox
                title="APR"
                value={`${netaStats.apr?.toFixed(2)}%`}
              ></StatBox>
              <StatBox
                title="Number of Stakers"
                value={i18nNumber(netaStats.numberOfStakers ?? 0, 0)}
              ></StatBox>
              <StatBox
                title="Total NETA Staked"
                value={i18nNumber(netaStats.totalStaked ?? 0, 0)}
              ></StatBox>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
