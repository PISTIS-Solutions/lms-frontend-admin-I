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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const params = useParams<{ modules: string }>();

  const { courseRead, fetchCourseRead, loading } = useCourseRead();

  const courseID = params.modules;

  const handleItemClick = (index: number, moduleId: string) => {
    setSelectedIndex(index === selectedIndex ? -1 : index);
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
                <p className="text-[#3E3E3E] text-base md:text-md">
                  Ansible is a powerful and user-friendly open-source automation
                  tool that simplifies and streamlines various IT tasks, making
                  them more manageable, efficient, and consistent. Even if
                  you're new to automation and IT management, Ansible provides a
                  straightforward approach to automating tasks without requiring
                  extensive programming knowledge.
                </p>
              </div>
              {/* <div className="bg-white rounded-[8px] my-2 md:my-0 p-2 col-span-3 shadow-sm">
                <div className="flex justify-between mb-4 items-center">
                  <p className="text-main text-lg font-semibold">Modules</p>
                  <span className="flex items-center gap-x-2 cursor-pointer">
                    <p className="text-main underline">Add</p>
                    <Plus />
                  </span>
                </div>
                {courseRead?.modules?.map((module: any, index: any) => (
                  <>
                    <div
                      key={module.id}
                      className={`py-3 px-4 cursor-pointer ${
                        index === selectedIndex ? "bg-main text-white" : ""
                      }`}
                      onClick={() => handleItemClick(index, module.id)}
                    >
                      <h2 className="md:text-lg text-sm font-medium">
                        {index + 1}. {module.module_title}
                      </h2>
                      <p
                        className={`md:text-sm text-xs font-normal ${
                          index === selectedIndex ? "block" : "hidden"
                        }`}
                      >
                        {module.module_sub_title}
                      </p>
                    </div>

                    <hr />
                  </>
                ))}
              </div> */}
              <SideModules
                courseRead={courseRead}
                selectedIndex={selectedIndex}
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
