import useWallet from "@hooks/useErgoWallet";
import { getStakingPortfolio } from "@services/ergo";
import { RootState } from "@services/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

export default () => {
  const { walletApi } = useSelector((state: RootState) => state.ergo);
  const { getWalletAddresses } = useWallet();
  const [portfolio, setPortfolio] = useState(0);
  const router = useRouter();
  const pathname = router.pathname;
  const parentPath = `/${pathname
    .split("/")
    .filter((e) => e)
    .shift()}`;

  useEffect(() => {
    (async () => {
      if (walletApi == null) return;
      const addresses = await getWalletAddresses();
      const stakedNeta = await getStakingPortfolio(addresses);
      if (isNaN(stakedNeta)) return;
      setPortfolio(stakedNeta);
    })();
  }, [walletApi]);

  return (
    <div className="w-full p-5 flex justify-center">
      <div className="max-w-lg w-full gap-4 flex flex-col items-center justify-center">
        {/* Title */}
        <span className="w-fit text-2xl">Portfolio</span>
        <div className="w-full p-5 component rounded-2xl flex flex-col items-center gap-2">
          {portfolio ? (
            <div>Staked NETA: {portfolio} Neta</div>
          ) : (
            <div>You don't have any staked NETA</div>
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
