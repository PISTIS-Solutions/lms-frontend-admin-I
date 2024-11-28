"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

import logo from "@/public/assets/sideLogo.png";
import { RiArrowLeftFill } from "react-icons/ri";

import { MdDashboard } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { RiGraduationCapFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoHelpCircle } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useOutsideClick } from "@/utils/outsideClick";

const MobileNav = ({ role }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const sideNavRef = useRef<HTMLDivElement>(null);

  useOutsideClick(sideNavRef, () => setSidebarOpen(false));

  const navTexts: any[] = [
    {
      icon: <MdDashboard />,
      title: "Dashboard",
      link: "dashboard",
    },
    {
      icon: <ImBooks />,
      title: "Course Content",
      link: "courses",
      // otherLink: "courses/add-course/add-modules"
    },
    {
      icon: <RiGraduationCapFill />,
      title: "Students",
      link: "students",
    },
    {
      icon: <CgNotes />,
      title: "Projects",
      link: "project",
    },
    role === "super_admin" && {
      icon: <FaChalkboardUser />,
      title: "Mentors",
      link: "mentors",
    },
    {
      icon: <IoMdSettings />,
      title: "Settings",
      link: "settings",
    },
  ].filter(Boolean);

  return (
    <div className="relative sm:w-1/3 w-1/2 z-[98]">
      <div
        className={`absolute bg-main rounded-full top-6 z-[99] ${
          sidebarOpen ? "-right-4" : "ml-2"
        }`}
      >
        <button className="p-2 text-white" onClick={toggleSidebar}>
          {sidebarOpen ? <RiArrowLeftFill /> : <IoMenuSharp />}
        </button>
      </div>
      <nav
        ref={sideNavRef}
        className={`w-full bg-main h-screen absolute top-0 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <Image className=" m-auto py-5 px-5" src={logo} priority alt="logo" /> */}
        <Image className="py-14 px-5" src={logo} priority alt="logo" />
        <div className="flex justify-between flex-col h-[80%]">
          <div>
            {navTexts.map((nav, index) => {
              return (
                <Link href={`/${nav.link}`} key={index} className="">
                  <div
                    className={`link ${
                      pathname.includes(`/${nav.link}`)
                        ? " text-white border-l-white border-l-4"
                        : "text-[#5E5E9F]"
                    } flex items-center pl-4 gap-2 text-center duration-150 ease-in-out cursor-pointer my-1 py-3 sm:py-6`}
                  >
                    <span className=""> {nav.icon} </span>
                    <span className="text-sm">{nav.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            <div className="text-white text-center duration-150 ease-in-out cursor-pointer my-1 py-1">
              {/* <Link href={"/help"} > */}
              <div
                className={`link ${
                  pathname === "/help"
                    ? " text-white border-l-white border-l-4"
                    : "text-[#5E5E9F]"
                } flex items-center pl-4 gap-2 text-center duration-150 ease-in-out cursor-pointer my-1 py-3`}
              >
                {" "}
                <IoHelpCircle />
                <span className="text-sm">Help & Information</span>
              </div>
              {/* </Link> */}
            </div>
            <Link href={"/log-out"} className="">
              <div
                className={`link ${
                  pathname === "/log-out"
                    ? " text-[#FF0000] border-l-white border-l-4"
                    : "text-[#FF0000]"
                } flex items-center pl-4 gap-2 text-center duration-150 ease-in-out cursor-pointer mb-2 py-3`}
              >
                {" "}
                <IoIosLogOut />
                <span className="text-sm">Log Out</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
