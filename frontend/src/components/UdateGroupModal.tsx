import { FaEye } from "react-icons/fa";
import MyDialog from "./MyDialog";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { UserInfoType } from "./Chat";
import ChatLoadingSkeleton from "./ChatLoadingSkeleton";
import UserBadge from "./UserBadge";
import UserList from "./UserList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import axios from "axios";
import { setFetchAgain, setSelectedChat } from "@/redux/slice/userSlice";

const UdateGroupModal = ({ fetchMessages }) => {
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const selectedChat = useSelector((state: any) => state.user.selectedChat);
  //eslint-disable-next-line
  const loggedUser = useSelector((state: any) => state.user.userInfo);

  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  //eslint-disable-next-line
  const fetchAgain = useSelector((state: any) => state.user.fetchAgain);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!groupChatName) return;
  };

  const handleSearch = async (query: string) => {
    setSearch(query);
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

      setSearchResult(data);
      setLoading(false);

      //eslint-disable-next-line
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  //eslint-disable-next-line
  const handleRemoveUser = async (userToRemove: any) => {
    if (
      selectedChat.groupAdmin._id !== loggedUser._id &&
      userToRemove._id !== loggedUser._id
    ) {
      toast.error("Only group admin can update group");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    try {
      const { data } = await axios.put(
        "https://chat-app-ydlm.onrender.com/api/chat/groupremove",
        {
          groupId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );

      userToRemove._id === loggedUser._id
        ? dispatch(setSelectedChat({}))
        : dispatch(setSelectedChat(data));
      dispatch(setFetchAgain(!fetchAgain));
      fetchMessages();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddUser = async (userToAdd: any) => {
    //eslint-disable-next-line
    if (selectedChat.groupAdmin._id !== loggedUser._id) {
      toast.error("Only group admin can update group");
      return;
    }

    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast.error("User already exists in group");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    try {
      const { data } = await axios.put(
        "https://chat-app-ydlm.onrender.com/api/chat/groupadd",
        {
          groupId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setFetchAgain(!fetchAgain));
    dispatch(setSelectedChat(data));
  };

  const handleRename = async () => {
    if (!groupChatName) {
      toast.error("Please enter group chat name");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    const chat = {
      groupId: selectedChat._id,
      groupName: groupChatName,
    };

    try {
      const { data } = await axios.put(
        "https://chat-app-ydlm.onrender.com/api/chat/renamegroup",
        chat,
        config
      );

      dispatch(setFetchAgain(!fetchAgain));
      dispatch(setSelectedChat(data));
      setGroupChatName("");
    } catch (error) {
      toast.error(error.response.data.message);
      setGroupChatName("");
    }
  };
  return (
    <MyDialog
      triggerClass="bg-[#0F172A] text-white p-2 rounded-md"
      trigger={<FaEye />}
    >
      <div className="flex flex-col gap-4">
        <p className="font-poppins text-2xl text-center font-medium">
          {selectedChat.chatName}
        </p>

        <div className="flex gap-3">
          {selectedChat.users.map((user: UserInfoType) => (
            <UserBadge
              key={user?._id}
              title={user?.name}
              handleFunction={() => handleRemoveUser(user)}
            />
          ))}
        </div>

        <form className="flex flex-col gap-3" onSubmit={submitHandler}>
          <div className="flex gap-3 justify-center items-center">
            <Input
              placeholder="Chat name"
              className="border font-poppins"
              onChange={(e: any) => setGroupChatName(e.target.value)}
              value={groupChatName}
            />

            <Button onClick={handleRename}>Update</Button>
          </div>
          <Input
            placeholder="Add Users eg : John , Smith "
            className="border font-poppins"
            onChange={(e: any) => handleSearch(e.target.value)}
            value={search}
          />

          {loading ? (
            <ChatLoadingSkeleton />
          ) : (
            <div className="flex flex-col gap-3">
              {searchResult.slice(0, 4).map(
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
          <Button
            onClick={() => handleRemoveUser(loggedUser)}
            className="font-poppins w-fit "
          >
            Leave Group
          </Button>
        </form>
      </div>
    </MyDialog>
  );
};

export default UdateGroupModal;
