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
import usePendingGradeStore from "@/store/project-review";

const Student = () => {
  const { studentData, loading, fetchStudentInfo } = useStudentInfoStore();
  const { projectReview, reviewLoad, fetchProjectReview } =
    usePendingGradeStore();
  const params = useParams<{ student: string }>();

  const id = params.student;

  useEffect(() => {
    fetchStudentInfo(id);
    fetchProjectReview(id);
  }, []);

  // console.log(studentData,"sd")

  return (
    <main className="relative">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
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
                    width={100}
                    height={100}
                    src={studentData?.profile_photo}
                    alt={studentData?.full_name}
                    className=" w-32 h-32 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="lg:text-lg text-base font-medium text-500">
                      {studentData?.full_name}
                    </h3>
                    <p className="lg:text-sm text-xs font-normal text-[#3E3E3E]">
                      Name
                    </p>
                  </div>
                </div>
                <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
                <div>
                  <h3 className="lg:text-lg text-base font-medium">
                    {studentData?.email}
                  </h3>
                  <p className="text-sm lg:text-sm font-normal text-[#3E3E3E]">
                    Email address
                  </p>
                </div>
                <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
                <div>
                  <h3 className="text-base lg:text-lg font-medium">
                    {studentData?.phone_number}
                  </h3>
                  <p className="text-sm lg:text-sm font-normal text-[#3E3E3E]">
                    Phone number
                  </p>
                </div>
                <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
                <div>
                  <h3 className="text-base lg:text-lg font-medium">
                    {studentData?.location}
                  </h3>
                  <p className="text-sm, lg:text-sm font-normal text-[#3E3E3E]">
                    Location
                  </p>
                </div>
              </div>
              <div className=" text-[#939393] text-xs md:text-lg text-right pr-2">
                <p>Time left: {studentData?.time_left?.time_left}</p>
                <p>Last login: {studentData?.last_login}</p>
                <p>Status: {studentData?.plan}</p>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-[8px] mx-2 md:mx-4 my-4 p-2">
                <h1 className="text-2xl font-medium my-4">Project Review</h1>
                <ProjectReview
                  reviewLoad={reviewLoad}
                  projectReview={projectReview}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Student;
