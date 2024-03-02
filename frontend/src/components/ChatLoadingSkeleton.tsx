import { Skeleton } from "./ui/skeleton";

const ChatLoadingSkeleton = () => {
  return (
    <div className="flex flex-col px-4 gap-4">
      <Skeleton className="h-8 w-[260px]  rounded-md bg-gray-500" />
      <Skeleton className="h-8 w-[260px]  rounded-md bg-gray-500" />
      <Skeleton className="h-8 w-[260px]  rounded-md bg-gray-500" />
      <Skeleton className="h-8 w-[260px]  rounded-md bg-gray-500" />
      <Skeleton className="h-8 w-[260px]  rounded-md bg-gray-500" />
    </div>
  );
};

export default ChatLoadingSkeleton;
