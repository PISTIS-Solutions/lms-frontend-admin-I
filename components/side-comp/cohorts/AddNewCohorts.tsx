"use client";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { showToast } from "@/lib/showToast";
import refreshAdminToken from "@/utils/refreshToken";
import useCohortStore from "@/store/fetch-cohorts";

const NewCohorts = ({ handleAddCohorts }: any) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState({
    tag: "pistis-cohort-",
    description: "",
    status: "active",
    regStatus: "open",
  });

  const { fetchCohorts } = useCohortStore();

  const calculateDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diffDays >= 0 ? `${diffDays} days` : "Invalid dates";
    }
    return "----";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]:
        name === "tag"
          ? `pistis-cohort-${value.replace(/^pistis-cohort-/, "")}`
          : value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const createCohort = async () => {
    try {
      setLoading(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.post(
        `${urls.cohorts}`,
        {
          tag: details.tag,
          description: details.description,
          start_date: startDate,
          end_date: endDate,
          status: details.status,
          registration_status: details.regStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (response.status === 201) {
        showToast("Cohort created successfully!", "success");
        fetchCohorts( 1, "")
        handleAddCohorts(false);
      }
    } catch (error: any) {
      console.log(error, "error");
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await createCohort();
      } else if (error?.message === "Network Error") {
        showToast("Check your network!", "error");
      } else {
        showToast(error?.response?.data[0], "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:w-[620px] w-[90%] h-[80%] overflow-y-scroll sm:h-auto m-4 p-3 sm:p-7 bg-white rounded-[10px] shadow-[0_0_80px_0_rgba(0,0,0,0.4)]">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <h1 className="text-[#2E2E2E] font-medium text-xl sm:text-2xl">
          Create a New Cohort
        </h1>
        <GrClose
          onClick={handleAddCohorts}
          className="sm:w-6 w-4 h-4 sm:h-6 cursor-pointer"
        />
      </div>

      <div>
        {/* Cohort Title */}
        <div className="py-3">
          <label className="text-[#666666] font-normal py-1 text-sm sm:text-[14px]">
            Cohort Title
          </label>
          <input
            type="text"
            name="tag"
            value={details.tag}
            onChange={handleChange}
            className="placeholder:placeholder:text-[#9F9F9F] text-black placeholder:text-xs sm:placeholder:text-base text-xs sm:text-base font-normal w-full p-[8px_12px] border border-[#DADADA] bg-[#FAFAFA]"
            placeholder="Enter your proposed cohort topic here (e.g pistis-cohort-1)"
          />
        </div>

        {/* Cohort Description */}
        <div className="py-3">
          <label className="text-[#666666] font-normal py-1 text-sm sm:text-[14px]">
            Cohort Description
          </label>
          <textarea
            name="description"
            value={details.description}
            onChange={handleChange}
            className="placeholder:text-[#9F9F9F] text-black placeholder:text-xs sm:placeholder:text-base text-xs sm:text-base font-normal w-full p-[8px_12px] border border-[#DADADA] bg-[#FAFAFA]"
            placeholder="Enter any additional note or special request here"
          />
        </div>

        {/* Start & End Date Section */}
        <div className="flex items-center justify-between">
          <p className="font-normal text-sm text-[#484848]">Start - End Date</p>
          <p className="font-normal text-xs text-[#FF1456]">
            Session Duration: {calculateDuration()}
          </p>
        </div>

        <div className="bg-[#FAFAFA] rounded-[6px] my-2 py-2 px-4 flex sm:flex-row flex-col items-center justify-between">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border-0 bg-none  sm:text-base text-sm"
          />
          <span className="px-2">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              if (e.target.value >= startDate) {
                setEndDate(e.target.value);
              } else {
                toast.error("End Date cannot be before Start Date!", {
                  position: "top-right",
                  autoClose: 3000,
                  theme: "dark",
                });
              }
            }}
            className="p-2 border-0 bg-none sm:text-base text-sm"
            min={startDate}
          />
        </div>

        {/* Status Selection */}
        <div className="flex sm:flex-row flex-col items-center justify-between gap-0 sm:gap-2">
          <div className="my-3">
            <label className="text-[#666666] font-normal py-1 text-sm sm:text-[14px]">
              Status
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={details.status === "active"}
                  onChange={handleChange}
                />
                <p className="font-normal text-sm text-[#484848]">Active</p>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={details.status === "inactive"}
                  onChange={handleChange}
                />
                <p className="font-normal text-sm text-[#484848]">Inactive</p>
              </label>
            </div>
          </div>

          {/* Registration Status */}
          <div className="my-3">
            <label className="text-[#666666] font-normal py-1 text-sm sm:text-[14px]">
              Registration Status
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="regStatus"
                  value="open"
                  checked={details.regStatus === "open"}
                  onChange={handleChange}
                />
                <p className="font-normal text-sm text-[#484848]">Open</p>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="regStatus"
                  value="closed"
                  checked={details.regStatus === "closed"}
                  onChange={handleChange}
                />
                <p className="font-normal text-sm text-[#484848]">Closed</p>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => createCohort()}
          className={`text-center  sm:text-base text-sm w-full ${
            details.tag && details.description && startDate && endDate
              ? "bg-[#2E2E2E]"
              : "bg-[#9F9F9F] cursor-not-allowed"
          } text-white rounded-[6px] py-2 sm:py-4`}
          disabled={
            !details.tag ||
            !details.description ||
            !startDate ||
            !endDate ||
            loading
          }
        >
          {loading ? "Creating..." : "Create a New Cohort"}
        </button>

        <p className="text-center text-[#666666] font-normal text-xs my-4">
          Facilisis vulputate quis mi a sed. At sodales nunc bibendum aliquet.
          Pulvinar nisl feugiat eros et elementum erat accumsan nibh amet. Eget
          lectus sodales integer.
        </p>
      </div>
    </div>
  );
};

export default NewCohorts;
