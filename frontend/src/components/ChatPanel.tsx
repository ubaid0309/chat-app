import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "./ui/button";
import { setSelectedChat } from "@/redux/slice/userSlice";
import { getSender, getSenderFullDeatils } from "@/config/ChatLogics";
import animationData from "../animation/chat-cat.json";
import { animationConfig } from "@/config/animationConfig";
import SenderDialog from "./SenderDialog";
import UdateGroupModal from "./UdateGroupModal";
import { useEffect, useState } from "react";
import ChatLoadingSkeleton from "./ChatLoadingSkeleton";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import axios from "axios";
import ScrollableChatFeed from "./ScrollableChatFeed";

const ChatPanel = () => {
  const animConfig = animationConfig(animationData);
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const selectedChat = useSelector((state: any) => state.user.selectedChat);
  //eslint-disable-next-line
  const loggedUser = useSelector((state: any) => state.user.userInfo);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!newMessage) {
      toast.error("Messsage cannot  be empty");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    setNewMessage("");

    try {
      const { data } = await axios.post(
        "https://chat-app-ydlm.onrender.com/api/message",
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      setMessages([...messages, data]);
      console.log(messages);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchMessages = async () => {
    if (Object.keys(selectedChat).length < 1) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://chat-app-ydlm.onrender.com/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);

      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  return (
    <>
      {Object.keys(selectedChat).length > 0 ? (
        <div className="flex flex-col gap-3 h-full w-full">
          <div className="flex justify-between items-center px-6 py-2 gap-4">
            <Button
              className="md:hidden"
              onClick={() => dispatch(setSelectedChat({}))}
            >
              <IoMdArrowRoundBack />
            </Button>

            {selectedChat.isGroupChat ? (
              <div className="font-poppins font-medium text-lg md:text-2xl flex w-full justify-between items-center">
                <p>{selectedChat.chatName.toUpperCase()}</p>

                <UdateGroupModal fetchMessages={fetchMessages} />
              </div>
            ) : (
              <div className="font-poppins font-medium text-lg md:text-2xl flex w-full justify-between items-center">
                <p>{getSender(loggedUser, selectedChat.users)}</p>

                <SenderDialog
                  user={getSenderFullDeatils(loggedUser, selectedChat.users)}
                />
              </div>
            )}
          </div>

          <div className="chat-box h-full w-full rounded-md overflow-y-scroll bg-[#F9E7E7] px-1 py-2">
            {loading ? (
              <div>
                <ChatLoadingSkeleton />
              </div>
            ) : (
              <div className="flex flex-col  ">
                <ScrollableChatFeed messages={messages} />
              </div>
            )}
          </div>

          <form onSubmit={submitHandler}>
            <Input
              className="font-poppins border"
              placeholder="Enter a message"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center">
          <Lottie options={animConfig} width={"60%"} />
          <p className="text-center font-poppins font-medium text-2xl">
            Select chat to start conversation
          </p>
        </div>
      )}
    </>
  );
};

export default ChatPanel;
