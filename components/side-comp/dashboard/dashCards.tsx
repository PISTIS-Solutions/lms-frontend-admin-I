import { BookOpenText, GraduationCap, ListChecks, Loader2 } from "lucide-react";
import React from "react";

const DashCards = ({loading, adminData}:any) => {
  return (
    <div className="flex gap-x-4 overflow-x-scroll justify-between pr-4">
      <div className=" w-full h-[128px] shadow-md rounded-[8px] border-t-4 bg-white border-t-sub flex items-center justify-between px-5">
        <div>
          {loading ? (
            <Loader2 className="animate-spin text-xl" />
          ) : (
            adminData && (
              <h1 className="sm:text-2xl text-sm md:text-lg text-[#5D5B5B] font-medium">
                {adminData.total_courses}
              </h1>
            )
          )}
          <p className="md:text-base text-xs text-[#00173A]">Total Courses</p>
        </div>
        <span className="bg-[#F8F9FF] rounded-full p-3">
          <BookOpenText className="text-main" />
        </span>
      </div>
      <div className=" w-full h-[128px] shadow-md rounded-[8px] border-t-4 bg-white border-t-main flex items-center justify-between px-5">
        <div>
          {loading ? (
            <Loader2 className="animate-spin text-xl" />
          ) : (
            adminData && (
              <h1 className="sm:text-2xl text-sm md:text-lg text-[#5D5B5B] font-medium">
                {adminData.total_students}
              </h1>
            )
          )}
          <p className="md:text-base text-xs text-[#00173A]">Total Students</p>
        </div>
        <span className="bg-[#F8F9FF] rounded-full p-3">
          <GraduationCap className="text-main" />
        </span>
      </div>
      <div className=" w-full h-[128px] shadow-md rounded-[8px] border-t-4 bg-white border-t-[#CC3366] flex items-center justify-between px-5">
        <div>
          {loading ? (
            <Loader2 className="animate-spin text-xl" />
          ) : (
            adminData && (
              <h1 className="sm:text-2xl text-sm md:text-lg text-[#5D5B5B] font-medium">
                {adminData.total_mentors}
              </h1>
            )
          )}
          <p className="md:text-base text-xs text-[#00173A]">Total Mentors</p>
        </div>
        <span className="bg-[#F8F9FF] rounded-full p-3">
          <ListChecks className="text-main" />
        </span>
      </div>
    </div>
  );
};

export default DashCards;
