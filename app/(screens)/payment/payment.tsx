"use client";

import React, { useState } from "react";
import Image from "next/image";

import logo from "@/public/assets/pistis_logo.png";
// import { Eye, EyeOff, KeyRound, Loader2, Mail } from "lucide-react";
// import Link from "next/link";
import { useRouter } from "next/navigation";
// import useLoginFormStore from "@/store/sign-in-store";
// import axios from "axios";
// import { urls } from "@/utils/config";

const Payment = () => {

    const router = useRouter();
    
    return (
        <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">

        <div className="bg-white w-[100%] sm:w-[50%] h-screen rounded-none md:rounded-tl-[40px] md:rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-10">
          <div className="flex justify-end">
            <Image src={logo} alt="pistis_logo" className="" priority />
          </div>
          <div className="">
            <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
              Choose Plan
            </h1>
            <h3 className="md:text-2xl sm:text-lg text-base">
              hello
            </h3>
          </div>
          </div>
      </main>
    )
}