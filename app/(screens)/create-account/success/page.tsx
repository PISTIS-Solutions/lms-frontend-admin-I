"use client";

import React from "react";
import Image from "next/image";

import logo from "../../../../public/assets/pistis_logo.png";
import envelope from "../../../../public/assets/enve.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Fulllogo from "@/public/assets/full-logo.png";

const VerifySuccess = () => {
  const router = useRouter();
  return (
    <main className="md:bg-form-back bg-white h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-full md:w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 block md:flex flex-col justify-around px-0 md:px-10">
        <div className="h-auto block md:hidden w-full bg-main p-2">
          <Image src={Fulllogo} alt="logo" />
        </div>
        <div className="flex justify-end">
          <Image
            src={logo}
            alt="pistis_logo"
            className="md:block hidden"
            priority
          />
        </div>
        <div className="">
          <div className="flex justify-center py-4">
            <Image src={envelope} alt="enve" priority />
          </div>
          <div className="py-10 px-2 my-10 md:my-0 md:px-0">
            <h1 className="md:text-4xl text-3xl text-center font-semibold">
              Your mail has been verified
            </h1>
            <h3 className="md:text-2xl text-lg py-5 md:py-0 text-center">
              We're thrilled to have you on board. Your decision to join us is a
              fantastic step towards the beginning of your success story
            </h3>
          </div>
        </div>
        <div>
          <div className="px-2 md:px-2">
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
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default VerifySuccess;
