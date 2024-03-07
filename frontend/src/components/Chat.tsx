import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChatBox from "./ChatBox";
import ChatHeader from "./ChatHeader";
import UserChats from "./UserChats";
import { useEffect } from "react";
import { setUserData } from "@/redux/slice/userSlice";

export interface UserInfoType {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  token: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo: UserInfoType = JSON.parse(
      localStorage.getItem("userInfo")!
    );
    if (!userInfo) {
      navigate("/");
    }
    dispatch(setUserData(userInfo));
  }, [location, location.pathname]);

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
