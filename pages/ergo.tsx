import InitCardano from "@layouts/InitCardano";
import StakeErgo from "@components/StakeErgo";
import Header from "@components/Header";

export default function Ergo() {
  return (
    <InitCardano>
      <>
        <Header></Header>
        <StakeErgo></StakeErgo>
      </>
    </InitCardano>
  );
}
