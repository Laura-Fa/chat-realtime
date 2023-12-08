import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
}

const Language = ({ socket}: Props) => {

  const handleChange = (event: { target: { value: string; }; }) => {
    console.log(event.target.value);
    socket.emit("language-set", {
        language: event.target.value,
      });
  };

  return (
  <div>
    <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Translation language</span>
        </div>
        <select className="select select-bordered"  onChange={handleChange}>
          <option value=""></option>
          <option value="German">Deutsch</option>  
          <option value="English">English</option>  
          <option value="French">Français</option>
          <option value="Italian">Italiano</option>
        </select>
      </label>
   </div>
  );
};

export default Language;
