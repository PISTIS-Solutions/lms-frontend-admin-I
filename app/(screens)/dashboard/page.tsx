"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useEffect, useState } from "react";
import PaginatedTable from "@/components/side-comp/pagination-table-students";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import TopNav from "@/components/side-comp/topNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import Link from "next/link";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { showToast } from "@/lib/showToast";
import DashCards from "@/components/side-comp/dashboard/dashCards";
import EnrollmentActivity from "@/components/side-comp/dashboard/enrollmentActivity";
import PendingGrading from "@/components/side-comp/dashboard/pendingGrading";

interface AdminData {
  total_courses: number;
  total_students: number;
  total_mentors: number;
}

interface StudentPerMonth {
  month: string;
  count: number;
}

const Dashboard = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentPerMonth, setStudentPerMonth] = useState<StudentPerMonth[]>([]);

  const getMonthName = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    return date.toLocaleDateString("en-US", options);
  };
  const updateMonthNames = (data: StudentPerMonth[]): StudentPerMonth[] => {
    return data.map((student) => ({
      ...student,
      month: getMonthName(student.month),
    }));
  };


const [list, setList] = useState([]);
  const fetchAdminData = async () => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(urls.adminDashboard, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      console.log(response?.data?.students)
      if (response.status === 200) {
        const formattedData = updateMonthNames(
          response.data.students_per_month
        );
        setAdminData(response.data);
        setStudentPerMonth(formattedData);
        setList(response?.data?.students)
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchAdminData();
      } else if (error?.message === "Network Error") {
        showToast("Check your network!", "error");
      } else {
        showToast(error?.response?.data?.detail, "error");
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
      console.log(response, "pending grading")
      setProjectOverview(response.data);
      setOverviewLoad(false);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchProjectOverview();
      } else if (error?.message === "Network Error") {
        showToast("Check your network!", "error");
      } else {
        showToast(error?.response?.data?.detail, "error");
      }
    } finally {
      setOverviewLoad(false);
    }
  };
  const chartConfig = {
    desktop: {
      label: "Enrollment activity ",
      color: "rgb(255, 99, 132)",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    fetchAdminData();
    fetchProjectOverview();
  }, []);

  const userName = Cookies.get("fullName");
  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[50px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <h1 className="sm:text-2xl text-xs md:text-lg font-medium">
            {`Hello, ${userName}`}
          </h1>
          <TopNav />
        </div>
        <ToastContainer />
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-10 p-4">
            <div className=" col-span-1 lg:col-span-6">
              <DashCards loading={loading} adminData={adminData} />
              <EnrollmentActivity
                chartConfig={chartConfig}
                studentPerMonth={studentPerMonth}
              />
            </div>
            <PendingGrading
              overviewLoad={overviewLoad}
              projectOverview={projectOverview}
            />
          </div>
          <div className="p-4">
            <PaginatedTable  />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
