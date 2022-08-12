import { useDispatch } from "react-redux";
import { setModalChild } from '@reducers/app'

const WalletConnector = () => {
  const dispatch = useDispatch()
  setModalChild
  return (
    <div className="button cursor-pointer bg-slate-900 h-full px-5 rounded-lg flex items-center" 
    onClick={() => dispatch(setModalChild(<>hello</>))}
    >
      Connect Wallet
    </div>
  );
};

export default WalletConnector;
