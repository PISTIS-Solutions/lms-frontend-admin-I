"use client";

import Image from "next/image";
import React from "react";

import dynamic from "next/dynamic";

import logo from "@/public/assets/full-logo.png";
import {
  Award,
  BookOpenText,
  GraduationCap,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const navTexts = [
    {
      icon: <LayoutDashboard />,
      title: "Dashboard",
      link: "dashboard",
    },
    {
      icon: <BookOpenText />,
      title: "Course Content",
      link: "courses",
      // otherLink: "courses/add-course/add-modules"
    },
    {
      icon: <GraduationCap />,
      title: "Students",
      link: "students",
    },
    {
      icon: <ListTodo />,
      title: "Projects",
      link: "project",
    },
    // {
    //   icon: <Award />,
    //   title: "Grading",
    //   link: "grading",
    // },
  ];

  const pathname = usePathname();

  return (
    <nav className="w-64 bg-main h-screen absolute top-0">
      <Image className=" m-auto py-5 px-5" src={logo} priority alt="logo" />
      <div className="flex justify-between flex-col h-[88%]">
        <div>
          {navTexts.map((nav, index) => {
            return (
              <Link href={`/${nav.link}`} key={index} className="">
                <div
                  className={`link ${
                    pathname === `/${nav.link}`
                      ? "bg-sub text-black border-r-[#6E6EF7] border-r-2"
                      : "text-white"
                  } flex items-center pl-5 gap-3  text-center hover:bg-sub hover:border-r-2 hover:border-r-[#6E6EF7] duration-150 ease-in-out cursor-pointer my-1 py-3`}
                >
                  <span> {nav.icon} </span>
                  <span className="text-lg">{nav.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div>
          <div className="text-white text-center hover:bg-sub hover:border-r-2 hover:border-r-[#6E6EF7] duration-150 ease-in-out cursor-pointer my-1 py-1">
            <Link href={"/settings"} className="">
              <div
                className={`link ${
                  pathname === "/settings"
                    ? "bg-sub text-black border-r-[#6E6EF7] border-r-2"
                    : "text-white"
                } flex items-center pl-5 gap-3  text-center hover:bg-sub hover:border-r-2 hover:border-r-[#6E6EF7] duration-150 ease-in-out cursor-pointer my-1 py-2`}
              >
                {" "}
                <Settings />
                <span className="text-lg">Settings</span>
              </div>
            </Link>
          </div>
          <Link href={"/log-out"} className="">
            <div
              className={`link ${
                pathname === "/log-out"
                  ? "bg-sub text-black border-r-[#6E6EF7] border-r-2"
                  : "text-white"
              } flex items-center pl-5 gap-3  text-center hover:bg-sub hover:border-r-2 hover:border-r-[#6E6EF7] duration-150 ease-in-out cursor-pointer my-1 py-2`}
            >
              {" "}
              <LogOut />
              <span className="text-lg">Log Out</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default dynamic(() => Promise.resolve(SideNav), { ssr: false });
