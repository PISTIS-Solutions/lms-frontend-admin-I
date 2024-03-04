"use client"
import SideNav from "@/components/side-comp/side-nav";
import StudentsTable from "@/components/side-comp/student-table";
import TopNav from "@/components/side-comp/topNav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { urls } from "@/utils/config";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useState } from "react";

const StudentPage = () => {


  return (
    <main>
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
         <TopNav/>
        </div>
        <div className="py-5 px-2 md:px-7">
          <div className="relative w-full md:w-1/2">
            <Input
              type="text"
              placeholder="Search Course"
              className="placeholder:text-[#A2A2A2] text-black text-sm italic rounded-[8px] border border-main"
            />
            <Search className="absolute top-2 right-1" />
          </div>
          <div className="w-full shadow-md my-5 rounded-[8px] bg-white h-auto p-2">
            <h1 className="md:text-2xl text-lg font-medium">Students Database</h1>
            <div>
              <StudentsTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudentPage;
