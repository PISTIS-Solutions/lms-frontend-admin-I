"use client";
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoursesCard from "@/components/side-comp/courses-card";

import Link from "next/link";
import { dummydata } from "@/app/data/dummyModules";
import { useRouter } from "next/navigation";

const Courses = () => {
  const router = useRouter();
  const handleCardClick = (id: any) => {
    router.push(`/courses/${id}`);
  };

  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal((prev) => !prev);
  };

  return (
    <div className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="ml-64 overflow-y-scroll h-screen">
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
        <div className="py-2 px-7">
          <div className="flex justify-end">
            <Link href="/courses/add-course">
              <Button className="flex items-center gap-x-2 cursor-pointer text-black hover:text-white bg-sub">
                New Course
                <Plus />
              </Button>
            </Link>
          </div>
          <div className="my-5 grid grid-cols-3 gap-5">
            {dummydata.map((fake) => {
              return (
                <CoursesCard
                  id={fake.id}
                  handleCardClick={handleCardClick}
                  handleOpen={handleOpen}
                  img={fake.img}
                  title={fake.title}
                  paragraph={fake.paragraph}
                  module={fake.module}
                  duration={fake.duration}
                />
              );
            })}
          </div>
        </div>
        {modal && (
          <section className="absolute top-0 flex justify-center items-center left-0 bg-slate-100/50 h-screen w-full">
            <div className="bg-white py-14 px-7 h-[200px] rounded-[8px] w-[608px]">
              <h1 className="text-2xl font-medium">Delete Course</h1>
              <p className="text-xl text-[#3E3E3E] font-normal">
                Are you sure you want to delete this course? You will not be
                able to retrieve it later
              </p>
              <div className="flex gap-x-2 justify-end items-center">
                <Button className="bg-red-500 text-white text-lg rounded-[8px]">
                  Delete
                </Button>
                <p className="cursor-pointer text-lg" onClick={handleOpen}>
                  Cancel
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Courses;
