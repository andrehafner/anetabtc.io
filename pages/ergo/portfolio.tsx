import InitErgo from "@layouts/InitErgo";
import Stake from "@components/Stake";
import Header from "@components/Header";
import Portfolio from "@components/Portfolio";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@services/store";
import useWallet from "@hooks/useErgoWallet";
import { useRouter } from "next/router";
import { getStakingPortfolio } from "@services/ergo";
import { Currency } from "@entities/app";

export default () => {
  const { walletApi } = useSelector((state: RootState) => state.ergo);
  const { getWalletAddresses } = useWallet();
  const [portfolio, setPortfolio] = useState(0);
  const [loading, setLoading] = useState(false);

  /**
   * get parent pathname for back button to staking platform
   */
  const router = useRouter();
  const pathname = router.pathname;
  const parentPath = `/${pathname
    .split("/")
    .filter((e) => e)
    .shift()}`;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (walletApi == null) return;
        const addresses = await getWalletAddresses();
        const stakedNeta = await getStakingPortfolio(addresses);
        if (isNaN(stakedNeta)) return;
        setPortfolio(stakedNeta);
      } finally {
        setLoading(false);
      }
    })();
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
