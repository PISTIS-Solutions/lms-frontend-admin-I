import { Button } from "@/components/ui/button";
import { LucideLoader2, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrganiseComp = ({
  isDragDropEnabled,
  searchQuery,
  handleSearch,
  role,
  setIsDragDropEnabled,
  organizeIcon,
  saveIcon,
  updating,
  allCourses,
  displayedCourses,
  setDisplayedCourses,
  handleUpdateCourses,
}: any) => {
  return (
    <div className="flex flex-wrap justify-between gap-[10px] mt-2">
      {!isDragDropEnabled ? (
        <>
          <div className="flex border border-[#9F9F9F] rounded-[6px] p-[10px_12px] items-center gap-x-4 w-full md:w-1/3 h-full">
            {/* Search input field */}
            <Search color="#9F9F9F" size={16} />
            <input
              type="text"
              placeholder="Search for a course"
              className="placeholder:text-[#A2A2A2] text-black text-xs md:text-sm focus:outline-none focus:ring-0 focus:border-none border-0 bg-transparent p-0 w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-[10px]">
            <Button
              onClick={() => setIsDragDropEnabled(true)}
              className="flex items-center md:text-sm text-xs gap-x-1 cursor-pointer border-sub text-sub border bg-white p-[11px] px-4 hover:bg-sub/80 hover:text-white hover:border-white"
            >
              <Image src={organizeIcon} alt="organize icon" />
              Organize Courses
            </Button>
            {(role === "advanced" || role === "super_admin") && (
              <Link href="/courses/add-course">
                <Button className="flex items-center md:text-sm text-xs gap-x-1 cursor-pointer hover:border hover:border-sub bg-sub px-5 py-[13px] hover:bg-white hover:text-sub">
                  <Plus size={20} />
                  Create a new course
                </Button>
              </Link>
            )}
          </div>
        </>
      ) : (
        <>
          <Button
            className="p-[10px_16px] text-[#f00] flex gap-x-1 bg-transparent border-[#f00] border hover:bg-[#f00] hover:border-none hover:text-white group"
            onClick={() => {
              setIsDragDropEnabled(false);
              setDisplayedCourses(allCourses);
            }}
          >
            <X className="text-[#F00] group-hover:text-white" size={18} />
            Cancel
          </Button>
          <Button
            className="p-[10px_16px] text-white bg-sub flex gap-3 hover:bg-sub/80 h-full gap-x-1 text-sm"
            onClick={() => handleUpdateCourses(displayedCourses!)}
          >
            {updating ? (
              <>
                <LucideLoader2 className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Image src={saveIcon} alt="reset icon" />
                Save Changes
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default OrganiseComp;
