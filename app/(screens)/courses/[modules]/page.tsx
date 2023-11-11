"use client";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ChevronRight, Edit3, Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import img from "@/public/assets/course/ansible.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummydata } from "@/app/data/dummyModules";

const Module = () => {
  const params = useParams<{ modules: string }>();

  const moduleData = dummydata.find(
    (item) => item.id === parseInt(params.modules, 10)
  );

  if (!moduleData) {
    return (
      <div className="text-4xl text-red-500 text-center">Module empty!</div>
    );
  }

  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index === selectedIndex ? -1 : index);
  };

  const testData = [
    {
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
    {
      moduleHead: "What is Ansible?",
      summary: "Introduction to ansible",
    },
  ];

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="ml-64 overflow-y-scroll h-screen">
        <div className="h-[96px] flex justify-between items-center bg-white shadow-md p-4 w-full">
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
              <p className="text-sm text-[#5D5B5B]">Admin</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className=" px-4 mt-3 text-sm font-medium flex items-center">
            <p className="text-[#000066]">Course Content</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#9C9C9C] ">Modules</p>
          </div>
          <div>
            <h1 className=" px-4 text-[#1A1A1A] text-2xl my-4 font-medium">
              {moduleData.title}
            </h1>
            <div className="grid p-4 gap-x-4 grid-cols-10">
              <Image
                className="w-full h-[428px] col-span-7"
                src={img}
                priority
                alt="course-module"
              />
              <ScrollArea className="h-[428px] rounded-[8px] shadow-md bg-white col-span-3">
                <div className="text-main p-4 text-2xl font-medium flex justify-between items-center py-2">
                  <h3>Modules</h3>
                  <span className="flex items-center gap-1 cursor-pointer">
                    <p className="underline">Add</p>
                    <Plus />
                  </span>
                </div>
                <div>
                  {testData.map(({ moduleHead, summary }, index) => (
                    <>
                      <div
                        key={index}
                        className={`py-3 px-4 cursor-pointer ${
                          index === selectedIndex ? "bg-main text-white" : ""
                        }`}
                        onClick={() => handleItemClick(index)}
                      >
                        <h2 className="text-lg font-medium">
                          {index + 1}. {moduleHead}
                        </h2>
                        <p
                          className={`text-sm font-normal ${
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
              </ScrollArea>
            </div>
            <div className="bg-white shadow-md p-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium">
                  Module 1: Introduction to Ansible
                </h1>
                <span className=" text-xl text-main underline gap-x-2 cursor-pointer flex items-center">
                  <p className="">Edit</p>
                  <Edit3 />
                </span>
              </div>
              <div>
                <p className="text-xl py-4 text-[#3E3E3E]">
                  The current course builds upon the previous one seamlessly.
                  You'll delve into the core concepts of Ansible and have
                  hands-on experience with a project. Just like in previous
                  classes, we strongly advise you to engage in practice, as it's
                  the most effective way to grasp the material. Ansible is an
                  open-source automation tool designed for configuration
                  management, application deployment, task automation, and
                  orchestration. It allows you to manage and control a large
                  number of servers or devices from a single control machine.
                  Ansible uses a simple and human-readable syntax, which makes
                  it easy to learn and use. You have a timeline of 2weeks to
                  finish this course. <br /> Best of luck!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Module;
