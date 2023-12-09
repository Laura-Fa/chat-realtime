
interface Props {
  setText: any;
  answerOptions :[]
}

const SuggestedAnswers = ({ setText, answerOptions}: Props) => {

  const handleChange = (event: { target: { value: string; }; }) => {
    setText(event.target.value);
  };

  return (
    <div className="flex justify-end">
        <label className="form-control w-full max-w-xs m-2">
        <div className="label">
            <span className="label-text">Suggested answers</span>
        </div>
        <select className="select select-bordered" onChange={handleChange}>
          {Object.keys(answerOptions).map((key: any, index) => {
                return (
                  <option key={index} value={key}>{answerOptions[key]}</option>
                )
              })
          }
        </select>
        </label>
    </div>
  );
};

export default SuggestedAnswers;
