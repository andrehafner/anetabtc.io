interface IProps {
  title: string;
  value: string | number;
}

export default function StatBox({ title, value }: IProps) {
  return (
    <div className="flex flex-col items-center p-5 component rounded-2xl gap-2 justify-center text-xl w-full sm:w-56">
      <div className="font-bold">{title}</div>
      <div>{value}</div>
    </div>
  );
}
