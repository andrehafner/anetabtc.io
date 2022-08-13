interface Props {
  stakingAmount: number;
  apr: number;
  setStakingAmount: (n: number) => void;
}

const StakingInput = ({ stakingAmount, apr, setStakingAmount }: Props)=> {
  return <div className="border border-theme p-5 rounded-lg">
    <div className="flex flex-row items-center gap-2">
    <img src="/logo.png" className="h-8"></img>
    <input type="number" className="bg-transparent border border-theme rounded-lg p-1 w-full" min={0}></input>
    <div>MAX</div>
    </div>
  </div>
}

export default StakingInput