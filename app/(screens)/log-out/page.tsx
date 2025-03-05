"use client"
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

import sad from "@/src/assets/sad.png";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import TopNav from "@/components/side-comp/topNav";

const LogOut = () => {

  const router = useRouter();
  const onlogOut = () => {
    Cookies.remove("adminAccessToken");
    localStorage.removeItem("admin_role");
    router.replace("/");
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav/>
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
