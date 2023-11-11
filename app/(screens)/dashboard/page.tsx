"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useState } from "react";

import avatar from "@/public/assets/ava.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { BookOpenText, GraduationCap, ListChecks } from "lucide-react";
import PaginatedTable from "@/components/side-comp/pagination-table-students";
import PaginatedTableMentor from "@/components/side-comp/pagination-table mentor";

const tags = [
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
  "Project submission by Femi Oyewale",
];

const Dashboard = () => {
  const [table, setTable] = useState("students");

  const changeTableMentors = () => {
    setTable("mentors");
  };
  const changeTableStudents = () => {
    setTable("students");
  };

  return (
    <main className="relative  h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="ml-64 overflow-y-scroll h-screen">
        <div className="h-[96px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <h1 className="text-2xl font-medium">Hello, John</h1>
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
        <div className="">
          <div className="grid grid-cols-10 p-4">
            <div className=" col-span-7">
              <div className="flex justify-between pr-4">
                <div className="w-[209px] h-[128px] rounded-[8px] border-t-4 bg-white border-t-sub flex items-center justify-between px-5">
                  <div>
                    <h1 className="text-2xl text-[#5D5B5B] font-medium">15</h1>
                    <p className="text-base text-[#00173A]">Total Courses</p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <BookOpenText className="text-main" />
                  </span>
                </div>
                <div className="w-[209px] h-[128px] rounded-[8px] border-t-4 bg-white border-t-main flex items-center justify-between px-5">
                  <div>
                    <h1 className="text-2xl text-[#5D5B5B] font-medium">60</h1>
                    <p className="text-base text-[#00173A]">Total Students</p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <GraduationCap className="text-main" />
                  </span>
                </div>
                <div className="w-[209px] h-[128px] rounded-[8px] border-t-4 bg-white border-t-[#CC3366] flex items-center justify-between px-5">
                  <div>
                    <h1 className="text-2xl text-[#5D5B5B] font-medium">6</h1>
                    <p className="text-base text-[#00173A]">Total Mentors</p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <ListChecks className="text-main" />
                  </span>
                </div>
              </div>
              <div className="p-2">{/* chart */}</div>
            </div>
            <div className="bg-white rounded-[8px] p-2 shadow-sm col-span-3">
              <h1 className="text-2xl font-medium mb-4">Pending Grading</h1>
              <div>
                <ScrollArea className="w-full h-[400px] rounded-md">
                  <div>
                    {tags.map((tag, index) => (
                      <>
                        <div
                          key={index}
                          className="flex items-center gap-4 py-3 px-2 cursor-pointer hover:bg-main hover:text-white duration-150 ease-in-out bg-[#FBFBFB] my-2 rounded-[8px]"
                        >
                          <Avatar className="w-[61px] h-[61px] hover:text-black">
                            {/* <AvatarImage src={avatar} /> */}
                            <AvatarFallback>JN</AvatarFallback>
                          </Avatar>
                          <p className="text-lg">{tag}</p>
                        </div>
                      </>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          <div className="p-4">
            {table === "students" ? (
              <PaginatedTable
                handleStudent={changeTableStudents}
                handleMentors={changeTableMentors}
              />
            ) : (
              <PaginatedTableMentor
                handleStudent={changeTableStudents}
                handleMentors={changeTableMentors}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
