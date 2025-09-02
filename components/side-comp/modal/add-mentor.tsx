import React, { useState } from "react";

import { IoSend } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { urls } from "@/utils/config";

// import axios from "axios";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";
import { createAxiosInstance } from "@/lib/axios";

const AddMentorModal = ({ handleAddMentor }: any) => {
  const [access, setAccess] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const axios = createAxiosInstance();
  const inviteMentorFunction = async () => {
    try {
      setLoading(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.post(
        urls.inviteMentor,
        {
          email: email,
          role: access,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Invite sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        setLoading(false);
      }
    } catch (error: any) {
      // console.log(error.response?.data?.message);
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
      } else if (
        error.response?.data?.message &&
        error.response.data.message.includes(
          'duplicate key value violates unique constraint "users_user_email_key"'
        )
      ) {
        toast.error("This email is already a mentor", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(
          error.response?.data?.detail || "An unexpected error occurred",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          }
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" w-[620px] sm:h-[601px] h-auto m-4 p-3 sm:p-7 bg-white rounded-[10px] shadow-[0_0_80px_0_rgba(0,0,0,0.4)]">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <h1 className="text-[#2E2E2E] font-medium text-xl sm:text-2xl">
          Add a New Mentor
        </h1>
        <GrClose
          onClick={() => handleAddMentor()}
          className=" sm:w-8 w-4 h-4 sm:h-8 cursor-pointer"
        />
      </div>
      <div className="py-3">
        <label
          htmlFor=""
          className="text-[#666666] font-normal text-sm sm:text-base"
        >
          Email Address
        </label>{" "}
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-[#9F9F9F] placeholder:text-base mt-3 placeholder:font-normal text-xs sm:text-base font-normal w-full placeholder:text-[#9F9F9F] p-[8px_12px]  border border-[#DADADA]  bg-[#FAFAFA]"
          placeholder="Invite a new mentor by entering their email here"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[#666666] text-xs sm:text-sm font-medium ">
            Select an access level
          </p>
          <div className="flex items-center justify-between w-[50%] px-5">
            <input
              type="checkbox"
              name="access"
              id="access"
              onChange={(e) => setAccess(e.target.value)}
              value="basic"
              checked={access === "basic"}
              className="w-4 h-4 text-[#2FBC8D] bg-gray-100 border-gray-300 rounded focus:ring-[#2FBC8D]"
            />
            <input
              type="checkbox"
              name="access"
              id="access"
              onChange={(e) => setAccess(e.target.value)}
              value="advanced"
              checked={access === "advanced"}
              className="w-4 h-4 text-[#2FBC8D] bg-gray-100 border-gray-300 rounded focus:ring-[#2FBC8D]"
            />
            <input
              type="checkbox"
              name="access"
              id="access"
              onChange={(e) => setAccess(e.target.value)}
              value="super_admin"
              checked={access === "super_admin"}
              className="w-4 h-4 text-[#2FBC8D] bg-gray-100 border-gray-300 rounded focus:ring-[#2FBC8D]"
            />
          </div>
        </div>
        <table className="border border-[#DADADA] my-4">
          <thead className="rounded-t-[6px]">
            <tr>
              <th className="text-[#666666] text-xs sm:text-sm font-medium text-left bg-[#FAFAFA] py-2 px-2 sm:px-4 border border-[#DADADA]">
                Actions
              </th>
              <th
                className={` text-xs sm:text-sm font-medium text-center py-2 px-2 sm:px-4 ${
                  access === "basic"
                    ? "bg-[#2FBC8D] text-white"
                    : "bg-[#FAFAFA] text-[#666666]"
                } border border-[#DADADA]`}
              >
                Basic
              </th>
              <th
                className={`text-[#666666] text-xs sm:text-sm font-medium text-center py-2 px-2 sm:px-4 ${
                  access === "advanced"
                    ? "bg-[#2FBC8D] text-white"
                    : "bg-[#FAFAFA] text-[#666666]"
                } border border-[#DADADA]`}
              >
                Advanced
              </th>
              <th
                className={`text-[#666666] text-xs sm:text-sm font-medium text-center py-2 px-2 sm:px-4 ${
                  access === "super_admin"
                    ? "bg-[#2FBC8D] text-white"
                    : "bg-[#FAFAFA] text-[#666666]"
                } border border-[#DADADA]`}
              >
                Super Admin
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-[#666666] px-4 font-normal text-xs sm:text-sm py-2 bg-[#FAFAFA] border border-[#DADADA]">
                <ul className="list-disc list-outside">
                  <li>Add New Mentor</li>
                </ul>
              </td>
              <td className="text-[#666666] font-normal text-xs sm:text-sm text-center border border-[#DADADA]">
                No
              </td>
              <td className="text-[#666666] font-normal text-xs sm:text-sm text-center border border-[#DADADA]">
                No
              </td>
              <td className="text-[#666666] font-normal text-xs sm:text-sm text-center border border-[#DADADA]">
                Yes
              </td>
            </tr>
            <tr>
              <td className="text-[#666666] px-4 font-normal text-xs sm:text-sm py-2 bg-[#FAFAFA] border border-[#DADADA]">
                <ul className="list-disc list-outside">
                  <li>Create, Edit, and Delete Courses</li>
                </ul>
              </td>
              <td className="text-[#666666] font-normal text-xs sm:text-sm text-center border border-[#DADADA]">
                No
              </td>
              <td className="text-[#666666] font-normal text-sm text-center border border-[#DADADA]">
                Yes
              </td>
              <td className="text-[#666666] font-normal text-sm text-center border border-[#DADADA]">
                Yes
              </td>
            </tr>
            <tr>
              <td className="text-[#666666] px-4 font-normal text-xs sm:text-sm py-2 bg-[#FAFAFA] border border-[#DADADA]">
                <ul className="list-disc list-outside">
                  <li>Create, Edit, and Delete Projects</li>
                </ul>
              </td>
              <td className="text-[#666666] font-normal text-xs sm:text-sm text-center border border-[#DADADA]">
                No
              </td>
              <td className="text-[#666666] font-normal text-xs sm:text-sm text-center border border-[#DADADA]">
                Yes
              </td>
              <td className="text-[#666666] font-normal text-xs sm:text-sm text-center border border-[#DADADA]">
                Yes
              </td>
            </tr>
            <tr>
              <td className="text-[#666666] px-4 font-normal text-xs sm:text-sm py-2 bg-[#FAFAFA] border border-[#DADADA]">
                <ul className="list-disc list-outside">
                  <li>Review, Approve, or Reject Students' Projects</li>
                </ul>
              </td>
              <td className="text-[#666666] font-normal text-xs sm:text-sm text-center border border-[#DADADA]">
                Yes
              </td>
              <td className="text-[#666666] font-normal text-xs sm:text-sm text-center border border-[#DADADA]">
                Yes
              </td>
              <td className="text-[#666666] font-normal text-xs sm:text-sm text-center border border-[#DADADA]">
                Yes
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        disabled={loading}
        onClick={() => inviteMentorFunction()}
        className="text-[#C4C4C4] w-2/3 mx-auto flex items-center gap-2 my-4 justify-center font-medium text-sm sm:text-base bg-[#2FBC8D] rounded-[8px] cursor-pointer p-[14px_6px] sm:p-[16px_10px]"
      >
        Send Invite{" "}
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <IoSend className="text-white" />
        )}
      </button>
      <p className=" font-normal text-xs text-[#666666] text-center leading-4">
        An invite mail will be sent to the email entered above and the selected
        access level will be granted to the user. This can be changed later on
        the mentors card.
      </p>
    </div>
  );
};

export default AddMentorModal;
