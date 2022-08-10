import Layout from "layouts/Layout";
import Stake from "@components/Stake";
import { useEffect } from "react";
import { getWalletInfo } from '@services/wallet'
import { WalletName } from "@entities/wallet";

export default function Home() {
  /**
   * init
   */
  useEffect(() => {
    (async () => {
      const wallet = await getWalletInfo(WalletName.nami)
      const walletApi = await wallet.enable()
    })()
  }, [])

  return <Layout ChildComponent={Stake}></Layout>;
}
