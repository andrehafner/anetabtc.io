import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import InitErgo from "@layouts/InitErgo";
import Header from "@components/Header";
import Portfolio from "@components/Portfolio/neta";
import { RootState } from "@services/store";
import useWallet from "@hooks/useErgoWallet";
import { getStakedNetaStats, getStakingPortfolio } from "@services/ergo";
import StakingStatistic from "@components/StakingStatistic/neta";
import useErrorHandler from "@hooks/useErrorHandler";
import { INetaPortfolio, INetaStat } from "@entities/ergo";
import Loading from "@components/Loading";

export default () => {
  const { walletApi } = useSelector((state: RootState) => state.ergo);
  const { getWalletAddresses } = useWallet();
  const [portfolio, setPortfolio] = useState<INetaPortfolio>({
    totalStaked: 0,
    addresses: {},
  });
  const [loading, setLoading] = useState(true);
  const { handleError } = useErrorHandler();
  const [stats, setStats] = useState<Partial<INetaStat>>({
    totalStaked: 0,
    numberOfStakers: 0,
    apr: 0,
  });

  /**
   * get parent pathname for back button to staking platform
   */
  const router = useRouter();
  const pathname = router.pathname;
  const parentPath = `/${pathname
    .split("/")
    .filter((e) => e)
    .shift()}`;

  const init = async () => {
    try {
      if (walletApi != null) {
        const addresses = await getWalletAddresses();
        const porto = await getStakingPortfolio(addresses);
        setPortfolio(porto);
      }
      const stats = await getStakedNetaStats();
      if (stats != null) {
        setStats(stats);
      }
    } catch (e) {
      handleError(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, [walletApi]);

  return (
    <InitErgo>
      <>
        <Header></Header>
        {loading ? (
          <Loading></Loading>
        ) : (
          <>
            <StakingStatistic stats={stats}></StakingStatistic>
            {portfolio.totalStaked === 0 ? null : (
              <Portfolio portfolio={portfolio}></Portfolio>
            )}
          </>
        )}
      </>
    </InitErgo>
  );
};
