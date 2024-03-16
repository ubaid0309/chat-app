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

const UdateGroupModal = () => {
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const selectedChat = useSelector((state: any) => state.user.selectedChat);
  //eslint-disable-next-line
  const loggedUser = useSelector((state: any) => state.user.userInfo);

  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const submitHandler = async () => {
    if (!groupChatName) return;
  };
  const handleSearch = async (query) => {};
  const handleRemoveUser = async (user) => {};
  const handleAddUser = async (user) => {};
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

            <Button>Update</Button>
          </div>
          <Input
            placeholder="Add Users eg : John , Smith "
            className="border font-poppins"
            onChange={(e: any) => handleSearch(e.target.value)}
            value={search}
          />

          {/* {loading ? (
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
          )} */}
          <Button type="submit" className="font-poppins w-fit ">
            Create Chat
          </Button>
        </form>
      </div>
    </MyDialog>
  );
};

export default UdateGroupModal;
