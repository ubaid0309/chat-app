import { setUserChats } from "@/redux/slice/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { IoIosAdd } from "react-icons/io";
import UserChatCard from "./UserChatCard";
const UserChats = () => {
  const loggedUser = useSelector((state: any) => state.user.userInfo);
  const dispatch = useDispatch();
  const userChats = useSelector((state: any) => state.user.userChats);
  const fetchUserChats = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    try {
      const { data } = await axios.get(
        "https://chat-app-ydlm.onrender.com/api/chat",
        config
      );

      dispatch(setUserChats(data));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserChats();
  }, []);

  return (
    <div
      className={`w-[35%] border border-[#F9E7E7]  rounded-lg flex flex-col gap-4 py-2 px-2`}
    >
      <div
        className={`flex flex-col lg:flex-row justify-between items-center px-6 py-2`}
      >
        <p className="font-poppins">My Chats</p>

        <Button className="flex justify-between items-center gap-2 max-md:w-[100%]">
          New Group Chat <IoIosAdd className=" text-2xl" />
        </Button>
      </div>
      {userChats && (
        <div className="flex flex-col gap-2">
          {userChats.map((chat) => (
            <UserChatCard chat={chat} key={chat._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserChats;
