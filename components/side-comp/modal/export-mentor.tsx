import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
import { Loader2 } from "lucide-react";

const ExportMentorModal = ({ handleExportMentor }: any) => {
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("");

  //   const exportMentorList = async (page: number, role = "") => {
  //     try {
  //       setLoading(true);
  //       const adminAccessToken = Cookies.get("adminAccessToken");
  //       const response = await axios.get(
  //         `${urls.exportMentor}?page=${page}&role=${role}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${adminAccessToken}`,
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         setLoading(false);
  //         setMentors(response.data.results);
  //         console.log(response, "res")
  //       }
  //     } catch (error: any) {
  //       if (error.response && error.response.status === 401) {
  //         await refreshAdminToken();
  //         await exportMentorList(page, role);
  //       } else if (error.message === "Network Error") {
  //         toast.error("Check your network!", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: false,
  //           theme: "dark",
  //         });
  //       } else {
  //         toast.error(error.response?.data?.detail, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: false,
  //           theme: "dark",
  //         });
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

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

  //   useEffect(() => {
  //     exportMentorList(page, role);
  //   }, [page, role]);

  //   const componentRef = useRef<HTMLDivElement | null>(null);

  //   const handleDownloadPdf = async () => {
  //     const element = componentRef.current;
  //     if (!element) return; // Ensure element exists

  //     const canvas = await html2canvas(element);
  //     const data = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF();
  //     const imgProps = pdf.getImageProperties(data);
  //     const pdfWidth = pdf.internal.pageSize.getWidth() + 200;
  //     const pdfHeight = pdf.internal.pageSize.getHeight() + 100;

  //     pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save("mentors.pdf");
  //   };

  return (
    <div className=" sm:max-w-4/6 max-w-none max-h-[868px] mx-3 p-4 sm:p-7 bg-white rounded-[10px] shadow-[0_0_80px_0_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between">
        <h1 className="text-[#2E2E2E] text-[xl] sm:text-2xl font-medium">
          Export Mentor List as PDF
        </h1>
        <CgClose
          className="text-[#666666] w-[14px] h-[14px] cursor-pointer"
          onClick={() => handleExportMentor()}
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
                  name="all"
                  id="all"
                  className="rounded-[2px]"
                />
              </div>
              <div className="text-[#666666] font-normal text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                <label htmlFor="admin">Admin</label>
                <input
                  type="checkbox"
                  name="admin"
                  id="admin"
                  className="rounded-[2px]"
                />
              </div>
              <div className="text-[#666666] font-normal text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                <label htmlFor="advance">Advance</label>
                <input
                  type="checkbox"
                  name="advance"
                  id="advance"
                  className="rounded-[2px]"
                />
              </div>
              <div className="text-[#666666] font-normal text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                <label htmlFor="basic">Basic</label>
                <input
                  type="checkbox"
                  name="basic"
                  id="basic"
                  className="rounded-[2px]"
                />
              </div>
            </div>
          </div>
          <p className="text-[#666666] font-medium text-xs sm:text-sm">
            Result: 400 Mentors
          </p>
        </div>
        {/* <div className="overflow-y-scroll py-4 ">
          <table className="table-auto">
            <thead className="bg-[#FAFAFA]">
              <tr className="border border-[#dadada]">
                <th className="text-[#666666] font-medium text-sm text-left p-[8px_12px] border border-[#DADADA]">
                  Name
                </th>
                <th className="text-[#666666] font-medium text-sm text-left p-[8px_12px] border border-[#DADADA]">
                  Email Address
                </th>
                <th className="text-[#666666] font-medium text-sm text-left p-[8px_12px] border border-[#DADADA]">
                  Phone Number
                </th>
                <th className="text-[#666666] font-medium text-sm text-left p-[8px_12px] border border-[#DADADA]">
                  Level
                </th>
                <th className="text-[#666666] font-medium text-sm text-left p-[8px_12px] border-l border-l-[#DADADA]">
                  Position
                </th>
                <th className="text-[#666666] font-medium text-sm text-left p-[8px_12px] ">{``}</th>
              </tr>
            </thead>
            <tbody className="relative">
              {mentors?.map((person: any) => (
                <>
                  <tr key={person.id} className="border border-[#dadada]">
                    <td className="p-[8px_12px]  text-[#666666] font-normal border border-[#DADADA] text-xs">
                      {person.first_name} {person.last_name}
                      <TiStarburst className="w-[10px] h-[10px] -mt-3 text-[#2FBC8D] inline-block" />
                    </td>
                    <td className="p-[8px_12px] text-[#666666] font-normal border border-[#DADADA] text-xs">
                      {person.email}
                    </td>
                    <td className="p-[8px_12px] text-[#666666] font-normal border border-[#DADADA] text-xs">
                      {person.phone_number}
                    </td>
                    <td
                      className={`p-[8px_12px] text-[#FF1053] font-normal border border-[#DADADA] text-xs ${
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
        </div> */}
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
