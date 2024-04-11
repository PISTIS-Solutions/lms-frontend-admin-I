"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SideNav from "@/components/side-comp/side-nav";
import Image from "next/image";
import student from "@/public/assets/testImg.png";
import ProjectReview from "@/components/side-comp/project-review-table";
import TopNav from "@/components/side-comp/topNav";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import useStudentInfoStore from "@/store/read-student";
import useStudentsStore from "@/store/fetch-students";

const Student = () => {
  const { studentData, loading, fetchStudentInfo } = useStudentInfoStore();
  const params = useParams<{ student: string }>();

  const id = params.student;
  useEffect(() => {
    fetchStudentInfo(id);
  }, []);

  return (
    <main className="relative">
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
<<<<<<< HEAD
        <div>
          <div className="bg-slate-100">
            <div className="sm:flex block px-3 md:px-0 items-center justify-around py-4">
              <div className="flex items-center gap-x-4">
                <Image
                  src={student}
                  alt={studentData.name}
                  className="w-28 h-auto"
                />
=======
        {loading ? (
          <div className="w-[100%] flex items-center justify-center h-screen">
            <Loader2 className=" w-8 h-8 animate-spin" />
            <p>Loading Student Information</p>
          </div>
        ) : (
          <div>
            <div>
              <div className="sm:flex block px-3 md:px-0 items-center justify-around py-4">
                <div className="flex items-center gap-x-4">
                  <Image
                    src={student}
                    alt={studentData?.full_name}
                    className="w-28 h-auto"
                  />
                  <div>
                    <h3 className="lg:text-lg text-lg font-medium text-500">
                      {studentData?.full_name}
                    </h3>
                    <p className="lg:text-sm text-xs font-normal text-[#3E3E3E]">
                      Name
                    </p>
                  </div>
                </div>
                <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
>>>>>>> 46c932214acd50a689be1eb8879e169479a6e04b
                <div>
                  <h3 className="lg:text-lg text-lg font-medium">
                    {studentData?.email}
                  </h3>
                  <p className="text-sm lg:text-sm font-normal text-[#3E3E3E]">
                    Email address
                  </p>
                </div>
                <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
                <div>
                  <h3 className="text-lg lg:text-lg font-medium">
                    {studentData?.phone_number}
                  </h3>
                  <p className="text-sm lg:text-sm font-normal text-[#3E3E3E]">
                    Phone number
                  </p>
                </div>
                <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
                <div>
                  <h3 className="text-lg lg:text-lg font-medium">
                    {studentData?.location}
                  </h3>
                  <p className="text-sm, lg:text-sm font-normal text-[#3E3E3E]">
                    Location
                  </p>
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
        )}
      </div>
    </main>
  );
};

export default Student;
