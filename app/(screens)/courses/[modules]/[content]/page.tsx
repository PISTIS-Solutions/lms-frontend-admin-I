"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ChevronRight, Edit3, Loader2, Plus } from "lucide-react";
import Image from "next/image";

import img from "@/public/assets/course/ansible.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummydata } from "@/app/data/dummyModules";
import TopNav from "@/components/side-comp/topNav";

import useModuleRead from "@/store/module-read";
import SideModules from "@/components/side-comp/side-modules";
import useCourseRead from "@/store/course-read";

const Content = () => {
  const router = useRouter();
  const params = useParams<{ modules: string; content: string }>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { moduleData, fetchModuleRead, moduleLoading } = useModuleRead();
  const { courseRead, fetchCourseRead, loading } = useCourseRead();

  const handleItemClick = (index: number, moduleId: string) => {
    setSelectedIndex(index === selectedIndex ? -1 : index);
    router.replace(`/courses/${courseID}/${moduleId}`);
  };

  const courseID = params.modules;
  const moduleID = params.content;

  useEffect(() => {
    fetchModuleRead(courseID, moduleID);
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
        <div className="">
          <div className=" px-4 mt-3 text-xs md;text-sm font-medium flex items-center">
            <p className="text-[#000066]">Course Content</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#000066]">Modules</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#000066]"> {moduleData?.module_title}</p>
          </div>
          {moduleLoading ? (
            <div className="w-[100%] flex items-center justify-center h-screen">
              <Loader2 className=" w-8 h-8 animate-spin" />
              <p>Loading Module Information</p>
            </div>
          ) : (
            <div>
              <h1 className=" px-4 text-[#1A1A1A] text-lg md:text-2xl my-4 font-medium">
                {moduleData?.module_title}
              </h1>
              <div className="md:grid block p-4 gap-x-4 grid-cols-10">
                <Image
                  className="w-full h-[428px] md:col-span-7"
                  src={img}
                  priority
                  alt="course-module"
                />
                <ScrollArea className="h-[428px] rounded-[8px] shadow-md my-2 md:my-0 bg-white col-span-3">
                  {/* <div className="text-main md:text-base p-4 text-lg font-medium flex justify-between items-center py-2">
                  <h3>Modules</h3>
                  <span className="flex items-center gap-1 cursor-pointer">
                    <p className="underline">Add</p>
                    <Plus />
                  </span>
                </div> */}
                  {/* <div>
                  {testData.map(({ moduleHead, summary }, index) => (
                    <>
                      <div
                        key={index}
                        className={`py-3 px-4 cursor-pointer ${
                          index === selectedIndex ? "bg-main text-white" : ""
                        }`}
                        onClick={() => handleItemClick(index)}
                      >
                        <h2 className="md:text-lg text-sm font-medium">
                          {index + 1}. {moduleHead}
                        </h2>
                        <p
                          className={`md:text-sm text-xs font-normal ${
                            index === selectedIndex ? "block" : "hidden"
                          }`}
                        >
                          {summary}
                        </p>
                      </div>

                      <hr />
                    </>
                  ))}
                </div> */}
                  {loading ? (
                    <div className="w-[100%] flex items-center justify-center h-screen">
                      <Loader2 className=" w-8 h-8 animate-spin" />
                      <p>Loading Modules</p>
                    </div>
                  ) : (
                    <SideModules
                      courseRead={courseRead}
                      selectedIndex={selectedIndex}
                      handleItemClick={handleItemClick}
                    />
                  )}
                </ScrollArea>
              </div>
              <div className="bg-white shadow-md p-4">
                <div className="flex justify-between items-center">
                  <h1 className="md:text-2xl text-lg font-medium">
                    Module 1: {moduleData?.module_title}
                  </h1>
                  <span className=" md:text-xl text-sm text-main underline gap-x-2 cursor-pointer flex items-center">
                    <p className="">Edit</p>
                    <Edit3 />
                  </span>
                </div>
                <div>
                  <p className="md:text-xl py-4 text-[#3E3E3E]">
                    {/* The current course builds upon the previous one seamlessly.
                    You&apos;ll delve into the core concepts of Ansible and have
                    hands-on experience with a project. Just like in previous
                    classes, we strongly advise you to engage in practice, as
                    it&apos;s the most effective way to grasp the material.
                    Ansible is an open-source automation tool designed for
                    configuration management, application deployment, task
                    automation, and orchestration. It allows you to manage and
                    control a large number of servers or devices from a single
                    control machine. Ansible uses a simple and human-readable
                    syntax, which makes it easy to learn and use. You have a
                    timeline of 2weeks to finish this course. <br /> Best of
                    luck! */}
                     {moduleData?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Content;
