"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { BookOpenText, GraduationCap, ListChecks, Loader2 } from "lucide-react";
import PaginatedTable from "@/components/side-comp/pagination-table-students";
import PaginatedTableMentor from "@/components/side-comp/pagination-table mentor";
import { LineChart } from "@/components/side-comp/line-chart";
import axios from "axios";
import { urls } from "@/utils/config";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

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

interface AdminData {
  total_courses: number;
  total_students: number;
  total_mentors: number;
}

const Dashboard = () => {
  const [table, setTable] = useState("students");
  const changeTableMentors = () => {
    setTable("mentors");
  };
  const changeTableStudents = () => {
    setTable("students");
  };
  //get admin dashboard info
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  //fetch dashboard data with acceess token and use refresh token to refresh expired token
  const fetchAdminData = async () => {
    try {
      const adminAccessToken = Cookies.get("authToken");
      const response = await axios.get(urls.adminDashboard, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      setAdminData(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        try {
          const adminRefreshToken = Cookies.get("adminRefreshToken");
          const adminAccessToken = Cookies.get("authToken");
          const refreshResponse = await axios.post(urls.adminRefreshToken, {
            refresh: adminRefreshToken,
            access: adminAccessToken,
          });
          Cookies.set("authToken", refreshResponse.data.access);
          // Retry the fetch after token refresh
          console.log(Cookies.get("authToken"), "auth T");
          await fetchAdminData();
        } catch (refreshError: any) {
          console.error("Error refreshing token:", refreshError.message);
        }
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchAdminData();
  }, []);

  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <h1 className="md:text-2xl text-lg font-medium">
            Hello,
            {/* {localStorage.getItem("userName") || "Guest"} */}
            {Cookies.get("userName")}
            {/* work on adding the user's name */}
          </h1>
          <div className="flex items-center gap-1 md:gap-2">
            <Avatar>
              {/* <AvatarImage src={avatar} /> */}
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="md:text-base text-sm font-medium">
                Hello,
                {/* {localStorage.getItem("userName")} */}
                {/* work on adding the user's name */}
              </h1>
              <p className="md:text-sm text-xs text-[#5D5B5B]">Admin</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-10 p-4">
            <div className=" col-span-1 lg:col-span-7">
              <div className="flex gap-x-4 overflow-x-scroll justify-between pr-4">
                <div className="lg:w-[209px] w-full h-[128px] rounded-[8px] border-t-4 bg-white border-t-sub flex items-center justify-between px-5">
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      adminData && (
                        <h1 className="text-2xl text-[#5D5B5B] font-medium">
                          {adminData.total_courses}
                        </h1>
                      )
                    )}
                    <p className="md:text-base text-xs text-[#00173A]">Total Courses</p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <BookOpenText className="text-main" />
                  </span>
                </div>
                <div className=" lg:max-w-[209px] w-auto h-[128px] rounded-[8px] border-t-4 bg-white border-t-main flex items-center justify-between px-5">
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      adminData && (
                        <h1 className="text-2xl text-[#5D5B5B] font-medium">
                          {adminData.total_students}
                        </h1>
                      )
                    )}
                    <p className="md:text-base text-xs text-[#00173A]">Total Students</p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <GraduationCap className="text-main" />
                  </span>
                </div>
                <div className="lg:w-[209px] w-full h-[128px] rounded-[8px] border-t-4 bg-white border-t-[#CC3366] flex items-center justify-between px-5">
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      adminData && (
                        <h1 className="text-2xl text-[#5D5B5B] font-medium">
                          {adminData.total_mentors}
                        </h1>
                      )
                    )}
                    <p className="md:text-base text-xs text-[#00173A]">Total Mentors</p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <ListChecks className="text-main" />
                  </span>
                </div>
              </div>
              <div className="p-2">
                <div className="flex justify-between items-center">
                  <h1 className="pl-4 text-xs md:text-xl font-semibold">
                    Enrollment activity{" "}
                  </h1>
                  <select className="border border-main rounded-[8px]" name="months" id="months">
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month || "Select Month"}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                <LineChart />
              </div>
            </div>
            <div className="bg-white h-[370px] md:h-[500px] rounded-[8px] p-2 shadow-sm col-span-3">
              <h1 className="md:text-2xl text-lg font-medium mb-4">
                Pending Grading
              </h1>
              <div>
                <ScrollArea className="w-full h-[300px] md:h-[400px] rounded-md">
                  <div>
                    {tags.map((tag, index) => (
                      <>
                        <div
                          key={index}
                          className="flex items-center gap-3 md:gap-4 py-2 md:py-3 px-1 md:px-2 cursor-pointer hover:bg-main hover:text-white duration-150 ease-in-out bg-[#FBFBFB] my-2 rounded-[8px]"
                        >
                          <Avatar className="md:w-[61px] w-[40px] md:h-[61px] h-[40px] hover:text-black">
                            {/* <AvatarImage src={avatar} /> */}
                            <AvatarFallback>JN</AvatarFallback>
                          </Avatar>
                          <p className="md:text-lg text-sm">{tag}</p>
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
