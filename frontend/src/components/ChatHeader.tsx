import {
  Sheet,
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IoIosNotifications } from "react-icons/io";
// import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { RiChatSmile2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ChatLoadingSkeleton from "./ChatLoadingSkeleton";
import UserList from "./UserList";
import UserAvatar from "./UserAvatar";
import { removeUserData, setSelectedChat } from "@/redux/slice/userSlice";
import { UserInfoType } from "@/types";

const ChatHeader = () => {
  const loggedUser = useSelector((state: any) => state.user.userInfo);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
        `http://localhost:5000/api/user?search=${search}`,
        config
      );

      setSearchResult(data);
      setLoading(false);
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
        "http://localhost:5000/api/chat",
        { userId },
        config
      );

      dispatch(setSelectedChat(data));
    } catch (error: any) {
      console.log(error.message);
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
                <div>
                  {searchResult?.map((result: UserInfoType, index) => (
                    <UserList
                      key={index}
                      user={result}
                      handleFunction={() => accessChat(result?._id)}
                    />
                  ))}
                </div>
              )}
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-3 justify-center items-center">
        <RiChatSmile2Line className="text-yellow-400 text-4xl" />
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
                  <Dialog>
                    <DialogTrigger>Profile</DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="flex flex-col gap-2 justify-center items-center">
                        <DialogTitle className="text-xl">
                          {loggedUser?.name}
                        </DialogTitle>
                        <DialogDescription className="flex flex-col gap-2 justify-center items-center">
                          <img
                            className="w-[20%]"
                            src={loggedUser?.profilePicture}
                            alt=""
                          />
                          <p className="text-3xl text-black">
                            Email : {loggedUser?.email}
                          </p>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={logoutHandler}>Logout</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
