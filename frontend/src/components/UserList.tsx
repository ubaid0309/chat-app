import { Avatar, AvatarImage } from "./ui/avatar";

const UserList = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className="flex justify-start items-center rounded-md p-2  gap-3 cursor-pointer text-black hover:bg-[#BDD358] bg-[#F9E7E7] hover:text-[#FEFAE0] transition-all duration-100"
    >
      <Avatar>
        <AvatarImage src={user?.profilePicture} alt="@shadcn" />
      </Avatar>

      <div className="text-lg flex flex-col  ">
        <p className="font-medium">{user?.name}</p>
        <p>
          <span className="font-medium">Email : </span> {user?.email}
        </p>
      </div>
    </div>
  );
};

export default UserList;
