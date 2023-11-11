"use client";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ChevronRight, Edit3, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { dummydata } from "@/app/data/dummyModules";
import { Button } from "@/components/ui/button";

const SingleProject = () => {
  const params = useParams<{ project: string }>();

  const projectData = dummydata.find(
    (item) => item.id === parseInt(params.project, 10)
  );

  if (!projectData) {
    return (
      <div className="text-4xl text-red-500 text-center">Module empty!</div>
    );
  }

  const router = useRouter();
  const dummyHeader = [
    {
      title: "User Management Project",
    },
    {
      title: "User Management Project",
    },
    {
      title: "User Management Project",
    },
    {
      title: "User Management Project",
    },
    {
      title: "User Management Project",
    },
    {
      title: "User Management Project",
    },
    {
      title: "User Management Project",
    },
    {
      title: "User Management Project",
    },
    {
      title: "User Management Project",
    },
    {
      title: "User Management Project",
    },
  ];
  const dummyObjectives = [
    {
      objHead: "Objective",
      ObjBody: "Create and manage user accounts on a Linux system.",
    },
    {
      objHead: "Step 1: Access the Linux System",
      ObjBody:
        "Access your Linux system through a terminal, SSH, or by logging in directly if you have physical access.",
    },
    {
      objHead: "Step 1: Access the Linux System",
      ObjBody:
        "Access your Linux system through a terminal, SSH, or by logging in directly if you have physical access.",
    },
    {
      objHead: "Step 1: Access the Linux System",
      ObjBody:
        "Access your Linux system through a terminal, SSH, or by logging in directly if you have physical access.",
    },
    {
      objHead: "Step 1: Access the Linux System",
      ObjBody:
        "Access your Linux system through a terminal, SSH, or by logging in directly if you have physical access.",
    },
    {
      objHead: "Step 1: Access the Linux System",
      ObjBody:
        "Access your Linux system through a terminal, SSH, or by logging in directly if you have physical access.",
    },
    {
      objHead: "Step 1: Access the Linux System",
      ObjBody:
        "Access your Linux system through a terminal, SSH, or by logging in directly if you have physical access.",
    },
    {
      objHead: "Step 1: Access the Linux System",
      ObjBody:
        "Access your Linux system through a terminal, SSH, or by logging in directly if you have physical access.",
    },
    {
      objHead: "Step 1: Access the Linux System",
      ObjBody:
        "Access your Linux system through a terminal, SSH, or by logging in directly if you have physical access.",
    },
    {
      objHead: "Step 1: Access the Linux System",
      ObjBody:
        "Access your Linux system through a terminal, SSH, or by logging in directly if you have physical access.",
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
        <div className="grid grid-cols-10 gap-x-4 p-5">
          <div className="col-span-7 bg-white shadow-md rounded-[8px]  ">
            <div>
              {dummyObjectives.map((obj) => {
                return (
                  <div>
                    <div className="p-4">
                      <h2 className="font-medium text-2xl text-main">
                        {obj.objHead}
                      </h2>
                      <p className="font-normal py-2 text-[#3E3E3E] text-xl">
                        {obj.ObjBody}
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-3">
            <div className="bg-white shadow-md rounded-[8px]">
              <div className="text-main p-4 text-2xl font-medium flex justify-between items-center py-2">
                <h3>Projects</h3>
                <span className="flex items-center gap-1 cursor-pointer">
                  <p className="underline">Add</p>
                  <Plus />
                </span>
              </div>
              <div className="">
                {dummyHeader.map((head, index) => {
                  return (
                    <div className="cursor-pointer hover:bg-main">
                      <h3
                        key={index}
                        className="text-lg py-3 px-4 hover:text-white flex justify-between items-center font-medium"
                      >
                        {index + 1}. {head.title}
                        <ChevronRight />
                      </h3>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="my-5">
              <Button className="bg-sub w-full text-xl font-medium text-black hover:bg-main hover:text-white">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleProject;
