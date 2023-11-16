"use client";

import Image from "next/image";
import React, { useState } from "react";

import logo from "@/public/assets/full-logo.png";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Award,
  BookOpenText,
  GraduationCap,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
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

  return (
    <div className="relative w-36 z-[98]">
      <div className={`absolute bg-main rounded-full top-6 z-[99] ${sidebarOpen ? "-right-4" : "ml-2"}`}>
        <button className="p-2 text-white" onClick={toggleSidebar}>
          {sidebarOpen ? <ArrowLeftCircle /> : <Menu />}
        </button>
      </div>
      <nav
        className={`w-36 bg-main h-screen absolute top-0 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
                    } flex items-center pl-1 gap-1 text-center duration-150 ease-in-out cursor-pointer my-1 py-2`}
                  >
                    <span className=""> {nav.icon} </span>
                    <span className="text-xs">{nav.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            <div className="text-white text-center duration-150 ease-in-out cursor-pointer my-1 py-1">
              <Link href={"/settings"} className="">
                <div
                  className={`link ${
                    pathname === "/settings"
                      ? "bg-sub text-black border-r-[#6E6EF7] border-r-2"
                      : "text-white"
                  } flex items-center pl-1 gap-1 text-center duration-150 ease-in-out cursor-pointer my-1 py-2`}
                >
                  {" "}
                  <Settings />
                  <span className="text-xs">Settings</span>
                </div>
              </Link>
            </div>
            <Link href={"/log-out"} className="">
              <div
                className={`link ${
                  pathname === "/log-out"
                    ? "bg-sub text-black border-r-[#6E6EF7] border-r-2"
                    : "text-white"
                } flex items-center pl-1 gap-1 text-center duration-150 ease-in-out cursor-pointer my-1 py-2`}
              >
                {" "}
                <LogOut />
                <span className="text-xs">Log Out</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
