"use client";
import React from "react";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AddProjectForms from "@/components/side-comp/add-project-forms";
import TopNav from "@/components/side-comp/topNav";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const AddProject = () => {

  const router = useRouter();

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="ml-0 lg:ml-64 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <ChevronLeft
            onClick={() => {
              router.back();
            }}
            className="w-5 h-5 cursor-pointer text-main"
          />
          <TopNav />
        </div>
        <div className=" flex justify-center w-full mt-5 md:mt-10">
          <div className="w-[90%]">
            <div className="flex items-center my-10 mx-20 relative ">
              <div className="bg-white shadow-md w-[72px] h-[36px] flex justify-center items-center p-2 absolute -top-10 -right-5 rounded-[8px]">
                <p className="text-main text-xs font-medium">Project</p>
              </div>
              <div className="w-[50px] h-[18px] md:h-[25px] block rounded-full bg-sub" />
              <div className="bg-sub w-full h-[4px]"></div>
              <div className="w-[50px] h-[18px] md:h-[25px] rounded-full bg-sub" />
              <div className="bg-sub w-full h-[4px]"></div>
              <div className="w-[50px] h-[18px] md:h-[25px] rounded-full bg-sub" />
            </div>
            <div className="rounded-[8px]  border-t-4 border-t-primary bg-white h-full p-2 md:p-6 w-[95%] ">
              <div>
                <div>
                  <AddProjectForms />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProject;
