import { getSender } from "@/config/ChatLogics";
import { setSelectedChat } from "@/redux/slice/userSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserChatCard = ({ chat }) => {
  const selectedChat = useSelector((state: any) => state.user.selectedChat);
  const loggedUser = useSelector((state: any) => state.user.userInfo);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(setSelectedChat(chat))}
      className={`cursor-pointer ${
        chat === selectedChat ? "bg-[#BDD358] text-[#E8EBF7]" : "bg-[#F9E7E7]"
      } rounded-md p-4`}
    >
      {!chat?.isGroupChat ? (
        <p>{getSender(loggedUser, chat?.users)}</p>
      ) : (
        <p className="font-poppins">{chat?.chatName}</p>
      )}
    </div>
  );
};

export default UserChatCard;
