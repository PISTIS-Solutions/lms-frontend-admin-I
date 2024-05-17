"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Cookies from "js-cookie";
import useStudentStore from "@/store/fetch-student";
import { Loader } from "lucide-react";
import Link from "next/link";

const TopNav = () => {
  const { studentData, loading, fetchStudentData } = useStudentStore();

  useEffect(() => {
    fetchStudentData();
  }, []);

  const userName = studentData?.full_name;
  const initials = userName ? userName.charAt(0).toUpperCase() : "";

  

  return (
    <Link href="/settings">
      <div className="flex items-center gap-1 md:gap-2">
        <Avatar>
          <AvatarImage src={studentData?.profile_photo} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <h1 className="md:text-base text-sm font-medium">{userName}</h1>
          )}
          <p className="md:text-sm text-xs text-[#5D5B5B]">Admin</p>
        </div>
      </div>
    </Link>
  );
};

export default TopNav;
