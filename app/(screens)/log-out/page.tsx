"use client"
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

import sad from "@/public/assets/sad.png";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogOut = () => {

  const router = useRouter();
  const onlogOut = () => {
    Cookies.remove("authToken");
    console.log(Cookies.get("authToken"))
    router.replace("/");
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <div className="flex items-center gap-1 md:gap-2">
            <Avatar>
              {/* <AvatarImage src={avatar} /> */}
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="md:text-base text-sm font-medium">John Mark</h1>
              <p className="md:text-sm text-xs text-[#5D5B5B]">Admin</p>
            </div>
          </div>
        </div>
        <div className="h-screen flex justify-center items-center ">
          <div className="lg:w-1/3 w-1/2 flex justify-center flex-col gap-y-5 p-4 items-center h-auto bg-white shadow-md rounded-[8px]">
            <Image src={sad} alt="don't log out" />
            <p className="text-sm lg:text-xl text-center">
              It’s sad to see you go <br /> Are you sure about this?
            </p>
            <Button onClick={onlogOut} className="bg-sub rounded-[8px] py-4 px-6 w-full lg:w-1/2 text-xl hover:bg-main hover:text-white">
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogOut;
