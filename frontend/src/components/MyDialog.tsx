import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface MyDialogPropsTypes {
  children: React.ReactNode;
  trigger: string | React.ReactNode;
  triggerClass?: string;
}

const MyDialog = ({ children, trigger, triggerClass }: MyDialogPropsTypes) => {
  return (
    <Dialog>
      <DialogTrigger className={`p-0 font-normal text-base ${triggerClass}`}>
        {trigger}
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default MyDialog;
