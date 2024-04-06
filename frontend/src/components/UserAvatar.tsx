import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

interface UserAvatarProps {
  profilePicture: string;
  name?: string;
  otherClasses?: string;
}

const UserAvatar = ({
  profilePicture,
  name,
  otherClasses,
}: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage
        className={otherClasses ? `${otherClasses}` : ""}
        src={profilePicture}
        alt="@shadcn"
      />
      {name && <AvatarFallback>{name}</AvatarFallback>}
    </Avatar>
  );
};

export default UserAvatar;
