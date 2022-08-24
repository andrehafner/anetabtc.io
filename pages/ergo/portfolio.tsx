import InitErgo from "@layouts/InitErgo";
import Stake from "@components/Stake";
import Header from "@components/Header";
import Portfolio from "@components/Portfolio";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@services/store";
import useWallet from "@hooks/useErgoWallet";
import { useRouter } from "next/router";
import { getStakingPortfolio } from "@services/ergo";
import { Currency } from "@entities/app";
import useErrorHandler from "@hooks/useErrorHandler";

export default () => {
  const { walletApi } = useSelector((state: RootState) => state.ergo);
  const { getWalletAddresses } = useWallet();
  const [portfolio, setPortfolio] = useState(0);
  const [loading, setLoading] = useState(false);
  const { handleError } = useErrorHandler();

  /**
   * get parent pathname for back button to staking platform
   */
  const router = useRouter();
  const pathname = router.pathname;
  const parentPath = `/${pathname
    .split("/")
    .filter((e) => e)
    .shift()}`;

  const getPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      if (walletApi == null) return;
      const addresses = await getWalletAddresses();
      const stakedNeta = await getStakingPortfolio(addresses);
      if (isNaN(stakedNeta)) return;
      setPortfolio(stakedNeta);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  }, [walletApi]);

  useEffect(() => {
    getPortfolio();
  }, [walletApi]);

  return (
    <InitErgo>
      <>
        <Header></Header>
        <Portfolio
          loading={loading}
          currency={Currency.NETA}
          parentPath={parentPath}
          portfolio={portfolio}
        ></Portfolio>
      </>
    </InitErgo>
  );
};
