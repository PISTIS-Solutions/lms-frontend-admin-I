"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Cookies from "js-cookie";
import useStudentStore from "@/store/fetch-student";
import { Loader, Loader2 } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const TopNav = () => {
  const { studentData, loading, fetchStudentData } = useStudentStore();

  useEffect(() => {
    fetchStudentData();
  }, []);

  const userName = studentData?.full_name;
  const initials = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <Link href="/settings">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* <GoBellFill className="text-main w-6 h-6" /> */}
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                className=" object-cover"
                src={studentData?.profile_photo}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              {loading ? (
                // <Loader className="animate-spin" />
                <Skeleton className="h-4 w-[250px]" />
              ) : (
                <div>
                  <h1 className="text-base text-main font-semibold">
                    {userName}
                  </h1>
                  <p className="text-[#666666] font-normal text-xs">
                    {studentData?.email}
                  </p>
                </div>
              )}
            </div>
            {/* <FiChevronDown className="w-4 h-4 text-[#666666] cursor-pointer" /> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopNav;
