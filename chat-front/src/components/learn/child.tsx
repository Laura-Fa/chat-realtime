interface Props {
  children: React.ReactNode;
  name: string;
  setTime: (time: Date) => void;
}
const Child = ({ children, name, setTime }: Props) => {
  return (
    <div className="w-full ">
      <h1>Child</h1>

      <h2>{name}</h2>
      <button onClick={() => setTime(new Date())} type="button" className="btn">
        Set Time
      </button>

      <div className="flex flex-wrap gap-2 p-4">{children}</div>
    </div>
  );
};

export default Child;