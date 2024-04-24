"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useEffect, useState } from "react";
import { formatChartData } from "./helper";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  BookOpenText,
  GraduationCap,
  ListChecks,
  Loader2,
  Loader2Icon,
} from "lucide-react";
import PaginatedTable from "@/components/side-comp/pagination-table-students";
import { LineChart } from "@/components/side-comp/line-chart";
import axios from "axios";
import { urls } from "@/utils/config";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TopNav from "@/components/side-comp/topNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";

interface AdminData {
  total_courses: number;
  total_students: number;
  total_mentors: number;
}

interface ChartDetails {
  data: number[];
  labels: string[];
}

const Dashboard = () => {
  const [chartDetails, setChartDetails] = useState<ChartDetails>({
    data: [],
    labels: [],
  });
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  const route = useRouter();

  const fetchAdminData = async () => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(urls.adminDashboard, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      setAdminData(response.data);
      const formattedChartData = formatChartData(
        response.data.students_per_month
      );
      setChartDetails(formattedChartData);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchAdminData();
      } else if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const [projectOverview, setProjectOverview] = useState<any>();
  const [overviewLoad, setOverviewLoad] = useState<boolean>(false);
  const fetchProjectOverview = async () => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");
      setOverviewLoad(true);
      const response = await axios.get(urls.projectOverview, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      setProjectOverview(response.data);
      setOverviewLoad(false);
      console.log(response, "grado");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchProjectOverview();
      } else if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } finally {
      setOverviewLoad(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
    fetchProjectOverview();
  }, []);

  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // console.log(projectOverview, "PsO")

  const userName = Cookies.get("fullName");
  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <h1 className="sm:text-2xl text-xs md:text-lg font-medium">
            {`Hello, ${userName}`}
          </h1>
          <TopNav />
        </div>
        <ToastContainer />
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-10 p-4">
            <div className=" col-span-1 lg:col-span-7">
              <div className="flex gap-x-4 overflow-x-scroll justify-between pr-4">
                <div className=" lg:max-w-[209px] w-auto h-[128px] rounded-[8px] border-t-4 bg-white border-t-sub flex items-center justify-between px-5">
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      adminData && (
                        <h1 className="sm:text-2xl text-sm md:text-lg text-[#5D5B5B] font-medium">
                          {adminData.total_courses}
                        </h1>
                      )
                    )}
                    <p className="md:text-base text-xs text-[#00173A]">
                      Total Courses
                    </p>
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
                        <h1 className="sm:text-2xl text-sm md:text-lg text-[#5D5B5B] font-medium">
                          {adminData.total_students}
                        </h1>
                      )
                    )}
                    <p className="md:text-base text-xs text-[#00173A]">
                      Total Students
                    </p>
                  </div>
                  <span className="bg-[#F8F9FF] rounded-full p-3">
                    <GraduationCap className="text-main" />
                  </span>
                </div>
                <div className=" lg:max-w-[209px] w-auto h-[128px] rounded-[8px] border-t-4 bg-white border-t-[#CC3366] flex items-center justify-between px-5">
                  <div>
                    {loading ? (
                      <Loader2 className="animate-spin text-xl" />
                    ) : (
                      adminData && (
                        <h1 className="sm:text-2xl text-sm md:text-lg text-[#5D5B5B] font-medium">
                          {adminData.total_mentors}
                        </h1>
                      )
                    )}
                    <p className="md:text-base text-xs text-[#00173A]">
                      Total Mentors
                    </p>
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
                  {/* <select
                    className="border md:text-xl text-sm sm:text-lg border-main rounded-[8px]"
                    name="months"
                    id="months"
                  >
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month || "Select Month"}{" "}
                      </option>
                    ))}
                  </select> */}
                </div>
                <LineChart chartDetails={chartDetails} />
              </div>
            </div>
            <div className="bg-white h-[370px] md:h-[500px] rounded-[8px] p-2 shadow-sm col-span-3">
              <h1 className="md:text-2xl text-lg font-medium mb-4">
                Pending Grading
              </h1>
              <div>
                <ScrollArea className="w-full h-[300px] md:h-[400px] rounded-md">
                  <div>
                    {overviewLoad ? (
                      <span className="flex text-center justify-center items-center">
                        <Loader2Icon className="animate-spin" />
                        Loading...
                      </span>
                    ) : projectOverview && projectOverview.length > 0 ? (
                      projectOverview.map((project: any, index: any) => {
                        const userName = project?.student?.full_name;
                        const initials = userName
                          ? userName.charAt(0).toUpperCase()
                          : "";
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-3 md:gap-4 py-2 md:py-3 px-1 md:px-2 cursor-pointer hover:bg-main hover:text-white duration-150 ease-in-out bg-[#FBFBFB] my-2 rounded-[8px]"
                          >
                            <Avatar className="md:w-[61px] w-[40px] md:h-[61px] h-[40px] hover:text-black">
                              <AvatarImage src={project?.student?.profile_photo} />
                              <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <p className="md:text-lg text-sm">
                              Project {project?.project?.title} submitted by{" "}
                              {project?.student?.full_name}
                            </p>{" "}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center">No Pending Grading.</p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          <div className="p-4">
            <PaginatedTable />
            {/* {table === "students" ? (
              <PaginatedTable
                handleStudent={changeTableStudents}
                handleMentors={changeTableMentors}
              />
            ) : (
              <PaginatedTableMentor
                handleStudent={changeTableStudents}
                handleMentors={changeTableMentors}
              />
            )} */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
