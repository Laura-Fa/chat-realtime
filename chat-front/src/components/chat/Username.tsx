import { useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  setUsername: (username: string) => void;
}

const Username = ({ socket, setUsername }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(text);
    socket.emit("username-set", {
      username: text,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input input-bordered input-primary w-full max-w-xs"
        placeholder="Enter username"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <button className="btn" type="submit">Submit</button>
    </form>
  );
};

export default Username;
