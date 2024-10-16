import React, { useEffect, useRef, useState } from "react";

import { CgClose } from "react-icons/cg";
import { BsDownload } from "react-icons/bs";
import { MentorsData } from "@/store/data";
import { TiStarburst } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";

import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";
import { urls } from "@/utils/config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import useMentorsList from "@/store/mentors-list";

const ExportMentorModal = ({ handleExportMentor }: any) => {
  const { mentors, loadMentors, fetchMentors, previous, next, count } =
    useMentorsList();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchMentors(page, role);
  }, [page, role]);

  const nextPage = async () => {
    if (next !== null) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (previous !== null && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const exportMentorList = async (page: number, role = "") => {
    try {
      setLoading(true);
      const adminAccessToken = Cookies.get("adminAccessToken");

      // Set responseType to 'blob' to handle binary data
      const response = await axios.get(
        `${urls.exportMentor}?page=${page}&role=${role}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
          responseType: "blob", // Indicate that the response is a binary file (PDF/Excel)
        }
      );

      if (response.status === 200) {
        console.log(response, "res");
        // Create a Blob from the response data
        const fileBlob = new Blob([response.data], {
          type: response.data.type,
        });

        // Create a URL for the Blob and download the file
        const downloadUrl = URL.createObjectURL(fileBlob);
        const a = document.createElement("a");
        a.href = downloadUrl;

        // Set a default filename or extract it from the response header (if available)
        const fileName = response.headers["content-disposition"]
          ? response.headers["content-disposition"].split("filename=")[1]
          : "mentors_list.pdf"; // Default file name

        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await exportMentorList(page, role); // Retry with a refreshed token
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
      setLoading(false);
    }
  };

  return (
    <div className=" sm:max-w-4/6 overflow-scroll max-w-none max-h-[868px] mx-3 p-4 sm:p-7 bg-white rounded-[10px] shadow-[0_0_80px_0_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between">
        <h1 className="text-[#2E2E2E] text-[xl] sm:text-2xl font-medium">
          Export Mentor List as PDF
        </h1>
        <CgClose
          className="text-[#666666] w-[14px] h-[14px] cursor-pointer"
          onClick={() => {
            handleExportMentor();
            fetchMentors(1, "", "");
          }}
        />
      </div>
      <div>
        <div className="flex sm:flex-row flex-col gap-2 items-center justify-between py-4">
          <div className="flex sm:flex-row flex-col gap-2 items-center gap-x-2">
            <p className="text-[#484848] font-normal text-xs sm:text-sm">
              Filter list by Admin level:
            </p>
            <div className="flex items-center gap-x-4">
              <div className="text-[#666666] font-normal text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                <label htmlFor="all">All</label>
                <input
                  type="checkbox"
                  name="export-filter"
                  id="all"
                  className="rounded-[2px]"
                  checked={role === ""}
                  value=""
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="text-[#666666] font-normal text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                <label htmlFor="admin">Super Admin</label>
                <input
                  type="checkbox"
                  name="export-filter"
                  id="admin"
                  className="rounded-[2px]"
                  checked={role === "super_admin"}
                  value="super_admin"
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="text-[#666666] font-normal text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                <label htmlFor="advance">Advance</label>
                <input
                  type="checkbox"
                  name="export-filter"
                  id="advance"
                  className="rounded-[2px]"
                  checked={role === "advanced"}
                  value="advanced"
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="text-[#666666] font-normal text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                <label htmlFor="basic">Basic</label>
                <input
                  type="checkbox"
                  name="export-filter"
                  id="basic"
                  className="rounded-[2px]"
                  checked={role === "basic"}
                  value="basic"
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>
          </div>
          <p className="text-[#666666] font-medium text-xs sm:text-sm">
            Result: {count} Mentors
          </p>
        </div>
        <div className="overflow-y-scroll py-4 ">
          <table className="table-auto w-full">
            <thead className="bg-[#FAFAFA]">
              <tr className="border border-[#dadada]">
                <th className="text-[#666666] font-medium text-xs sm:text-sm text-left p-[6px_8px] sm:p-[8px_12px] border border-[#DADADA]">
                  Name
                </th>
                <th className="text-[#666666] font-medium text-xs sm:text-sm text-left p-[6px_8px] sm:p-[8px_12px] border border-[#DADADA]">
                  Email Address
                </th>
                <th className="text-[#666666] font-medium text-xs sm:text-sm text-left p-[6px_8px] sm:p-[8px_12px] border border-[#DADADA]">
                  Phone Number
                </th>
                <th className="text-[#666666] font-medium text-xs sm:text-sm text-left p-[6px_8px] sm:p-[8px_12px] border border-[#DADADA]">
                  Level
                </th>

                {/* <th className="text-[#666666] font-medium text-sm text-left p-[8px_12px] ">{``}</th> */}
              </tr>
            </thead>
            <tbody className="relative">
              {mentors?.map((person: any) => (
                <>
                  <tr key={person.id} className="border border-[#dadada]">
                    <td className="p-[6px_8px] sm:p-[8px_12px]  text-[#666666] font-normal border border-[#DADADA] text-xs">
                      {person.first_name} {person.last_name}
                    </td>
                    <td className="p-[6px_8px] sm:p-[8px_12px] text-[#666666] font-normal border border-[#DADADA] text-xs">
                      {person.email}
                    </td>
                    <td className="p-[6px_8px] sm:p-[8px_12px] text-[#666666] font-normal border border-[#DADADA] text-xs">
                      {person.phone_number}
                    </td>
                    <td
                      className={`p-[6px_8px] sm:p-[8px_12px]  capitalize font-normal border border-[#DADADA] text-xs ${
                        person?.role?.toLowerCase() === "basic"
                          ? "text-[#02A1FF]"
                          : person?.role?.toLowerCase() === "super_admin"
                          ? "text-[#2FBC8D]"
                          : person?.role?.toLowerCase() === "advanced"
                          ? "text-[#FF1053]"
                          : "text-[#666666]"
                      }`}
                    >
                      <GoDotFill className="w-[6px] h-[6px] inline-block" />{" "}
                      {person.role.toLowerCase() === "super_admin"
                        ? "super admin"
                        : person.role}
                    </td>
                  </tr>
                </>
              ))}
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
      <button
        disabled={loading}
        onClick={() => exportMentorList(page, role)} // Example: page=1, role=""
        className="text-[#C4C4C4] w-full sm:w-2/3 mx-auto my-4 flex justify-center font-medium text-sm sm:text-base bg-[#2FBC8D] rounded-[8px] cursor-pointer p-[16px_10px]"
      >
        {loading ? (
          <span className="flex items-center gap-2 justify-center">
            Exporting... <Loader2 className="animate-spin" />
          </span>
        ) : (
          <span className="flex items-center gap-2 justify-center">
            Export Selected Mentors List <BsDownload className="text-white" />
          </span>
        )}
      </button>
    </div>
  );
};

export default ExportMentorModal;
