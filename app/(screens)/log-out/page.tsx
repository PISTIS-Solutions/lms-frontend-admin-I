import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

import sad from "@/public/assets/sad.png";
import { Button } from "@/components/ui/button";

const LogOut = () => {
  return (
    <main>
      <SideNav />
      <div className="ml-64 bg-[#F8F9FF] overflow-y-scroll h-screen">
        <div className="h-[96px] flex justify-end bg-white shadow-md p-4 w-full">
          <div className="flex items-center gap-2">
            <Avatar>
              {/* <AvatarImage src={avatar} /> */}
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-base font-medium">John Mark</h1>
              <p className="text-sm text-[#5D5B5B]">Admin</p>
            </div>
          </div>
        </div>
        <div className="h-screen flex justify-center items-center ">
          <div className="w-1/3 flex justify-center flex-col gap-y-5 p-4 items-center h-auto bg-white shadow-md rounded-[8px]">
            <Image src={sad} alt="don't log out" />
            <p className="text-xl text-center">
              It’s sad to see you go <br /> Are you sure about this?
            </p>
            <Button className="bg-sub rounded-[8px] py-4 px-6 w-1/2 text-xl hover:bg-main hover:text-white">Confirm</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogOut;
