import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

interface UserAvatarProps {
  profilePicture: string;
  name?: string;
}

const UserAvatar = ({ profilePicture, name }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={profilePicture} alt="@shadcn" />
      {name && <AvatarFallback>{name}</AvatarFallback>}
    </Avatar>
  );
};

export default UserAvatar;
