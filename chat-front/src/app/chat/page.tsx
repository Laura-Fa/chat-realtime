"use client";
import Messages from "@/components/chat/Messages";
import SendMessage from "@/components/chat/SendMessage";
import Username from "@/components/chat/Username";
import Language from "@/components/chat/Language";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.once("messages-old", (data) => {
      setMessages((msg) => [msg, ...data] as any);
    });

    socket.on("chat-message", (data) => {
      console.log("chat-message", data);
      setMessages((msg) => [...msg, data] as any);
    });

    socket.on("verify-information", (data) => {
      setMessages((prevMessages) => {
        
        let messagesCopy = [...prevMessages] as any;
        // Modifier uniquement le message verifie
        for (let i = 0; i < messagesCopy.length; i++) {
          if (messagesCopy[i].timeSent ===  data.timeSent) {
            messagesCopy[i].informationVerification = data.informationVerification;
            break;
          }
        }

        return messagesCopy;
      })
    });
 
  }, []);

  return (
    <div>
      <h1>Chat</h1>
   
      <Username socket={socket} setUsername={setUsername} />
      <Language socket={socket} />
      <Messages socket={socket} messages={messages} username={username} />
      <SendMessage socket={socket} username={username} />
    </div>
  );
};

export default Chat;
