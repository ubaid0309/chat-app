import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { IoIosNotifications } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import CatDoodle from "@/assets/images/chat-cat.png";
const ChatHeader = () => {
  return (
    <div className="flex w-screen px-6  justify-between items-center">
      <div className="sheet">
        <Sheet>
          <SheetTrigger className="">Open</SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <div className="flex justify-center items-center gap-2 rounded-md border w-[90%]">
                <CiSearch />
                <Input className=" w-[100%]" placeholder="Search .." />
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex justify-center items-center">
        <img className="w-[30%] max-md:hidden" src={CatDoodle} alt="" />
        <p>Chat Application</p>
      </div>

      <div className="flex justify-center items-center gap-4">
        <div>
          <IoIosNotifications />
        </div>

        <div>
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger className="rounded-full  bg-yellow-400 text-gray-200 px-2 py-4 ">
                Profile
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Ubaid</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>ubaidskms@gmail.com</MenubarItem>
                <MenubarSeparator />
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
