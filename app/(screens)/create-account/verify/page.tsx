"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../../public/assets/pistis_logo.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Fulllogo from "@/public/assets/full-logo.png";

const Verify_SignUp = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (index < 4 && value !== "") {
        const nextInput =
          e.target.parentElement?.nextElementSibling?.querySelector("input");
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const router = useRouter();

  const handleOtpSubmit = () => {
    console.log("OTP Submitted:", otp.join(""));
    router.push("/create-account/success");
  };

  const isFormIncomplete = otp.some((digit) => digit === "");

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
        <div className="px-2 my-10 md:my-0 md:px-0">
          <h1 className="md:text-4xl text-3xl font-semibold">Verify Account</h1>
          <h3 className="md:text-2xl text-lg ">
            Please enter the 5 digit code sent to your email address to complete
            your sign up process
          </h3>
        </div>
        <div>
          <form className="flex justify-around md:justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="border border-[#33CC99] w-14 md:w-24 h-14 md:h-24 text-3xl md:text-6xl text-center  rounded-full "
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
              />
            ))}
          </form>
          <div className="px-2 md:px-0">
            <Button
              type="submit"
              onClick={handleOtpSubmit}
              disabled={isFormIncomplete}
              className="w-full mt-36 bg-[#33CC99] py-6 font-medium text-2xl text-black hover:text-white"
            >
              Submit
            </Button>
          </div>
        </div>
        <div>
          <p className="text-center text-sm absolute bottom-4 md:sticky w-full md:text-lg font-normal ">
            Didn’t get a code? <Link href=""> Resend in 60s</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Verify_SignUp;
