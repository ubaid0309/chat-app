import ChatBox from "./ChatBox";
import ChatHeader from "./ChatHeader";
import UserChats from "./UserChats";

const Chat = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col">
        <ChatHeader />

        <div className="flex w-full h-[90vh]">
          <UserChats />
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Chat;
