import SideNav from "@/components/side-comp/side-nav";
import StudentsTable from "@/components/side-comp/student-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const StudentPage = () => {

  
  return (
    <main>
      <SideNav />
      <div className="ml-64  bg-[#F8F9FF] overflow-y-scroll h-screen">
        <div className="h-[96px] flex justify-end bg-white shadow-md p-4 w-full">
          <div className="flex items-center gap-2">
            <Avatar>
              {/* <AvatarImage src={avatar} /> */}
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-base font-medium">John Mark</h1>
              <p className="text-sm text-[#5D5B5B]">Admin</p>
            </div>
          </div>
        </div>
        <div className="py-5 px-7">
          <div className="relative w-1/2">
            <Input
              type="text"
              placeholder="Search Course"
              className="placeholder:text-[#A2A2A2] text-black text-sm italic rounded-[8px] border border-main"
            />
            <Search className="absolute top-2 right-1" />
          </div>
          <div className="w-full shadow-md my-5 rounded-[8px] bg-white h-auto p-2">
            <h1 className="text-2xl font-medium">Students Database</h1>
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
