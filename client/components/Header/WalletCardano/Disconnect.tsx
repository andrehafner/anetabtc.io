import useClickOutside from "@hooks/useClickOutside";
import { setWallet } from "@reducers/cardano";
import { useDispatch } from "react-redux";

const Disconnect = ({ closeButton }: { closeButton: Function }) => {
  const dispatch = useDispatch();
  const ref = useClickOutside(closeButton);

  const handleOnClick = () => {
    closeButton();
    dispatch(
      setWallet({
        walletName: null,
        wallet: null,
        walletApi: null,
        lucidClient: null,
      })
    );
  };

  return (
    <div
      className="absolute clickable rounded-lg component py-1 px-2.5 right-0 mt-2 min-w-fit w-full text-center"
      onClick={handleOnClick}
      ref={ref}
    >
      Disconnect
    </div>
  );
};

export default Disconnect;
