import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full p-5 flex justify-center">
      <div className="max-w-lg w-full flex flex-col gap-4 items-center justify-center">
        <span className="w-fit text-2xl">NETA/cNETA Staking</span>
        <div className="component p-5 w-full rounded-2xl flex flex-col gap-4 items-center">
          <img src="/aneta-angel.png" className="h-40 w-fit"></img>
          <div className="w-full flex flex-col gap-2">
            <Link href="/cardano">
              <button className="button clickable py-1 rounded-lg w-full">
                Stake cNETA on Cardano
              </button>
            </Link>
            <Link href="/ergo">
              <button className="button clickable py-1 rounded-lg w-full">
                Stake NETA on Ergo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
