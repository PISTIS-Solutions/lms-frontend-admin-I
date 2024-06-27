"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Loader2Icon, Search } from "lucide-react";
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

const StudentPage = () => {
  const { students, loading, fetchStudents, count } = useStudentsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedStudent, setExpandedStudent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const nextPage = async () => {
    const nextPageStudents = await fetchStudents(currentPage + 1);
    if (nextPageStudents?.length > 0) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // const handlePageClick = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };

  const readStudent = (id: any) => {
    router.push(`/students/${id}`);
  };

  const toggleStudentOptions = (index: any) => {
    setExpandedStudent(expandedStudent === index ? null : index);
  };

  const [loadingManage, setLoadingManage] = useState(false);

  const manageStudentSubscription = async (id: string, plan: string) => {
    try {
      setLoadingManage(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.patch(
        `${urls.manageStudentPlan}${id}/`,
        {
          plan: plan,
        },
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
        await manageStudentSubscription(id, plan);
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
      setLoadingManage(false);
    }
  };

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(
  //       <p
  //         key={i}
  //         onClick={() => handlePageClick(i)}
  //         className={
  //           i === currentPage
  //             ? "cursor-pointer font-semibold text-main"
  //             : "text-slate-400 cursor-pointer"
  //         }
  //       >
  //         {i}
  //       </p>
  //     );
  //   }
  //   return pageNumbers;
  // };

  const filteredStudents = students?.filter((student: any) =>
    student?.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStudents = () => {
    // const startIndex = (currentPage - 1) * students?.length;
    // const endIndex = Math.min(startIndex + students?.length, count);
    return (
      filteredStudents
        .filter((person: any) => person?.has_complete_onboarding)
        // .slice(startIndex, endIndex)
        .map((person: any) => (
          <React.Fragment key={person?.id}>
            <tr className="md:py-4 md:text-base text-xs py-2 px-3 md:px-0 ">
              <td
                className="cursor-pointer"
                onClick={() => {
                  readStudent(person?.id);
                }}
              >
                {person?.full_name}
              </td>
              <td>{person?.email}</td>
              <td>{person?.courses_completed}</td>
              <td>{person?.phone_number}</td>
              <td>{person?.plan}</td>
              <td
                onClick={() => toggleStudentOptions(person?.id)}
                className="md:py-4 md:text-base text-xs px-3 md:px-0 py-2 cursor-pointer text-[#00173A] underline"
              >
                Manage
              </td>
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
        ))
    );
  };

  return (
    <main>
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="py-5 px-2 md:px-7">
          <div className="relative w-full md:w-1/2">
            {/* Search input field */}
            <Input
              type="text"
              placeholder="Search student name"
              className="placeholder:text-[#A2A2A2] text-black text-sm italic rounded-[8px] border border-main"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-2 right-1" />
          </div>
          <div className="w-full shadow-md my-5 rounded-[8px] bg-white h-auto p-2">
            <h1 className="md:text-2xl text-lg font-medium">
              Students Database
            </h1>
            <div>
              <div className=" overflow-x-scroll md:overflow-x-auto relative">
                <ToastContainer />
                <table className="w-full mt-2 text-center ">
                  <thead className="text-main">
                    <tr className="bg-[#F8F9FF] py-2 w-full">
                      <th className="md:py-4 md:text-base px-5 text-xs py-2">
                        Full name
                      </th>
                      <th className="md:py-4 md:text-base px-5 text-xs py-2">
                        Email
                      </th>
                      <th className="md:py-4 md:text-base px-5 text-xs py-2">
                        Courses Completed
                      </th>
                      <th className="md:py-4 md:text-base px-5 text-xs py-2">
                        Phone Number
                      </th>
                      <th className="md:py-4 md:text-base px-5 text-xs py-2">
                        Plan
                      </th>
                      <th className="md:py-4 md:text-base px-5 text-xs py-2">
                        Access
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-4">
                          <span className="flex items-center justify-center">
                            <Loader2Icon className="animate-spin" />
                            <p>Loading</p>
                          </span>
                        </td>
                      </tr>
                    ) : filteredStudents && filteredStudents?.length > 0 ? (
                      renderStudents()
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-4">
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="flex items-center justify-end gap-5 mt-2">
                  <div>
                    <Button
                      className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
                      onClick={prevPage}
                      disabled={currentPage === 1}
                    >
                      <ArrowLeft />
                      Previous
                    </Button>
                  </div>
                  {/* <div className="flex space-x-4">{renderPageNumbers()}</div> */}
                  <div>
                    <Button
                      onClick={nextPage}
                      className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
                      disabled={students?.length < 10 || currentPage * 10 >= count}
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
