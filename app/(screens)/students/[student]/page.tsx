"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SideNav from "@/components/side-comp/side-nav";
import Image from "next/image";
import user from "@/src/assets/avatar.jpg";
import ProjectReview from "@/components/side-comp/project-review-table";
import TopNav from "@/components/side-comp/topNav";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import useStudentInfoStore from "@/store/read-student";
import useStudentsStore from "@/store/fetch-students";
import usePendingGradeStore from "@/store/project-review";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { format, formatDistanceToNowStrict, parseISO } from "date-fns";

const filterData = ["Pending", "Reviewed", "Submitted", "Rejected"];

const Student = () => {
  const { studentData, loading, fetchStudentInfo } = useStudentInfoStore();
  const { projectReview, reviewLoad, fetchProjectReview } =
    usePendingGradeStore();
  const params = useParams<{ student: string }>();
  const [selectedValue, setSelectedValue] = useState("");

  const [timeLeftString, setTimeLeftString] = useState("");
  const [lastLoginString, setLastLoginString] = useState("");

  const id = params.student;

  useEffect(() => {
    fetchStudentInfo(id);
  }, [id]);

  useEffect(() => {
    fetchProjectReview(id, selectedValue);
  }, [id, selectedValue]);

  useEffect(() => {
    if (studentData?.time_left) {
      const endDate = new Date(studentData.time_left);
      const now = new Date();
      const diffTime = endDate.getTime() - now.getTime();

      if (diffTime > 0) {
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const remainingDays = days % 30;
        setTimeLeftString(`${months} month(s), ${remainingDays} day(s)`);
      } else {
        setTimeLeftString("Expired");
      }
    }

    if (studentData?.last_login) {
      const loginDate = new Date(studentData.last_login);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      const formatted = loginDate.toLocaleString("en-US", options);
      setLastLoginString(formatted);
    }
  }, [studentData]);

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
                    src={studentData?.profile_photo || user}
                    alt={studentData?.full_name}
                    className=" w-32 h-32 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="lg:text-lg text-base font-medium text-500">
                      {studentData?.first_name ? (
                        studentData?.first_name + " " + studentData?.last_name
                      ) : (
                        <Skeleton />
                      )}
                    </h3>
                    <p className="lg:text-sm text-xs font-normal text-[#3E3E3E]">
                      Name
                    </p>
                  </div>
                </div>
                <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
                <div>
                  <h3 className="lg:text-lg text-base font-medium">
                    {studentData?.email ? studentData?.email : <Skeleton />}
                  </h3>
                  <p className="text-sm lg:text-sm font-normal text-[#3E3E3E]">
                    Email address
                  </p>
                </div>
                <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
                <div>
                  <h3 className="text-base lg:text-lg font-medium">
                    {studentData?.phone_number ? (
                      studentData?.phone_number
                    ) : (
                      <Skeleton />
                    )}
                  </h3>
                  <p className="text-sm lg:text-sm font-normal text-[#3E3E3E]">
                    Phone number
                  </p>
                </div>
                <div className="bg-[#000066] hidden lg:block w-[2px] h-[71px]" />
                <div>
                  <h3 className="text-base lg:text-lg font-medium">
                    {studentData?.location ? (
                      studentData?.location
                    ) : (
                      <Skeleton />
                    )}
                  </h3>
                  <p className="text-sm, lg:text-sm font-normal text-[#3E3E3E]">
                    Location
                  </p>
                </div>
              </div>
              <div className=" text-[#939393] text-xs md:text-lg text-right pr-2">
                <p>Time left: {timeLeftString}</p>
                <p>Last login: {lastLoginString}</p>
                <p>Status: {studentData?.status}</p>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-[8px] mx-2 md:mx-4 my-4 p-2">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg md:text-2xl font-medium my-4">
                    Project Review
                  </h1>

                  <div>
                    <p className="text-gray-600 text-xs">Filter by status</p>
                    <select
                      name="plan-filter"
                      className="rounded-[8px] md:text-base text-xs"
                      id="filter"
                      value={selectedValue}
                      onChange={(e: any) => setSelectedValue(e.target.value)}
                    >
                      <option className="md:text-base text-xs" value="">
                        Select status
                      </option>
                      {filterData.map((itm) => (
                        <option
                          className="md:text-base text-xs"
                          value={itm}
                          key={itm}
                        >
                          {itm}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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
