import Link from "next/link";
import Header from "@components/Header";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="w-full mt-10 sm:mt-24 p-5 flex justify-center">
        <div className="max-w-sm w-full flex flex-col gap-4 items-center justify-center">
          <span className="w-fit text-2xl">AnetaBTC Staking</span>
          <img src="/aneta-angel.png" className="h-40 w-fit aneta-angel"></img>
          <div className="component p-5 w-full rounded-2xl flex flex-col gap-4 items-center">
            <div className="w-full flex flex-col gap-4">
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
    </>
  );
}
