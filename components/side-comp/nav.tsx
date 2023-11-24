"use client";
import Image from "next/image";
import React, { useState } from "react";

import pistis from "@/public/assets/full-logo.png";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <nav className="md:h-32 h-[37px] md:py-0 py-10 bg-main flex items-center justify-between px-5 md:px-10">
      <div>
        <Image src={pistis} className="md:w-auto w-5/6" alt="pistis" priority />
      </div>
      <div className=" md:flex hidden items-center gap-x-5">
        <Link href="/sign-in">
          <Button className="bg-sub py-[13px] hover:text-white px-[20px] text-xl text-black font-medium">
            Sign In
          </Button>
        </Link>

        <Link href="/create-account">
          <p className="text-xl hover:text-gray-200 text-white font-medium cursor-pointer">
            Create account
          </p>
        </Link>
      </div>
      <div className="md:hidden block" onClick={handleOpen}>
        <Menu className="text-2xl text-white" />
      </div>

      {open && (
        <div className="absolute right-0 bg-white p-2 h-[200px] top-20 w-full flex justify-center items-center gap-y-4">
          <div className="w-full ">
            <span onClick={handleOpen} className="flex justify-center pb-4">
              <X className="text-red-500" />
            </span>
            <Link href="/sign-in">
              <Button className="bg-main w-full">Sign In</Button>
            </Link>

            <Link href="/create-account">
              <p className="text-xl text-center font-medium py-4">
                Create account
              </p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
