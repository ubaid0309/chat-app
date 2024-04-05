import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "./ui/button";
import { setSelectedChat } from "@/redux/slice/userSlice";
import { getSender, getSenderFullDeatils } from "@/config/ChatLogics";
import animationData from "../animation/chat-cat.json";
import typingAnimationData from "../animation/typing.json";
import { animationConfig } from "@/config/animationConfig";
import SenderDialog from "./SenderDialog";
import UdateGroupModal from "./UdateGroupModal";
import { useEffect, useState } from "react";
import ChatLoadingSkeleton from "./ChatLoadingSkeleton";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import axios from "axios";
import ScrollableChatFeed from "./ScrollableChatFeed";
import { io } from "socket.io-client";
const ENDPOINT = "https://chat-app-ydlm.onrender.com";

let socket, selectedChatCompare;

const ChatPanel = () => {
  const animConfig = animationConfig(animationData);
  const typingAnimationConfig = animationConfig(typingAnimationData);
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const selectedChat = useSelector((state: any) => state.user.selectedChat);
  //eslint-disable-next-line
  const loggedUser = useSelector((state: any) => state.user.userInfo);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!newMessage) {
      toast.error("Messsage cannot  be empty");
      return;
    }
    socket.emit("stop-typing", selectedChat._id);
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
      socket.emit("new-message", data);
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

      socket.emit("join-chat", selectedChat._id);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop-typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", loggedUser);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message-recieved", (newMessage) => {
      console.log(newMessage);
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.reciever._id
      ) {
        //give notifications
        console.log("insided notification");
      } else {
        console.log("messages set");
        setMessages([...messages, newMessage]);
      }
    });
  });

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
            {isTyping ? (
              <div>
                <Lottie
                  options={typingAnimationConfig}
                  style={{ backgroundColor: "transparent", marginLeft: 0 }}
                  width={"60px"}
                />
              </div>
            ) : (
              <></>
            )}
            <Input
              className="font-poppins border"
              placeholder="Enter a message"
              onChange={typingHandler}
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
