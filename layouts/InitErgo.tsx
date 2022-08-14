import { useEffect } from "react";
import useErgoWallet from "@hooks/useErgoWallet";
import { setWallet } from "@reducers/ergo";
import { useDispatch } from "react-redux";

const InitErgo = ({ children }: { children: JSX.Element }) => {
  const { enableWallet } = useErgoWallet();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const walletApi = await enableWallet();
      dispatch(setWallet({ walletApi }));
    })();
  }, []);

  return <>{children}</>;
};

export default InitErgo;
