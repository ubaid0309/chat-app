import { UserInfoType } from "@/types";
//eslint-disable-next-line
export const getSender = (loggedUser: UserInfoType, users: any) => {
  return users[0]._id !== loggedUser._id ? users[0].name : users[1].name;
};
