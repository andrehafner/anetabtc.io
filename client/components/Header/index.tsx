import { Blockchain } from "@entities/app";
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
    switch (true) {
      case pathname.includes(Blockchain.ergo):
        return <WalletErgo></WalletErgo>;
      case pathname.includes(Blockchain.cardano):
        return <WalletCardano></WalletCardano>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 flex flex-col gap-4 md:gap-0 md:flex-row items-center">
      <div className="gap-2 flex flex-row items-center">
        <Link href="/">
          <img
            className="h-10 cursor-pointer h-8"
            src={`/logo-theme-${theme}.png`}
          ></img>
        </Link>
        {/* <TVL /> */}
      </div>
      <div className="gap-2 flex flex-row-reverse items-center gap-2 md:ml-auto flex-wrap justify-center">
        <ThemeSwitch></ThemeSwitch>
        <RenderWallet></RenderWallet>
        <ChainSwitch></ChainSwitch>
        <Link href="/dashboard">
          <button className="h-10 clickable component px-2.5 rounded-lg flex items-center">
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
