"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SideNav from "@/components/side-comp/side-nav";
import { ArrowLeft, ChevronRight, Edit3, Loader2, Plus } from "lucide-react";
import TopNav from "@/components/side-comp/topNav";
import useCourseRead from "@/store/course-read";
import "react-toastify/dist/ReactToastify.css";
import SideModules from "@/components/side-comp/side-modules";

const Module = () => {
  const router = useRouter();
  const params = useParams<{ modules: string }>();
  const courseID = params.modules;

  const [selectedModuleId, setSelectedModuleId] = useState(courseID);

  const { courseRead, fetchCourseRead, loading } = useCourseRead();

  const handleItemClick = (moduleId: any) => {
    setSelectedModuleId(moduleId === selectedModuleId ? null : moduleId);
    router.replace(`/courses/${courseID}/${moduleId}`);
  };

  useEffect(() => {
    fetchCourseRead(courseID);
  }, []);

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <ArrowLeft
            onClick={() => {
              router.back();
            }}
            className="cursor-pointer"
          />
          <TopNav />
        </div>
        {loading ? (
          <div className="w-[100%] flex items-center justify-center h-screen">
            <Loader2 className=" w-8 h-8 animate-spin" />
            <p>Loading Course Information</p>
          </div>
        ) : (
          <div className="p-4">
            <span className="flex gap-1 items-center">
              <p className="text-sm text-main">Course Content</p>{" "}
              <ChevronRight className="text-main" />{" "}
              <p className="text-sm text-[#9C9C9C]">{courseRead?.title}</p>{" "}
            </span>
            <div className="grid grid-cols-10 gap-x-2 my-2 ">
              <div className="bg-white col-span-7 p-2 rounded-[8px] shadow-sm">
                <h1 className="text-2xl text-main py-2">{courseRead?.title}</h1>
                <div className="col-span-7">
                  <p
                    dangerouslySetInnerHTML={{ __html: courseRead?.overview }}
                    className="text-[#3E3E3E]"
                  ></p>
                </div>
              </div>
              <SideModules
                courseRead={courseRead}
                selectedModuleId={selectedModuleId}
                handleItemClick={handleItemClick}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Module;
