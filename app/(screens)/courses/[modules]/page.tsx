"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ChevronRight, Edit3, Plus } from "lucide-react";
import Image from "next/image";

import img from "@/public/assets/course/ansible.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummydata } from "@/app/data/dummyModules";

const Module = () => {
  const router = useRouter();
  const params = useParams<{ modules: string }>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const moduleData = dummydata.find(
    (item) => item.id === parseInt(params.modules, 10)
  );

  if (!moduleData) {
    return (
      <div className="text-4xl text-red-500 text-center">Module empty!</div>
    );
  }

  const handleItemClick = (index: number, id: any) => {
    setSelectedIndex(index === selectedIndex ? -1 : index);
    router.push(`/courses/modules/${id}`);
  };

  const testData = [
    {
      id: "1",
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      id: "2",
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      id: "3",
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      id: "4",
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      id: "5",
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      id: "6",
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      id: "7",
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      id: "8",
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      id: "9",
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
  ];

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
          <div className="flex items-center gap-2">
            <Avatar>
              {/* <AvatarImage src={avatar} /> */}
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-base font-medium">John Mark</h1>
              <p className="text-sm text-[#5D5B5B]">Student</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <span className="flex gap-1 items-center">
            <p className="text-sm text-main">Course Content</p>{" "}
            <ChevronRight className="text-main" />{" "}
            <p className="text-sm text-[#9C9C9C]">Modules</p>{" "}
          </span>
          <div className="grid grid-cols-10 gap-x-2 my-2 ">
            <div className="bg-white col-span-7 p-2 rounded-[8px] shadow-sm">
              <h1 className="text-2xl text-main py-2">{moduleData.title}</h1>
              <p className="text-[#3E3E3E] text-base md:text-md">
                Ansible is a powerful and user-friendly open-source automation
                tool that simplifies and streamlines various IT tasks, making
                them more manageable, efficient, and consistent. Even if you're
                new to automation and IT management, Ansible provides a
                straightforward approach to automating tasks without requiring
                extensive programming knowledge.
              </p>
            </div>
            <div className="bg-white rounded-[8px] my-2 md:my-0 p-2 col-span-3 shadow-sm">
              {testData.map(({ moduleHead, summary, id }, index) => (
                <>
                  <div
                    key={index}
                    className={`py-3 px-4 cursor-pointer ${
                      index === selectedIndex ? "bg-main text-white" : ""
                    }`}
                    onClick={() => handleItemClick(index, id)}
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Module;
