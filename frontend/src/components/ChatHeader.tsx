import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { IoIosNotifications } from "react-icons/io";
// import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ChatLoadingSkeleton from "./ChatLoadingSkeleton";
import UserList from "./UserList";
import UserAvatar from "./UserAvatar";
import {
  removeUserData,
  setSelectedChat,
  setUserChats,
} from "@/redux/slice/userSlice";
import { UserInfoType } from "@/types";
//eslint-disable-next-line
import Lottie from "react-lottie";
import animationData from "../animation/chat-bubble.json";
import { animationConfig } from "@/config/animationConfig";
import MyDialog from "./MyDialog";

const ChatHeader = () => {
  //eslint-disable-next-line
  const loggedUser = useSelector((state: any) => state.user.userInfo);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const userChats = useSelector((state: any) => state.user.userChats);
  const config = animationConfig(animationData);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(removeUserData());
    navigate("/");
  };

  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const getSearchResults = async () => {
    if (!search) {
      toast.warn("Enter name or email");
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
        `https://chat-app-ydlm.onrender.com/api/user?search=${search}`,
        config
      );

      setSearchResult(data);
      setLoading(false);
      //eslint-disable-next-line
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const accessChat = async (userId: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    try {
      const { data } = await axios.post(
        "https://chat-app-ydlm.onrender.com/api/chat",
        { userId },
        config
      );

      //eslint-disable-next-line
      if (!userChats.find((chat: any) => chat._id === data._id)) {
        dispatch(setUserChats([data, ...userChats]));
      }

      toast.success(`Chat created with ${data?.users[1]?.name}`);

      dispatch(setSelectedChat(data));
      //eslint-disable-next-line
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex w-screen px-6 py-2 justify-between items-center">
      <div className="sheet">
        <Sheet>
          <SheetTrigger className="">Open</SheetTrigger>
          <SheetContent
            side={"left"}
            className="flex flex-col gap-4 text-black font-poppins"
          >
            <SheetHeader className="flex flex-row gap-2">
              <div className="flex justify-center items-center gap-2 px-2 rounded-md border w-[80%]">
                <CiSearch />
                <Input
                  className=" w-[100%]"
                  placeholder="Search with name or email"
                  value={search}
                  onChange={searchHandler}
                />
              </div>
              <button
                onClick={getSearchResults}
                className="hover:bg-black hover:text-white transition-all duration-500 rounded-md px-2 py-2 "
              >
                Search
              </button>
            </SheetHeader>
            <SheetDescription asChild>
              {loading ? (
                <ChatLoadingSkeleton />
              ) : (
                <SheetClose className="flex flex-col gap-2 overflow-y-scroll">
                  {searchResult?.map((result: UserInfoType, index) => (
                    <UserList
                      key={index}
                      user={result}
                      handleFunction={() => accessChat(result?._id)}
                    />
                  ))}
                </SheetClose>
              )}
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-3 justify-center items-center">
        <Lottie options={config} width={80} height={80} />
        <p>Chat Application</p>
      </div>

      <div className="flex justify-center items-center gap-4">
        <div>
          <IoIosNotifications />
        </div>

        <div>
          <Menubar className="border-none ">
            <MenubarMenu>
              <MenubarTrigger className="text-gray-200 px-2 py-4 ">
                <UserAvatar
                  profilePicture={loggedUser?.profilePicture}
                  name={loggedUser?.name}
                />
              </MenubarTrigger>
              <MenubarContent className="text-lg font-normal font-poppins">
                <MenubarItem asChild>
                  <MyDialog trigger="Profile">
                    <div className="flex flex-col gap-2 justify-center items-center">
                      <p className="dialog-title text-xl">{loggedUser?.name}</p>
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <img
                          className="w-[20%]"
                          src={loggedUser?.profilePicture}
                          alt=""
                        />
                        <p className="text-3xl text-black">
                          Email : {loggedUser?.email}
                        </p>
                      </div>
                    </div>
                  </MyDialog>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  asChild
                  onClick={logoutHandler}
                  className="p-0 font-normal text-base"
                >
                  <p>Logout</p>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
