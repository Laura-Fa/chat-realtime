import Message, { IMessage } from "./Message";
import { Socket } from "socket.io-client";

interface Props {
  messages: IMessage[];
  username: string;
  socket: Socket;
}

const Messages = ({ socket, messages, username }: Props) => {
  
  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.timeSent}>
          <Message socket={socket} message={msg} isMe={msg.username === username} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
