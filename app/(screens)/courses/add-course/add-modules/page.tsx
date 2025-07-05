"use client";
import React from "react";

import SideNav from "@/components/side-comp/side-nav";
import AddModuleForms from "@/components/side-comp/add-module-forms";
import TopNav from "@/components/side-comp/topNav";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import VerticalStepper from "@/components/side-comp/courses/verticalSteps";

const AddModule = () => {
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
          <div className="w-[95%]">
            <div className="bg-white rounded-[10px] p-6 shadow-md">
              <div className="flex gap-10">
                <VerticalStepper
                  steps={[
                    {
                      label: "Course Overview",
                      path: "/courses/add-course",
                    },
                    {
                      label: "Curriculum",
                      path: "/courses/add-course/add-modules",
                    },
                    {
                      label: "Projects",
                      path: "/courses/add-course/add-modules/add-project",
                    },
                  ]}
                />
                <div className="w-full">
                  <AddModuleForms />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddModule;
