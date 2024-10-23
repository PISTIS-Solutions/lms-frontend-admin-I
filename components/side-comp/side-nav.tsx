"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import logo from "@/public/assets/sideLogo.png";

import { MdDashboard } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { RiGraduationCapFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoHelpCircle } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./mobile-nav";

const SideNav = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("admin_role");
    setRole(userRole);
  }, []);

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

  const pathname = usePathname();

  return (
    <div>
      <nav className="w-64 hidden lg:block bg-main h-screen absolute top-0">
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
                    } flex items-center pl-5 gap-3 text-center hover:text-white hover:border-l-4 hover:border-l-white duration-150 ease-in-out cursor-pointer my-1 py-3`}
                  >
                    <span>{nav.icon}</span>
                    <span className=" text-base font-medium">{nav.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            <div className="">
              <Link href={"/help"} className="">
                <div
                  className={`link ${
                    pathname === "/help"
                      ? " text-white border-l-white border-l-4"
                      : "text-[#5E5E9F]"
                  } flex items-center pl-5 gap-3 text-center hover:text-white hover:border-l-4 hover:border-l-white duration-150 ease-in-out cursor-pointer my-1 py-3`}
                >
                  {" "}
                  <IoHelpCircle />
                  <span className="text-lg">Help & Information</span>
                </div>
              </Link>
            </div>
            <div>
              <Link href={"/log-out"} className="">
                <div
                  className={`link ${
                    pathname.includes("/log-out")
                      ? " text-[#FF0000] border-l-white border-l-4"
                      : "text-[#FF0000]"
                  } flex items-center pl-5 gap-3 text-center hover:text-white hover:border-l-4 hover:border-l-white duration-150 ease-in-out cursor-pointer my-1 py-3`}
                >
                  <IoIosLogOut />
                  <span className=" text-base font-medium">Log out</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="lg:hidden block">
        <MobileNav role={role} />
      </div>
    </div>
  );
};

export default SideNav;
