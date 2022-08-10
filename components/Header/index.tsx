import React from "react"
import ChainSwitch from "./ChainSwitch"
import ThemeSwitch from "./ThemeSwitch"
import TVL from './TVL'
import WalletConnector from "./WalletConnector"

const Header: React.FC = () => {
  return (
    <div className="h-20 p-5 flex flex-row items-center">
      <div className="h-full gap-2 flex flex-row items-center">
        <img className="h-full" src="/logo-theme-dark.png"></img>
        <TVL/>
      </div>
      <div className="h-full gap-2 flex flex-row-reverse items-center gap-2 ml-auto">
      <ThemeSwitch></ThemeSwitch>
      <WalletConnector></WalletConnector>
      <ChainSwitch></ChainSwitch>
      </div>
    </div>
  )
}

export default Header