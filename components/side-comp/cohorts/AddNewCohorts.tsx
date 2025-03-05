"use client"
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewCohorts = ({ handleAddCohorts }: any) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Calculate session duration
  const calculateDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 ? `${diffDays} days` : "Invalid dates";
    }
    return "----";
  };

  return (
    <div className="w-[620px] h-auto m-4 p-3 sm:p-7 bg-white rounded-[10px] shadow-[0_0_80px_0_rgba(0,0,0,0.4)]">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <h1 className="text-[#2E2E2E] font-medium text-xl sm:text-2xl">
          Create a New Cohort
        </h1>
        <GrClose
          onClick={() => handleAddCohorts()}
          className="sm:w-6 w-4 h-4 sm:h-6 cursor-pointer"
        />
      </div>

      <div>
        <div className="py-3">
          <label className="text-[#666666] font-normal py-1 text-sm sm:text-[14px]">
            Cohort Title
          </label>
          <input
            type="text"
            className="text-[#9F9F9F] placeholder:text-base text-xs sm:text-base font-normal w-full p-[8px_12px] border border-[#DADADA] bg-[#FAFAFA]"
            placeholder="Enter your proposed cohort topic here"
          />
        </div>

        <div className="py-3">
          <label className="text-[#666666] font-normal py-1 text-sm sm:text-[14px]">
            Cohort Description
          </label>
          <textarea
            className="text-[#9F9F9F] placeholder:text-base text-xs sm:text-base font-normal w-full p-[8px_12px] border border-[#DADADA] bg-[#FAFAFA]"
            placeholder="Enter any additional note or special request here"
          />
        </div>

        {/* Start & End Date Section */}
        <div className="flex items-center justify-between">
          <p className="font-normal text-sm text-[#484848]">Start - End Date</p>
          <p className="font-normal text-xs text-[#484848]">
            Session Duration: {calculateDuration()}
          </p>
        </div>

        <div className="bg-[#FAFAFA] rounded-[6px] my-2 py-2 px-4 flex items-center justify-between">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border-0 bg-none"
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
            className="p-2 border-0 bg-none"
            min={startDate} // Prevents invalid selections
          />
        </div>

        <button className="text-center w-full bg-[#9F9F9F] text-white rounded-[6px] py-4">
          Create a New Cohort
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
