import { setUserChats } from "@/redux/slice/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import UserChatCard from "./UserChatCard";
import MyDialog from "./MyDialog";
import { Input } from "./ui/input";
import UserList from "./UserList";
import ChatLoadingSkeleton from "./ChatLoadingSkeleton";
import UserBadge from "./UserBadge";
import { UserInfoType } from "@/types";

const UserChats = () => {
  //eslint-disable-next-line
  const loggedUser = JSON.parse(localStorage.getItem("userInfo")!);
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const userChats = useSelector((state: any) => state.user.userChats);
  //eslint-disable-next-line
  const [chatName, setChatName] = useState("");
  //eslint-disable-next-line
  const selectedChat = useSelector((state: any) => state.user.selectedChat);
  const [searchUsers, setSearchUsers] = useState("");
  const [searchUsersResult, setSearchUsersResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAgain = useSelector((state: any) => state.user.fetchAgain);
  const [userChatLoading, setUserChatLoading] = useState(false);

  const fetchUserChats = async () => {
    console.log("inside fetchUserChats");
    const config = {
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    try {
      setUserChatLoading(true);

      const { data } = await axios.get(
        "https://chat-app-ydlm.onrender.com/api/chat",
        config
      );

      dispatch(setUserChats(data));
      setUserChatLoading(false);
      //eslint-disable-next-line
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchUsers(query);
    if (!query) {
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
        `https://chat-app-ydlm.onrender.com/api/user?search=${query}`,
        config
      );

      setSearchUsersResult(data);
      setLoading(false);

      //eslint-disable-next-line
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const submitHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    try {
      const { data } = await axios.post(
        "https://chat-app-ydlm.onrender.com/api/chat/groupcreate",
        {
          groupName: chatName,
          groupUsers: JSON.stringify(
            selectedUsers.map((user: UserInfoType) => user._id)
          ),
        },
        config
      );

      dispatch(setUserChats([data, ...userChats]));
      toast.success("Group chat created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //eslint-disable-next-line

  const handleAddUser = (user: any) => {
    //eslint-disable-next-line
    if (selectedUsers.includes(user)) {
      toast.error("User already exists in group");
      return;
    }

    setSelectedUsers([...selectedUsers, user]);
    setSearchUsers("");
  };

  const handleRemoveUser = (user: UserInfoType): void => {
    const filteredUsers = selectedUsers.filter(
      (u: UserInfoType) => u._id !== user._id
    );

    setSelectedUsers(filteredUsers);
  };

  useEffect(() => {
    fetchUserChats();
  }, [fetchAgain]);

  return (
    <div
      className={`${
        Object.keys(selectedChat).length > 0
          ? "max-md:hidden"
          : "max-md:flex max-md:flex-col max-md:w-full"
      }  w-[35%] border border-[#F9E7E7]  rounded-lg flex flex-col gap-4 py-2 px-2`}
    >
      <div className={`flex   justify-between items-center px-6 py-2`}>
        <p className="font-poppins text-base lg:text-2xl font-medium">
          My Chats
        </p>

        <Button className="flex justify-between items-center gap-2 w-fit">
          <MyDialog trigger="New Group Chat  ">
            <p className="font-poppins text-2xl text-center font-medium">
              Create Group Chat
            </p>
            <form className="flex flex-col gap-3" onSubmit={submitHandler}>
              <Input
                placeholder="Chat name"
                className="border font-poppins"
                onChange={(e: any) => setChatName(e.target.value)}
                value={chatName}
              />
              <Input
                placeholder="Add Users eg : John , Smith "
                className="border font-poppins"
                onChange={(e: any) => handleSearch(e.target.value)}
                value={searchUsers}
              />
              {selectedUsers && (
                <div className="flex gap-2">
                  {selectedUsers.map((user: UserInfoType) => (
                    <UserBadge
                      key={user?._id}
                      title={user?.name}
                      handleFunction={() => handleRemoveUser(user)}
                    />
                  ))}
                </div>
              )}

              {loading ? (
                <ChatLoadingSkeleton />
              ) : (
                <div className="flex flex-col gap-3">
                  {searchUsersResult.slice(0, 4).map(
                    //eslint-disable-next-line
                    (user: any) => (
                      <UserList
                        user={user}
                        key={user?._id}
                        handleFunction={() => handleAddUser(user)}
                      />
                    )
                  )}
                </div>
              )}
              <Button type="submit" className="font-poppins w-fit ">
                Create Chat
              </Button>
            </form>
          </MyDialog>
        </Button>
      </div>
      {userChats && (
        <div className="flex flex-col gap-2">
          {userChatLoading ? (
            <ChatLoadingSkeleton />
          ) : (
            <>
              {userChats.map(
                //eslint-disable-next-line
                (chat: any) => (
                  <UserChatCard chat={chat} key={chat._id} />
                )
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserChats;
