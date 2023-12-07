export interface IMessage {
  username: string;
  content: string;
  timeSent: string;
}

interface Props {
  message: IMessage;
  isMe: boolean;
}

const Message = ({ message, isMe }: Props) => {
  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-header">
        {message.username}
        <time className="text-xs opacity-50">{message.timeSent}</time>
      </div>
      <div
        className={`chat-bubble ${
          isMe ? "chat-bubble-primary" : "chat-bubble-secondary"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default Message;
