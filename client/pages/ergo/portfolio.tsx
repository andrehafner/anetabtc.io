import InitErgo from "@layouts/InitErgo";
import Header from "@components/Header";
import Portfolio from "@components/Portfolio/neta";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@services/store";
import useWallet from "@hooks/useErgoWallet";
import { useRouter } from "next/router";
import { getStakedNetaStats, getStakingPortfolio } from "@services/ergo";
import { Currency } from "@entities/app";
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
      if (walletApi == null) return;
      const addresses = await getWalletAddresses();
      const [porto, stats] = await Promise.all([
        getStakingPortfolio(addresses),
        getStakedNetaStats(),
      ]);
      setPortfolio(porto);
      if (stats != null) {
        setStats(stats);
      }
      setLoading(false);
    } catch (e) {
      handleError(e);
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
            <Portfolio portfolio={portfolio}></Portfolio>
            <StakingStatistic stats={stats}></StakingStatistic>{" "}
          </>
        )}
      </>
    </InitErgo>
  );
};
