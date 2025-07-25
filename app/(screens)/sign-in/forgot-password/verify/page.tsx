import React from "react";
import Image from "next/image";
import logo from "@/src/assets/pistis_logo.png";
import enve from "@/src/assets/enve.png";
import Fulllogo from "@/src/assets/full-logo.png";

const verify_ForgotPassword = () => {
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
        <div className="flex flex-col md:h-screen h-[90%] justify-center items-center gap-5">
          <Image src={enve} priority alt="success" />
          <div>
            <h1 className="md:text-5xl text-3xl font-medium text-center">
              Check Your Mail
            </h1>
            <p className="text-center text-sm md:text-xl pt-5 text-[#3E3E3E]">
              We have sent a reset link to your registered email address, kindly
              click on the link to reset password
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default verify_ForgotPassword;
