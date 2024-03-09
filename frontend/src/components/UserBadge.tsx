import { Badge } from "@/components/ui/badge";
import { IoIosClose } from "react-icons/io";

//eslint-disable-next-line
const UserBadge = ({ title, handleFunction }: any) => {
  return (
    <Badge>
      {title}
      <IoIosClose onClick={handleFunction} className="text-2xl" />
    </Badge>
  );
};

export default UserBadge;
