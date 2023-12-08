export interface IMessage {
  username: string;
  content: string;
  timeSent: string;
  translation:string;
  informationVerification: string;
}

import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  message: IMessage;
  isMe: boolean;
}

const Message = ({socket, message, isMe }: Props) => {
  const handleSubmit =(message: IMessage)  => {
    socket.emit("verify-information", {
      message: message
    });
  }

  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-header">
        {message.username}
        <time className="text-xs opacity-50"> {message.timeSent}</time>
      </div>
      <div
        className={`chat-bubble ${
          isMe ? "chat-bubble-primary" : "chat-bubble-secondary"
        }`}
      >
        {message.content}
        <p style={{ fontStyle: 'italic', fontSize: 'smaller' }}>{message.translation}</p> 
        <button className="btn btn-neutral btn-xs" onClick={() => handleSubmit(message)}>Verify information</button>
        <p  className={`bg-neutral rounded mt-2 ${message.informationVerification ? 'p-2' : ''}`} style={{  fontSize: 'smaller'}}>{message.informationVerification}</p> 
      
      </div>
    </div>
 
  );
};

export default Message;
