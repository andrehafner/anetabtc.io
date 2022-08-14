import Link from "next/link";
import { useRouter } from "next/router";

const ChainSwitch = () => {
  const pathname = useRouter().pathname;

  switch (pathname) {
    case "/ergo":
      return (
        <Link href="/cardano">
          <button className="clickable component h-full px-2.5 rounded-lg flex items-center">
            go to Cardano
          </button>
        </Link>
      );
    case "/cardano":
      return (
        <Link href="/ergo">
          <button className="clickable component h-full px-2.5 rounded-lg flex items-center">
            go to Ergo
          </button>
        </Link>
      );
    default:
      return null;
  }
};

export default ChainSwitch;
