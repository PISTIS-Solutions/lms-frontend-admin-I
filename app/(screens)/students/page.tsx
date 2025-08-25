"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Loader2Icon,
  Search,
} from "lucide-react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useStudentStore from "@/store/fetch-student";
import CouponModal from "@/components/side-comp/coupon/couponModal";
import { RiCoupon2Fill } from "react-icons/ri";

const StudentPage = () => {
  const { students, loading, fetchStudents, previous, next, count } =
    useStudentsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Free");
  // const [selectedOnboardingValue, setSelectedOnboardingValue] = useState("");
  // const [ordering, setOrdering] = useState("");
  const router = useRouter();
  // console.log(students);
  // const handleChange = (value: string) => {
  //   setSelectedValue(value);
  //   console.log(`Selected Value: ${value}`); // Debugging
  // };

  const [category, setCategory] = useState("");
  const [challenge, setChallenge] = useState(false);

  useEffect(() => {
    fetchStudents(currentPage, searchQuery, selectedValue, category, challenge);
  }, [currentPage, searchQuery, selectedValue, category, challenge]);

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

  const { studentData, fetchStudentData } = useStudentStore();

  const userName = studentData?.full_name;
  const initials = userName ? userName.charAt(0).toUpperCase() : "";

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("admin_role");
    setRole(userRole);
    fetchStudentData();
  }, []);

  const [coupon, setCoupon] = useState({
    list: false,
    create: false,
    selectedStudentId: "",
  });

  //date and time format funct
  const renderStudents = () => {
    // function formatDateTime(dateTimeString: string) {
    //   if (!dateTimeString) return { date: "N/A", time: "N/A" };

    //   const [timePart, datePart] = dateTimeString.split(", ");

    //   const [day, month, year] = datePart.split("/").map(Number);

    //   const [hours, minutes] = timePart.split(":").map(Number);

    //   const date = new Date(year, month - 1, day, hours, minutes);

    //   return {
    //     date: `${String(day).padStart(2, "0")}/${String(month).padStart(
    //       2,
    //       "0"
    //     )}/${year}`,
    //     time: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    //       2,
    //       "0"
    //     )}`,
    //   };
    // }

    // console.log(students);

    return students.map((person) => (
      <React.Fragment key={person?.id}>
        <tr className=" md:text-base text-xs px-3 md:px-0">
          <td
            className="cursor-pointer font-normal text-[#484848] py-2 md:py-4 text-left  px-5"
            onClick={() => {
              readStudent(person?.id);
            }}
          >
            {person?.first_name + " " + person?.last_name}
          </td>
          <td className="py-2 font-medium text-[#484848] md:py-4 text-left">
            {person?.email}
          </td>
          {/* <td className="py-2 md:py-4">{person?.courses_completed.length}</td> */}
          <td className="py-2 font-normal text-[#484848] md:py-4 text-center">
            {person?.phone_number}
          </td>
          <td
            className={`py-2 font-normal ${
              person?.subscription?.status === "Paid"
                ? "text-[#2FBC8D]"
                : "text-[#FF7F11]"
            } md:py-4`}
          >
            {person?.subscription?.status === "Paid" ? "Completed" : "-"}
          </td>
          {/* <td className="py-2 md:py-4">
            {person?.is_active ? "Completed" : "Pending"}
          </td>
          <td className="py-2 md:py-4">
            {formatDateTime(person?.date_joined).date}
          </td>*/}
          {/* <td className=" whitespace-nowrap text-xs my-4 ">
            <p
              onClick={() =>
                setCoupon({
                  list: false,
                  create: true,
                  selectedStudentId: person?.user_id,
                })
              }
              className="text-green-500 border p-2 rounded-sm cursor-pointer"
            >
              Create
            </p>{" "}
          </td> */}
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
      <ToastContainer />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="flex p-2 sm:p-4 items-center justify-between">
          <h1 className="text-main text-base sm:text-base md:text-3xl font-medium">
            Students
            <span className="font-medium text-base sm:text-base md:text-2xl text-[#666666]">
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
        <div className="px-4 flex sm:flex-row flex-col items-center gap-2">
          <p className="text-main font-normal text-xs sm:text-sm">
            Student Categories:
          </p>
          <div className="p-2 grid grid-cols-2 sm:grid-cols-4 items-center gap-4 rounded-[4px] border border-[#9F9F9F] bg-white">
            <span
              onClick={() => {
                setSelectedValue("Free");
                setCategory("");
                setCurrentPage(1);
              }}
              className={`${
                selectedValue === "Free"
                  ? "bg-main text-white"
                  : "text-[#9F9F9F]"
              } flex justify-center items-center px-2 py-1 cursor-pointer rounded-[4px]`}
            >
              <p className="font-medium text-sm ">Free</p>
            </span>
            <span
              onClick={() => {
                setCategory("Beginner");
                setSelectedValue("");
                setCurrentPage(1);
              }}
              className={`${
                category === "Beginner"
                  ? "bg-main text-white"
                  : "text-[#9F9F9F]"
              } flex justify-center items-center px-2 py-1  cursor-pointer rounded-[4px]`}
            >
              <p className="font-medium text-sm ">Beginner</p>
            </span>
            <span
              onClick={() => {
                setCategory("Intermediate");
                setCurrentPage(1);
                setSelectedValue("");
              }}
              className={`${
                category === "Intermediate"
                  ? "bg-main text-white"
                  : "text-[#9F9F9F]"
              } flex justify-center items-center px-2 py-1 cursor-pointer rounded-[4px]`}
            >
              <p className="font-medium text-sm ">Intermediate</p>
            </span>
            <span
              onClick={() => {
                setCategory("Advanced");
                setCurrentPage(1);
                setSelectedValue("");
              }}
              className={`${
                category === "Advanced"
                  ? "bg-main text-white"
                  : "text-[#9F9F9F]"
              } flex justify-center items-center px-2 py-1 cursor-pointer rounded-[4px]`}
            >
              <p className="font-medium text-sm ">Advanced</p>
            </span>
          </div>
        </div>
        <div className="py-5 px-2 md:px-7">
          <div className="flex flex-col gap-3 md:flex-row items-center justify-between"></div>

          <div className="w-full shadow-md my-5 rounded-[8px] bg-white h-auto p-2">
            <div className="flex sm:flex-row flex-col gap-1 justify-between items-center py-2.5">
              <div className="relative w-full sm:my-0 my-1.5">
                {/* Search input field */}
                <Input
                  type="text"
                  placeholder="Search for students"
                  className="placeholder:text-[#A2A2A2] text-black text-xs md:text-sm italic rounded-[8px] border border-[#9F9F9F]"
                  value={searchQuery}
                  onChange={handleSearch}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute top-2 right-1 text-[#9F9F9F]" />
              </div>
              <div className="flex sm:flex-row flex-col items-center gap-2">
                {/* <div className="flex items-center gap-1.5">
                  <p className="text-[#666666] whitespace-nowrap font-normal text-xs sm:text-sm">
                    Filter by:
                  </p>
                  <select
                    name="onboarding-filter"
                    className="rounded-[8px] border border-[#9F9F9F] text-[#9F9F9F] md:text-base text-xs"
                    id="onboarding-filter"
                    value={selectedValue}
                    onChange={(e: any) => {
                      setSelectedValue(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option className="md:text-base text-xs" value="">
                      Payment Status
                    </option>
                    <option className="md:text-base text-xs" value="Free">
                      Free
                    </option>
                    <option className="md:text-base text-xs" value="Paid">
                      Paid
                    </option>
                    <option className="md:text-base text-xs" value="Pending">
                      Pending
                    </option>
                    <option className="md:text-base text-xs" value="Blocked">
                      Blocked
                    </option>
                  </select>
                </div> */}
                <div className="flex items-center gap-1.5">
                  <p className="text-xs whitespace-nowrap">Challenge User</p>
                  <input
                    type="checkbox"
                    checked={challenge}
                    onChange={() => setChallenge(!challenge)}
                    className="w-4 h-4 text-main border border-[#9F9F9F] rounded focus:ring-2 focus:ring-main"
                  />
                </div>
                <div className="flex gap-1 items-center w-full">
                  <button
                    disabled={stuLoading}
                    onClick={() => exportStudentsList()}
                    className="bg-white border border-sub text-sub w-full rounded-[8px] px-2.5 py-2.5 text-xs"
                  >
                    {stuLoading ? (
                      <span className="flex text-xs items-center gap-1 justify-center">
                        Exporting...{" "}
                        <Loader2 className="animate-spin w-5 h-5" />
                      </span>
                    ) : (
                      <span className="  text-xs flex justify-center items-center gap-1.5">
                        <BsDownload className="text-sub w-5 h-5 " />
                        Export
                      </span>
                    )}
                  </button>
                  {/* <button
                    onClick={() =>
                      setCoupon({
                        create: false,
                        list: true,
                        selectedStudentId: "",
                      })
                    }
                    className="bg-sub flex items-center gap-1 text-white w-full rounded-[8px] px-2.5 py-2.5 text-xs"
                  >
                    <RiCoupon2Fill className="text-white w-5 h-5" />
                    Coupon(s)
                  </button> */}
                </div>
              </div>
            </div>

            <div>
              <div className=" overflow-x-scroll md:overflow-x-auto">
                <ToastContainer />
                <table className="w-full mt-2 text-center relative">
                  <thead className="text-[#00173A] rounded-[6px] ">
                    <tr className="bg-[#E6F6FF] py-2 w-full">
                      <th className="md:py-2 md:text-base text-[#00173A] font-medium  px-5 text-xs py-2 text-left w-1/4 rounded-l-2xl">
                        Name
                      </th>
                      <th className="md:py-2 md:text-base  text-[#00173A] font-medium text-xs py-2 text-left">
                        Email
                      </th>
                      {/* <th className="md:py-2 md:text-base text-xs py-2 text-center">
                        <p className="w-min mx-auto">Courses Completed</p>
                      </th> */}
                      <th className="md:py-2 md:text-base whitespace-nowrap text-[#00173A] font-medium px-5 text-xs py-2 text-center">
                        Phone Number
                      </th>
                      <th className="md:py-2 md:text-base whitespace-nowrap  text-[#00173A] font-medium px-5 text-xs py-2 text-center">
                        Payment Status
                      </th>
                      {/* <th className="md:py-2 md:text-base px-5 text-xs py-2 text-center">
                        Batch
                      </th> */}
                      {/* <th className="md:py-2 md:text-base px-5 text-xs py-2 text-center">
                        Date
                      </th>*/}
                      {/* <th className="md:py-2 md:text-base px-5 text-xs py-2 ">
                        Coupon
                      </th> */}

                      {(role === "advanced" || role === "super_admin") && (
                        <th className="md:py-2 md:text-base px-5 text-xs py-2 rounded-r-2xl">
                          Access
                        </th>
                      )}
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
                <div className="flex  items-center justify-end gap-1 mt-2">
                  <div>
                    <Button
                      className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent text-sm md:text-base hover:text-main"
                      onClick={prevPage}
                      disabled={previous === null}
                    >
                      <FaAngleLeft className="w-5 h-5" />
                      Previous
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={nextPage}
                      className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent text-sm md:text-base hover:text-main"
                      disabled={next === null}
                    >
                      <FaAngleRight />
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {((coupon.create && coupon.selectedStudentId != "") || coupon.list) && (
        <CouponModal coupon={coupon} setCoupon={setCoupon} />
      )}
    </main>
  );
};

export default StudentPage;
