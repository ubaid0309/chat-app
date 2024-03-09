import { UserInfoType } from "@/types";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FaEye } from "react-icons/fa";

interface SenderDialogProps {
  user: UserInfoType;
}
const SenderDialog = ({ user }: SenderDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger className="p-0 font-normal text-base">
        <Button>
          <FaEye />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="dialog-title text-xl">{user?.name}</p>
          <img className="w-[20%]" src={user?.profilePicture} alt="" />
          <p className="text-3xl text-black">Email : {user?.email}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SenderDialog;
