"use client";
import { useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  username: string;
}

const SendMessage = ({ socket, username }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("chat-message", {
      username,
      content: text,
      timeSent: new Date().toISOString(),
    });

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
    setText("");
  };
  return (
    <form onSubmit={handleSubmit}   id="messageForm">
      <input
        className="input input-bordered input-primary w-full max-w-xs"
        placeholder="Enter your message"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button  className="btn" type="submit">Submit</button>
    </form>
  );
};

export default SendMessage;
