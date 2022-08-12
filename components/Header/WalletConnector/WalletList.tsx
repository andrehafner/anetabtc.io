import { WalletName } from "@entities/wallet";

const WalletList = ({
  connectWallet,
}: {
  connectWallet: (walletName: WalletName) => void;
}) => {
  const cardano = (window as any).cardano;

  return cardano ? (
    <div className="flex flex-col gap-4 w-full">
      {Object.keys(cardano)
        .filter((walletName) => WalletName[walletName as WalletName])
        .map((walletName) => (
          <div
            className="rounded-lg border border-theme p-2.5 cursor-pointer"
            onClick={() => connectWallet(walletName as WalletName)}
            key={walletName}
          >
            <div className="flex flex-row gap-2 items-center">
              <img className="h-6" src={cardano[walletName].icon}></img>
              {cardano[walletName].name}
            </div>
          </div>
        ))}
    </div>
  ) : (
    <div className="flex flex-col gap-4 w-full">No Cardano wallet found</div>
  );
};

export default WalletList;
