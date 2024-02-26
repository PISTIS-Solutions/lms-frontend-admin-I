"use client";
import { useParams } from "next/navigation";
import React from "react";
import { data } from "@/app/data/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SideNav from "@/components/side-comp/side-nav";
import Image from "next/image";
import student from "@/public/assets/testImg.png";
import ProjectReview from "@/components/side-comp/project-review-table";

const Student = () => {
  const params = useParams<{ student: string }>();

  const studentData = data.find(
    (item) => item.id === parseInt(params.student, 10)
  );

  if (!studentData) {
    return (
      <div className="text-4xl text-red-500 text-center">
        Student not found.
      </div>
    );
  }

  return (
    <main className="relative">
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
        <div>
          <div className="bg-slate-100">
            <div className="sm:flex block px-3 md:px-0 items-center justify-around py-4">
              <div className="flex items-center gap-x-4">
                <Image
                  src={student}
                  alt={studentData.name}
                  className="w-28 h-auto"
                />
                <div>
                  <h3 className="lg:text-lg text-lg font-medium text-500">
                    {studentData.name}
                  </h3>
                  <p className="lg:text-sm text-xs font-normal text-[#3E3E3E]">Name</p>
                </div>
              </div>
              <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
              <div>
                <h3 className="lg:text-lg text-lg font-medium">{studentData.email}</h3>
                <p className="text-sm lg:text-sm font-normal text-[#3E3E3E]">Email address</p>
              </div>
              <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
              <div>
                <h3 className="text-lg lg:text-lg font-medium">
                  {studentData.phoneNumber}
                </h3>
                <p className="text-sm lg:text-sm font-normal text-[#3E3E3E]">Phone number</p>
              </div>
              <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
              <div>
                <h3 className="text-lg lg:text-lg font-medium">Lagos</h3>
                <p className="text-sm, lg:text-sm font-normal text-[#3E3E3E]">Location</p>
              </div>
            </div>
            <div className="flex justify-end gap-x-2 text-[#939393] text-xs md:text-lg pr-2">
              <p>Time left: 2 months</p>
              <p>Last login: 10:01, 08/09/2023</p>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-[8px] mx-2 md:mx-4 my-4 p-2">
              <h1 className="text-2xl font-medium my-4">Project Review</h1>
              <ProjectReview />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Student;
