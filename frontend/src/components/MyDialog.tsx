import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface MyDialogPropsTypes {
  children: React.ReactNode;
  trigger: string;
}

const MyDialog = ({ children, trigger }: MyDialogPropsTypes) => {
  return (
    <Dialog>
      <DialogTrigger className="p-0 font-normal text-base">
        {trigger}
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default MyDialog;
