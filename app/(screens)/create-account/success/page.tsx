"use client"

import React from "react";
import Image from "next/image";

import logo from "../../../../public/assets/pistis_logo.png";
import envelope from "../../../../public/assets/enve.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const VerifySuccess = () => {
  const router = useRouter();
  return (
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <div className="flex justify-center py-4">
            <Image src={envelope} alt="enve" priority />
          </div>
          <div className="py-10">
            <h1 className="text-5xl font-semibold text-center">
              Your mail has been verified
            </h1>
            <h3 className="text-xl text-center py-4">
              We're thrilled to have you on board. Your decision to join us is a
              fantastic step towards the beginning of your success story
            </h3>
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              router.push("/create-account/complete-profile");
            }}
            type="submit"
            className="w-full bg-[#33CC99] py-6 font-medium text-2xl text-black hover:text-white"
          >
            Continue
          </Button>
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default VerifySuccess;
