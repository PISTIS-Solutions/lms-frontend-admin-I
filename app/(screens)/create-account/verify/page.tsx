"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../../public/assets/pistis_logo.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="text-4xl font-semibold">Verify Account</h1>
          <h3 className="text-2xl">
            Please enter the 5 digit code sent to your email address to complete
            your sign up process
          </h3>
        </div>
        <div>
          <form className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="border border-[#33CC99] w-24 text-6xl text-center h-24 rounded-full "
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
              />
            ))}
          </form>
          <Button
            type="submit"
            onClick={handleOtpSubmit}
            disabled={isFormIncomplete}
            className="w-full mt-36 bg-[#33CC99] py-6 font-medium text-2xl text-black hover:text-white"
          >
            Submit
          </Button>
        </div>
        <div>
          <p className="text-center text-lg font-normal ">
            Didn’t get a code? <Link href=""> Resend in 60s</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Verify_SignUp;
