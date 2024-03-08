import { useSelector } from "react-redux";

const ChatBox = () => {
  //eslint-disable-next-line
  const selectedChat = useSelector((state: any) => state.user.selectedChat);
  return (
    <div
      className={` ${
        Object.keys(selectedChat).length > 0
          ? "max-md:flex max-md:flex-col  w-full"
          : "max-md:hidden"
      } md:w-[60%]  border border-[#F9E7E7]  rounded-lg md:flex md:flex-col gap-4 py-2 px-2`}
    >
      ChatBox
    </div>
  );
};

export default ChatBox;
