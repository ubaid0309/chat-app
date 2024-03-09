import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "./ui/button";
import { setSelectedChat } from "@/redux/slice/userSlice";
import { getSender, getSenderFullDeatils } from "@/config/ChatLogics";
import MyDialog from "./MyDialog";
import animationData from "../animation/chat-cat.json";
import { animationConfig } from "@/config/animationConfig";
import SenderDialog from "./SenderDialog";

const ChatPanel = () => {
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const selectedChat = useSelector((state: any) => state.user.selectedChat);
  const loggedUser = useSelector((state: any) => state.user.userInfo);

  const animConfig = animationConfig(animationData);

  return (
    <>
      {Object.keys(selectedChat).length > 0 ? (
        <div className="flex justify-between items-center px-6 py-2">
          <Button
            className="md:hidden"
            onClick={() => dispatch(setSelectedChat({}))}
          >
            <IoMdArrowRoundBack />
          </Button>

          {selectedChat.isGroupChat ? (
            <div className="font-poppins font-medium text-lg md:text-2xl">
              <p>{selectedChat.chatName}</p>
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
