import useClickOutside from "@hooks/useClickOutside";
import { setWallet } from "@reducers/app";
import { useDispatch } from "react-redux";

const Disconnect = ({ closeButton }: { closeButton: Function }) => {
  const dispatch = useDispatch();
  const ref = useClickOutside(closeButton);

  const handleOnClick = () => {
    closeButton();
    dispatch(setWallet({ walletName: null, wallet: null, walletApi: null }));
  };

  return (
    <div
      className="absolute cursor-pointer button rounded-lg component p-2.5 left-0 -bottom-14"
      onClick={handleOnClick}
      ref={ref}
    >
      Disconnect
    </div>
  );
};

export default Disconnect;
