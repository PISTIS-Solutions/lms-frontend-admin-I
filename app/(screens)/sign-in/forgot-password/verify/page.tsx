import React from "react";
import Image from "next/image";

import logo from "@/public/assets/pistis_logo.png";
import enve from "@/public/assets/enve.png";

import Fulllogo from "@/public/assets/full-logo.png";
import AuthImageContainer from "@/components/side-comp/auth-image-container";

import coverImage from "@/public/assets/auth-image/verify.webp";
import avatarImg from "@/public/assets/auth-image/kelsey.webp";

const verify_ForgotPassword = () => {
  return (
    <main className="bg-white h-screen w-full relative flex">
      <AuthImageContainer
        bgImg={coverImage}
        avatarImage={avatarImg}
        avatarName="Kelsey Hightower"
        quote="“You don’t need to be an expert to start with DevOps. The key is a willingness to learn, collaborate, and embrace automation. Every small step you take towards improving your processes brings you closer to success.”"
      />
      <div className="bg-white w-full md:w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] block md:flex flex-col justify-around px-0 md:px-10 xl:px-16">
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
