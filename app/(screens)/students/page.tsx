"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Loader2Icon,
  Search,
} from "lucide-react";
import useStudentsStore from "@/store/fetch-students";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNav from "@/components/side-comp/side-nav";
import TopNav from "@/components/side-comp/topNav";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";
import { urls } from "@/utils/config";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BsDownload } from "react-icons/bs";

const StudentPage = () => {
  const { students, loading, fetchStudents, previous, next } =
    useStudentsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedOnboardingValue, setSelectedOnboardingValue] = useState("");
  const [ordering, setOrdering] = useState("");
  const router = useRouter();
  // console.log(students);
  // const handleChange = (value: string) => {
  //   setSelectedValue(value);
  //   console.log(`Selected Value: ${value}`); // Debugging
  // };

  useEffect(() => {
    fetchStudents(
      currentPage,
      searchQuery,
      selectedValue,
      ordering,
      selectedOnboardingValue
    );
  }, [
    currentPage,
    searchQuery,
    selectedValue,
    ordering,
    selectedOnboardingValue,
  ]);

  const nextPage = async () => {
    if (next !== null) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const prevPage = () => {
    if (previous !== null) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const readStudent = (id: any) => {
    router.push(`/students/${id}`);
  };
  const toggleStudentOptions = (index: any) => {
    setExpandedStudent(expandedStudent === index ? null : index);
  };

  const [loadingManage, setLoadingManage] = useState(false);

  const manageStudentSubscription = async (id: any, status: any) => {
    try {
      setLoadingManage(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.patch(
        `${urls.manageStudentStatus}${id}/`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setLoadingManage(false);
        toast.success("Plan Updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        fetchStudents(currentPage);
        setExpandedStudent(null);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await manageStudentSubscription(id, status);
      } else if (error.message === "Network Error") {
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
        toast.error(error.response?.data?.detail, {
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
      setLoadingManage(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("admin_role");
    setRole(userRole);
  }, []);

  //date and time format funct
  const renderStudents = () => {
    function formatDateTime(dateTimeString: any) {
      const date = new Date(dateTimeString);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return {
        date: `${day}/${month}/${year}`,
        time: `${hours}:${minutes}`,
      };
    }
    // console.log(students);

    return students.map((person) => (
      <React.Fragment key={person?.id}>
        <tr className=" md:text-base text-xs px-3 md:px-0">
          <td
            className="cursor-pointer font-semibold text-main py-2 md:py-4 text-left  px-5"
            onClick={() => {
              readStudent(person?.id);
            }}
          >
            {person?.full_name}
          </td>
          <td className="py-2 md:py-4 text-left">{person?.email}</td>
          <td className="py-2 md:py-4">{person?.courses_completed}</td>
          <td className="py-2 md:py-4 text-center">{person?.phone_number}</td>
          <td className="py-2 md:py-4">{person?.status}</td>
          <td className="py-2 md:py-4">
            {person?.is_active ? "Completed" : "Pending"}
          </td>
          <td className="py-2 md:py-4">
            {formatDateTime(person?.date_joined).date}
          </td>
          <td className="py-2 md:py-4">
            {formatDateTime(person?.date_joined).time}
          </td>
          {(role === "advanced" || role === "super_admin") && (
            <td
              onClick={() => toggleStudentOptions(person?.id)}
              className="md:py-4 md:text-base text-xs px-3 md:px-0 py-2 cursor-pointer text-[#00173A] underline"
            >
              Manage
            </td>
          )}
        </tr>
        {expandedStudent === person.id && (
          <div
            className="bg-[#ffff] z-10 p-2 w-26 md:w-42 rounded-[8px] shadow-md absolute right-0"
            key={`${person.id}`}
          >
            <h1 className="md:text-xl text-sm font-medium text-center pb-2">
              Manage Access
            </h1>
            <hr />
            {!loadingManage ? (
              <div>
                <p
                  onClick={() => {
                    manageStudentSubscription(person.id, "Paid");
                  }}
                  className="md:text-lg text-xs py-1 text-left cursor-pointer"
                >
                  Paid
                </p>
                <p
                  onClick={() => {
                    manageStudentSubscription(person.id, "Free");
                  }}
                  className="md:text-lg text-xs py-1 text-left cursor-pointer"
                >
                  Free
                </p>
                <p
                  onClick={() => {
                    manageStudentSubscription(person.id, "Blocked");
                  }}
                  className="md:text-lg text-xs py-1 text-left cursor-pointer"
                >
                  Revoke
                </p>
              </div>
            ) : (
              <Loader2Icon className="animate-spin text-main" />
            )}
          </div>
        )}
      </React.Fragment>
    ));
  };
  const [stuLoading, setStuLoading] = useState(false);
  const exportStudentsList = async () => {
    try {
      setStuLoading(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(`${urls.exportStudents}`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
        responseType: "blob",
      });

      if (response.status === 200) {
        console.log(response, "res");

        const fileBlob = new Blob([response.data], {
          type: response.data.type,
        });
        const downloadUrl = URL.createObjectURL(fileBlob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        const fileName = response.headers["content-disposition"]
          ? response.headers["content-disposition"].split("filename=")[1]
          : "student_list.xlsx";

        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("Student List Downloaded!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await exportStudentsList();
      } else if (error.message === "Network Error") {
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
        toast.error(error.response?.data?.detail, {
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
      setStuLoading(false);
    }
  };

  return (
    <main>
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="py-5 px-2 md:px-7">
          <div className="flex flex-col gap-3 md:flex-row items-center justify-between">
            <div className="relative w-full md:w-1/2">
              {/* Search input field */}
              <Input
                type="text"
                placeholder="Search student name or email address"
                className="placeholder:text-[#A2A2A2] text-black text-xs md:text-sm italic rounded-[8px] border border-main"
                value={searchQuery}
                onChange={handleSearch}
                // onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute top-2 right-1" />
            </div>
            <button
              disabled={stuLoading}
              onClick={() => exportStudentsList()}
              className="bg-white border border-main rounded-[8px] p-2 text-xs"
            >
              {stuLoading ? (
                <span className="flex text-xs items-center gap-1 justify-center">
                  Exporting... <Loader2 className="animate-spin" />
                </span>
              ) : (
                <span className=" text-xs">
                  Export Students List
                  {/* <BsDownload className="text-main" /> */}
                </span>
              )}
            </button>
          </div>

          <div className="w-full shadow-md my-5 rounded-[8px] bg-white h-auto p-2">
            <div className="flex gap-2 justify-between items-center">
              <h1 className="md:text-2xl text-base font-medium">
                Students Database
              </h1>
              <div className="flex gap-x-3 items-center">
                <div className="h-fit">
                  <p className="text-gray-600 text-xs">
                    Filter by onboarding status
                  </p>
                  <select
                    name="onboarding-filter"
                    className="rounded-[8px] md:text-base text-xs"
                    id="onboarding-filter"
                    value={selectedOnboardingValue}
                    onChange={(e: any) => {
                      setSelectedOnboardingValue(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option className="md:text-base text-xs" value="">
                      Select status
                    </option>
                    <option className="md:text-base text-xs" value="false">
                      Pending
                    </option>
                    <option className="md:text-base text-xs" value="true">
                      Completed
                    </option>
                  </select>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Filter by plan</p>
                  <select
                    name="plan-filter"
                    className="rounded-[8px] md:text-base text-xs"
                    id="filter"
                    value={selectedValue}
                    onChange={(e: any) => {
                      setSelectedValue(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option className="md:text-base text-xs" value="">
                      Select plan
                    </option>
                    <option className="md:text-base text-xs" value="free">
                      Free
                    </option>
                    <option className="md:text-base text-xs" value="paid">
                      Paid
                    </option>
                    <option className="md:text-base text-xs" value="blocked">
                      Blocked
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div className=" overflow-x-scroll md:overflow-x-auto">
                <ToastContainer />
                <table className="w-full mt-2 text-center relative">
                  <thead className="text-main">
                    <tr className="bg-[#F8F9FF] py-2 w-full">
                      <th className="md:py-2 md:text-base px-5 text-xs py-2 text-left w-1/4 rounded-l-2xl">
                        Full name
                      </th>
                      <th className="md:py-2 md:text-base text-xs py-2 text-left">
                        Email
                      </th>
                      <th className="md:py-2 md:text-base text-xs py-2 text-center">
                        <p className="w-min mx-auto">Courses Completed</p>
                      </th>
                      <th className="md:py-2 md:text-base px-5 text-xs py-2 text-center">
                        Phone Number
                      </th>
                      <th className="md:py-2 md:text-base px-5 text-xs py-2 text-center">
                        Plan
                      </th>
                      <th className="md:py-2 md:text-base px-5 text-xs py-2 text-center">
                        Onboarding Status
                      </th>
                      <th className="md:py-2 md:text-base px-5 text-xs py-2 text-center">
                        Date
                      </th>
                      <th className="md:py-2 md:text-base px-5 text-xs py-2 ">
                        Time
                      </th>

                      <th className="md:py-2 md:text-base px-5 text-xs py-2 rounded-r-2xl">
                        Access
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="py-4">
                          <Skeleton />
                        </td>
                      </tr>
                    ) : students && students?.length > 0 ? (
                      renderStudents()
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-4">
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="flex items-center justify-end gap-1 mt-2">
                  <div>
                    <Button
                      className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent text-sm md:text-base hover:text-main"
                      onClick={prevPage}
                      disabled={previous === null}
                    >
                      <ArrowLeft />
                      Previous
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={nextPage}
                      className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent text-sm md:text-base hover:text-main"
                      disabled={next === null}
                    >
                      <ArrowRight />
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudentPage;
