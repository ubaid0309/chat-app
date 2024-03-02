import { Avatar, AvatarImage } from "./ui/avatar";

const UserList = ({ user, handleFunction }) => {
  return (
    <div className="flex justify-start items-center rounded-md px-2 py-2 gap-3 cursor-pointer text-black hover:bg-[#BDD358] hover:text-[#FEFAE0] transition-all duration-200">
      <Avatar>
        <AvatarImage src={user?.profilePicture} alt="@shadcn" />
      </Avatar>

      <div className="text-lg flex flex-col  ">
        <p>{user?.name}</p>
        <p>
          <span className="font-normal">Email</span> {user?.email}
        </p>
      </div>
    </div>
  );
};

export default UserList;
