import { Avatar, AvatarImage } from "./ui/avatar";
//eslint-disable-next-line
const UserList = ({ user, handleFunction }: any) => {
  return (
    <div
      onClick={handleFunction}
      className="flex justify-start items-center  w-full rounded-md p-2  gap-3 cursor-pointer text-black hover:bg-[#BDD358] bg-[#F9E7E7] hover:text-[#FEFAE0] "
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
