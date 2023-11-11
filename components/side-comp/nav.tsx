import Image from "next/image";
import React from "react";

import pistis from "@/public/assets/full-logo.png";
import { Button } from "../ui/button";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <nav className="h-32 bg-main flex items-center justify-between px-10">
      <div>
        <Image src={pistis} alt="pistis" priority/>
      </div>
      <div className="flex items-center gap-x-5">
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
    </nav>
  );
};

export default NavigationBar;
