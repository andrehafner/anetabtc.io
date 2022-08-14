import { useEffect } from "react";
import useErgoWallet from '@hooks/useErgoWallet'

const InitErgo = ({ children }: { children: JSX.Element }) => {
  const { enableWallet } = useErgoWallet()
  useEffect(() => {
    (async () => {
      const {walletApi} = await enableWallet()
      console.log(walletApi)
    })();
  });

  return <>{children}</>;
};

export default InitErgo;
