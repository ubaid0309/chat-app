import axios from "axios";
import { useEffect } from "react";

const Chat = () => {
  async function getChats() {
    const chats = await axios.get("http://localhost:5000/api/chat");
    console.log(chats.data);
  }
  useEffect(() => {
    getChats();
  }, []);

  return <div>Chat</div>;
};

export default Chat;
