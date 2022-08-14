import InitErgo from "@layouts/InitErgo";
import StakeErgo from "@components/StakeErgo";
import Header from "@components/Header";

export default function Ergo() {
  return (
    <InitErgo>
      <>
        <Header></Header>
        <StakeErgo></StakeErgo>
      </>
    </InitErgo>
  );
}
