import Layout from "@layouts/Layout";
import Stake from "@components/Stake";
import { useEffect } from "react";
import { getWallet } from "@services/wallet";
import { WalletName } from "@entities/wallet";

export default function Home() {
  /**
   * init
   */
  useEffect(() => {
    (async () => {
      const wallet = await getWallet(WalletName.nami);
      const walletApi = await wallet.enable();
    })();
  }, []);

  return <Layout ChildComponent={Stake}></Layout>;
}
