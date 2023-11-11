import React from "react";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AddCourseForms from "@/components/side-comp/add-course-forms";

const AddCourse = () => {
  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="ml-64 overflow-y-scroll h-screen">
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
        <div className=" flex justify-center w-full mt-10">
          <div className="rounded-[8px] bg-white h-full p-6 w-[90%] ">
            <div>
              <div>
                <AddCourseForms />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddCourse;
