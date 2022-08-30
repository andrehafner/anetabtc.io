import { RootState } from "@services/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import ChainSwitch from "./ChainSwitch";
import ThemeSwitch from "./ThemeSwitch";
import TVL from "./TVL";
import WalletCardano from "./WalletCardano";
import WalletErgo from "./WalletErgo";

const Header: React.FC = () => {
  const pathname = useRouter().pathname;
  const theme = useSelector((state: RootState) => state.app.theme);

  const RenderWallet = () => {
    switch (pathname) {
      case "/ergo":
        return <WalletErgo></WalletErgo>;
      case "/cardano":
        return <WalletCardano></WalletCardano>;
      default:
        return null;
    }
  };

  return (
    <div className="md:h-20 p-6 flex flex-col gap-4 md:gap-0 md:flex-row items-center">
      <div className="h-8 md:h-full gap-2 flex flex-row items-center">
        <Link href="/">
          <img
            className="h-full cursor-pointer"
            src={`/logo-theme-${theme}.png`}
          ></img>
        </Link>
        {/* <TVL /> */}
      </div>
      <div className="h-8 md:h-full gap-2 flex flex-row-reverse items-center gap-2 md:ml-auto">
        <ThemeSwitch></ThemeSwitch>
        <RenderWallet></RenderWallet>
        <ChainSwitch></ChainSwitch>
      </div>
    </div>
  );
};

export default Header;
