import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "@/config/ChatLogics";

import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import UserAvatar from "./UserAvatar";

const ScrollableChatFeed = ({ messages }) => {
  const loggedUser = useSelector((state: any) => state.user.userInfo);

  return (
    <ScrollableFeed className="font-poppins">
      {console.log(messages)}
      {messages &&
        messages.map((m, i) => (
          <div className="flex gap-2 " key={m._id}>
            {(isSameSender(messages, m, i, loggedUser._id) ||
              isLastMessage(messages, i, loggedUser._id)) && (
              <UserAvatar
                profilePicture={m.sender.profilePicture}
                name={m.sender.name}
              />
            )}
            <span
              className={`text-[#f9e7e7] rounded-xl font-poppins p-2 max-w-[75%]  ${
                m.sender._id === loggedUser._id
                  ? "bg-[#ffc857]"
                  : "bg-[#0F172A]"
              } ml-${isSameSenderMargin(messages, m, i, loggedUser._id)} ${
                isSameUser(messages, m, i) ? "mt-1" : "mt-4"
              }`}
            >
              {m.message}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChatFeed;
