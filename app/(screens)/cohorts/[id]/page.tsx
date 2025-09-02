"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SideNav from "@/components/side-comp/side-nav";
import { FaClock } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { Loader, Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useReadCohort from "@/store/readCohort";
import useStudentStore from "@/store/fetch-student";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { BiSolidPieChartAlt, BiWindowClose } from "react-icons/bi";
import { LuFilePlus2 } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { urls } from "@/utils/config";
// import axios from "axios";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";
import EditCohorts from "@/components/side-comp/cohorts/EditCohorts";
import { createAxiosInstance } from "@/lib/axios";

const filterData = ["Pending", "Reviewed", "Submitted", "Rejected"];

const ReadCohort = () => {
  const { cohortData, loading, fetchCohortData } = useReadCohort();
  const { studentData, fetchStudentData } = useStudentStore();
  const router = useRouter();

  const params = useParams<{ id: string }>();
  const axios = createAxiosInstance();
  const id = params.id;

  const [fetching, setFetching] = useState(false);
  const [cohortStu, setCohortstu] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const FetchStudents = async (id: string, searchQuery: string) => {
    try {
      setFetching(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(
        `${urls.cohorts}${id}/students/?search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Students fetched Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        setCohortstu(response?.data);
      }
    } catch (error: any) {
      setFetching(false);
     if (error.message === "Network Error") {
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
      setFetching(false);
    }
  };

  const [exporting, setExporting] = useState(false);

  const ExportStudent = async (id: string) => {
    try {
      setExporting(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(
        `${urls.cohorts}${id}/export-students/`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (response.status === 200) {
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
      setExporting(false);
      if (error.message === "Network Error") {
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
      setExporting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchCohortData(id);
    fetchStudentData();
    FetchStudents(id, searchQuery);
  }, [id, searchQuery]);

  const userName = studentData?.full_name;
  const initials = userName ? userName.charAt(0).toUpperCase() : "";

  const [open, setOpen] = useState(false);

  const [deleting, setDeleting] = useState(false);
  const deleteCohort = async (id: string) => {
    try {
      setDeleting(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.delete(`${urls.cohorts}${id}/`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      if (response.status === 204) {
        toast.success("Deleted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
      router.back();
    } catch (error: any) {
      setDeleting(false);
      if (error.message === "Network Error") {
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
      setDeleting(false);
    }
  };

  const [editModal, setEditModal] = useState(false);

  return (
    <main className="relative">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="flex items-center justify-between p-2">
          <h1
            onClick={() => router.back()}
            className="text-[#666666] cursor-pointer flex items-center gap-2 text-xs sm:text-2xl md:text-3xl font-medium"
          >
            <FaAngleLeft className="w-6 h-6" />
            Live Sessions / {cohortData?.tag}
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex flex-row-reverse sm:flex-row items-center gap-2">
              <Avatar>
                <AvatarImage
                  className=" object-cover"
                  src={studentData?.profile_photo}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                {loading ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <div onClick={() => router.push("/settings")}>
                    <h1 className="text-sm text-right sm:text-left sm:text-base text-main font-semibold">
                      {userName}
                    </h1>
                    <p className="text-[#666666] font-normal text-xs">
                      {studentData?.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="w-[100%] flex items-center justify-center h-screen">
            <Loader2 className=" w-8 h-8 animate-spin" />
            <p>Loading Cohort Information</p>
          </div>
        ) : (
          <div className="w-[95%] mx-auto shadow-[0_0_20px_0_rgba(0,0,0,0.1)] relative bg-white rounded-[10px] my-3 p-4">
            <div className="absolute top-2 right-2 p-2 rounded-[4px] shadow-md bg-white">
              {open ? (
                <IoIosClose
                  className="cursor-pointer mx-auto text-red-500 w-6 h-6 "
                  onClick={() => setOpen(false)}
                />
              ) : (
                <HiDotsHorizontal
                  className="cursor-pointer"
                  onClick={() => setOpen(true)}
                />
              )}
              <hr />
              {open && (
                <div className="flex flex-col gap-2">
                  <p
                    onClick={() => setEditModal(true)}
                    className="cursor-pointer p-1 w-full hover:bg-gray-200"
                  >
                    Edit Cohort
                  </p>
                  <p
                    onClick={() => deleteCohort(cohortData?.id)}
                    className="cursor-pointer p-1 w-full hover:bg-gray-200"
                  >
                    {deleting ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Delete Cohort"
                    )}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-main text-center font-semibold text-xl sm:text-2xl my-2">
                {cohortData?.tag}
              </h1>
              <p className="text-[#828282] font-normal text-sm text-center py-2">
                {cohortData?.description}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
              <div className="text-[#484848] whitespace-nowrap text-sm font-normal flex-wrap justify-center sm:justify-normal flex items-center gap-3">
                {cohortData?.start_date} <FaLongArrowAltRight />{" "}
                {cohortData?.end_date}{" "}
                <span className="flex items-center text-[#FF7F11] gap-3">
                  {" "}
                  <FaClock /> {cohortData?.duration}
                </span>
              </div>
              <div className=" flex flex-wrap whitespace-nowrap justify-center sm:justify-normal items-center gap-3">
                <span>
                  {cohortData?.registration_status?.toLowerCase() === "open" ? (
                    <span className="inline-flex items-center sm:text-basse text-sm text-[#2FBC8D] gap-1 px-4 bg-[#DEF7EF] rounded-[14px] py-1">
                      <LuFilePlus2 />
                      <p>Opened</p>
                    </span>
                  ) : (
                    <span className="inline-flex items-center sm:text-basse text-sm gap-1 px-4 text-[#FF7F11] bg-[#FFF0F4] rounded-[14px] py-1">
                      <BiWindowClose />
                      <p>Closed</p>
                    </span>
                  )}
                </span>
                <span className="inline-flex bg-[#C2E8FF] sm:text-basse text-sm items-center gap-1 px-4 text-[#0172B5] rounded-[14px] py-1">
                  <LuFilePlus2 />
                  <p>{cohortData?.num_students} Registered Students</p>
                </span>
                <span>
                  {cohortData?.status?.toLowerCase() === "active" ? (
                    <span className="inline-flex items-center sm:text-basse text-sm text-[#2FBC8D] gap-1 px-4 py-1">
                      <TbDotsCircleHorizontal />
                      <p>In Progress</p>
                    </span>
                  ) : (
                    <span className="inline-flex items-center sm:text-basse text-sm gap-1 px-4  text-[#FF7F11] py-1">
                      <BiSolidPieChartAlt />
                      <p>Not Started</p>
                    </span>
                  )}
                </span>
              </div>
            </div>
            <hr className="my-5" />
            <div>
              <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
                <div className="relative sm:w-1/2 w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search by first name, last name or email"
                    className=" rounded-[6px] indent-4 bg-slate-50 placeholder:text-[#9F9F9F] text-[#9F9F9F] text-sm font-normal p-[10px_12px] border-[#9F9F9F] w-full"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <IoIosSearch className="text-[#9F9F9F] absolute top-3 left-2 h-[20px] w-[20px]" />
                </div>
                <button
                  disabled={exporting}
                  onClick={() => ExportStudent(cohortData?.id)}
                  className="bg-white border border-[#2FBC8D] rounded-[8px] p-2 text-sm"
                >
                  {exporting ? (
                    <span className="flex text-xs items-center gap-1 justify-center">
                      Exporting... <Loader2 className="animate-spin" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[#2FBC8D]">
                      Export List
                      <BsDownload className="text-[#2FBC8D]" />
                    </span>
                  )}
                </button>
              </div>
              <div className="my-5 w-full overflow-x-scroll">
                <table className="min-w-full  table-auto">
                  <thead className="bg-[#E6F6FF]">
                    <tr className="rounded-[6px]">
                      <th className="text-[#00173A] whitespace-nowrap font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                        Name
                      </th>
                      <th className="text-[#00173A] whitespace-nowrap font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                        Email Address
                      </th>
                      <th className="text-[#00173A] whitespace-nowrap font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                        Phone Number
                      </th>

                      <th className="text-[#00173A] whitespace-nowrap font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]"></th>
                    </tr>
                  </thead>
                  <tbody className="relative">
                    {fetching ? (
                      <tr>
                        <td colSpan={5} className="py-4">
                          <Skeleton className="h-4 w-full" />
                          <p className="text-center">Loading</p>
                        </td>
                      </tr>
                    ) : cohortStu && cohortStu.length > 0 ? (
                      <>
                        {cohortStu?.map((person: any) => (
                          <tr
                            // onClick={() => router.push(`/cohorts/${person.id}`)}
                            className="cursor-pointer hover:bg-slate-100"
                            key={person.id}
                          >
                            <td className="p-[6px_12px] whitespace-nowrap capitalize md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                              {person?.fullname}
                            </td>
                            <td className="p-[6px_12px] whitespace-nowrap md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                              {person.email}
                            </td>
                            <td className="p-[6px_12px] whitespace-nowrap md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                              {person.phone_number}
                            </td>
                            {/* <td>
                              <HiDotsHorizontal className="w-6 h-6 text-[#666666] cursor-pointer" />
                            </td> */}
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-4 text-center">
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      {editModal && cohortData && (
        <div className="w-full flex items-center justify-center h-screen absolute top-0 bg-[225_225_225_0.1] backdrop-blur">
          <EditCohorts
            fetchCohortData={fetchCohortData}
            setEditModal={setEditModal}
            cohortData={cohortData}
          />
        </div>
      )}
    </main>
  );
};

export default ReadCohort;
