import { ERGO_TX_FORMAT, INetaStakeBox } from "@entities/ergo";
import { shorten } from "@/utils";
import { Currency } from "@entities/app";
import { unstakeNeta } from "@services/ergo";
import useErrorHandler from "@hooks/useErrorHandler";
import { IUnstakeNeta } from "@services/ergo.dto";
import useWallet from "@hooks/useErgoWallet";

interface Props {
  stakeBox: INetaStakeBox;
}

export default ({ stakeBox }: Props) => {
  const { handleError } = useErrorHandler();
  const { getWalletAddress, getWalletAddresses } = useWallet();

  const unstake = async () => {
    try {
      const body: IUnstakeNeta = {
        address: await getWalletAddress(),
        addresses: await getWalletAddresses(),
        utxos: [],
        txFormat: ERGO_TX_FORMAT,
        amount: stakeBox.stakeAmount,
        stakeBox: stakeBox.boxId,
      };
      console.log(await unstakeNeta(body));
      /**
       * todo: sign tx
       */
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full p-2.5 border border-theme rounded-2xl">
      <div>Stake ID: {shorten(stakeBox.stakeKeyId, 8)}</div>
      <div>
        Stake Amount: {stakeBox.stakeAmount} {Currency.NETA}
      </div>
      <button
        className="clickable button rounded-lg py-1 px-2.5 button-danger w-fit"
        onClick={unstake}
      >
        Unstake
      </button>
    </div>
  );
};
