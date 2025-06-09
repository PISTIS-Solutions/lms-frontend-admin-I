"use client";
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoDotFill, GoPlus } from "react-icons/go";
import { useOutsideClick } from "@/utils/outsideClick";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { BiSolidPieChartAlt } from "react-icons/bi";
import NewCohorts from "@/components/side-comp/cohorts/AddNewCohorts";
import useCohortStore from "@/store/fetch-cohorts";
import {
  ChevronLeft,
  ChevronRight,
  Loader,
  Loader2,
  Loader2Icon,
} from "lucide-react";
import { BiWindowClose } from "react-icons/bi";
import { LuFilePlus2 } from "react-icons/lu";
import useStudentStore from "@/store/fetch-student";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";

const Cohorts = () => {
  const { cohorts, loading, fetchCohorts, previous, next, count } =
    useCohortStore();
  const { studentData, fetchStudentData } = useStudentStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedStudent, setExpandedStudent] = useState(null);

  const [loadingManage, setLoadingManage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleStudentOptions = (index: any) => {
    setExpandedStudent(expandedStudent === index ? null : index);
  };

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchCohorts(currentPage, searchQuery);
    fetchStudentData();
  }, [currentPage, searchQuery]);

  const [createCohorts, setCreateCohorts] = useState(false);
  const handleAddCohorts = () => {
    setCreateCohorts((prev) => !prev);
  };

  const userName = studentData?.full_name;
  const initials = userName ? userName.charAt(0).toUpperCase() : "";

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return "N/A";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  // const readCohort = async () => {};

  const [deleting, setDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteCohort = async (id: string) => {
    try {
      setDeletingId(id); // Track the specific cohort being deleted
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
        fetchCohorts(currentPage, searchQuery);
      }
    } catch (error: any) {
      if (error?.response && error?.response.status === 401) {
        await refreshAdminToken();
        await deleteCohort(id);
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
        toast.error(error?.response?.data?.detail || "Error deleting cohort", {
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
      setDeletingId(null); // Reset deleting state
    }
  };

  return (
    <main>
      <SideNav />
      <ToastContainer />

      <div className="lg:ml-64 ml-0 overflow-y-scroll h-[100vh] sm:h-screen p-4 bg-slate-50">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-main text-lg sm:text-2xl md:text-3xl font-medium">
              Live Sessions
              <span className="font-medium text-base sm:text-xl md:text-2xl text-[#666666]">
                (
                {loading ? (
                  <Loader2 className="animate-spin inline-block" />
                ) : (
                  count
                )}
                )
              </span>
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
                    <div>
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
          <div className="sm:flex block items-center gap-x-4 justify-between py-6">
            <div className="relative sm:w-1/2 w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by session title"
                className=" rounded-[6px] indent-4 bg-slate-50 placeholder:text-[#9F9F9F] text-[#9F9F9F] text-sm font-normal p-[10px_12px] border-[#9F9F9F] w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
              <IoIosSearch className="text-[#9F9F9F] absolute top-3 left-2 h-[20px] w-[20px]" />
            </div>
            <button
              onClick={handleAddCohorts}
              className="flex items-center w-full justify-center sm:my-0 my-2 sm:justify-normal sm:w-auto gap-2 bg-sub rounded-[6px] py-2 px-4 text-white"
            >
              <GoPlus /> Create a new cohort
            </button>
          </div>
        </div>
        <div className="w-full shadow-[0_0_20px_0_rgba(0,0,0,0.1)] bg-white rounded-[10px] p-4">
          <div className="w-full overflow-x-scroll">
            <table className="min-w-full  table-auto">
              <thead className="bg-[#E6F6FF]">
                <tr className="rounded-[6px]">
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Title
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Start - End date
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Duration
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Cohort Status
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Registration Status
                  </th>
                  <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">{``}</th>
                </tr>
              </thead>
              <tbody className="relative">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-4">
                      <Skeleton className="h-4 w-full" />
                      <p className="text-center">Loading</p>
                    </td>
                  </tr>
                ) : cohorts && cohorts?.length > 0 ? (
                  <>
                    {cohorts.map((person: any, index) => (
                      <tr className="" key={index}>
                        <td
                          onClick={() => router.push(`/cohorts/${person.id}`)}
                          className="p-[6px_12px] cursor-pointer hover:bg-slate-100 capitalize md:p-[10px_16px] text-[#666666] font-medium text-xs whitespace-nowrap md:text-base"
                        >
                          {person?.tag}
                        </td>
                        <td className="p-[6px_12px] md:p-[10px_16px] text-[#666666] font-medium text-xs whitespace-nowrap md:text-base">
                          {person.start_date} - {person.end_date}
                        </td>
                        <td className="p-[6px_12px] md:p-[10px_16px] text-[#666666] font-medium text-xs whitespace-nowrap md:text-base">
                          {person.duration}
                        </td>
                        <td
                          className={`p-[6px_12px] md:p-[10px_16px] capitalize font-medium text-xs whitespace-nowrap md:text-base flex items-center gap-1 
                          ${
                            person?.status?.toLowerCase() === "active"
                              ? "text-[#2FBC8D]"
                              : "text-[#FF7F11]"
                          }`}
                        >
                          {person?.status?.toLowerCase() === "active" ? (
                            <span className="flex items-center gap-1">
                              <TbDotsCircleHorizontal />
                              <p>In Progress</p>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <BiSolidPieChartAlt />
                              <p>Not Started</p>
                            </span>
                          )}
                        </td>

                        <td
                          className={`p-[6px_12px] md:p-[10px_16px] capitalize font-medium text-xs whitespace-nowrap md:text-base 
                         ${
                           person?.registration_status?.toLowerCase() === "open"
                             ? "text-[#2FBC8D]"
                             : "text-[#FF1456]"
                         }`}
                        >
                          {person?.registration_status?.toLowerCase() ===
                          "open" ? (
                            <span className="inline-flex items-center gap-1 px-4 bg-[#DEF7EF] rounded-[14px] py-1">
                              <LuFilePlus2 />
                              <p>Opened</p>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-4 bg-[#FFF0F4] rounded-[14px] py-1">
                              <BiWindowClose />
                              <p>Closed</p>
                            </span>
                          )}{" "}
                          {person.num_students}
                        </td>
                        <td>
                          {deletingId === person.id ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <RiDeleteBin6Line
                              className="text-red-500 cursor-pointer"
                              onClick={() => deleteCohort(person.id)}
                            />
                          )}
                        </td>

                        {/* {expandedStudent === person.id && (
                          <div
                            className="bg-[#ffff] z-10 p-2 rounded-[8px] shadow-md absolute right-0"
                            key={`${person.id}`}
                          >
                           
                            {!loadingManage ? (
                              <div>
                                <p className="md:text-lg text-red-500 text-xs py-1 text-left cursor-pointer">
                                  Delete
                                </p>
                                <p className="md:text-lg text-xs py-1 text-left cursor-pointer">
                                  Edit
                                </p>
                              
                              </div>
                            ) : (
                              <Loader2Icon className="animate-spin text-main" />
                            )}
                          </div>
                        )} */}
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
            <div className="flex items-center justify-end gap-2 mt-2">
              <div>
                <button
                  className=" text-white disabled:text-white disabled:cursor-not-allowed cursor-pointer text-[14px] gap-1 hover:bg-transparent hover:text-main disabled:bg-[#D0D0D0] w-8 h-8 rounded-[4px] flex justify-center items-center"
                  onClick={prevPage}
                  disabled={previous === null}
                >
                  <ChevronLeft />
                </button>
              </div>
              <div>
                <button
                  onClick={nextPage}
                  className="text-white disabled:text-white disabled:cursor-not-allowed cursor-pointer text-[14px] gap-1 hover:bg-transparent hover:text-main disabled:bg-[#D0D0D0] w-8 h-8 rounded-[4px] flex justify-center items-center"
                  disabled={next === null}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {createCohorts && (
        <div className="w-full flex items-center justify-center h-screen absolute top-0 bg-[225_225_225_0.1] backdrop-blur">
          <NewCohorts handleAddCohorts={handleAddCohorts} />
        </div>
      )}
    </main>
  );
};

export default Cohorts;
