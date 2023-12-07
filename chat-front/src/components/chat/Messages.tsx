import Message, { IMessage } from "./Message";

interface Props {
  messages: IMessage[];
  username: string;
}

const Messages = ({ messages, username }: Props) => {
  
  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.timeSent}>
          <Message message={msg} isMe={msg.username === username} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
