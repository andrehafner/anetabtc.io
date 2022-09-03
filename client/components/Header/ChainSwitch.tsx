import { Blockchain } from "@entities/app";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "@hooks/useClickOutside";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const ChainSwitch = () => {
  const pathname = useRouter().pathname;
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useClickOutside(() => setShowDropdown(false));

  const CardanoLogo = () => <img src="/cardanologo.svg" className="h-5"></img>;
  const ErgoLogo = () => <img src="/ergologo.svg" className="h-5"></img>;

  const ChainDropdown = () => {
    return (
      <div className="absolute mt-2 right-0 flex flex-col gap-2 p-2 rounded-lg component border border-theme">
        <Link href="/cardano">
          <div className="px-2.5 w-28 py-1 clickable button rounded-lg flex items-center gap-2 box-content">
            <CardanoLogo></CardanoLogo>
            <div>Cardano</div>
            {pathname === "/cardano" ? (
              <FontAwesomeIcon
                className="text-agreen h-2 ml-auto"
                icon={faPowerOff}
              ></FontAwesomeIcon>
            ) : null}
          </div>
        </Link>
        <Link href="/ergo">
          <div className="px-2.5 w-28 py-1 clickable button rounded-lg flex items-center gap-2 box-content">
            <ErgoLogo></ErgoLogo>
            <div>Ergo</div>
            {pathname === "/ergo" ? (
              <FontAwesomeIcon
                className="text-agreen h-2 ml-auto"
                icon={faPowerOff}
              ></FontAwesomeIcon>
            ) : null}
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="h-full relative" ref={ref}>
      {pathname.includes(Blockchain.cardano) ? (
        <div
          className="relative clickable component h-full px-2.5 rounded-lg flex items-center gap-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <CardanoLogo></CardanoLogo> Cardano
        </div>
      ) : null}

      {pathname.includes(Blockchain.ergo) ? (
        <div
          className="relative clickable component h-full px-2.5 rounded-lg flex items-center gap-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <ErgoLogo></ErgoLogo> Ergo
        </div>
      ) : null}

      {showDropdown ? <ChainDropdown></ChainDropdown> : null}
    </div>
  );
};

export default ChainSwitch;
