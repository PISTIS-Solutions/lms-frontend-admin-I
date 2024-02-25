"use client";

import React, { useState } from "react";
import Image from "next/image";

import logo from "../../../public/assets/pistis_logo.png";
import { Eye, EyeOff, KeyRound, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLoginFormStore from "@/store/sign-in-store";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";

const SignIn = () => {
  const formStore = useLoginFormStore();
  const route = useRouter();
  const [loading, setLoading] = useState<boolean>();

  const onsubmitLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!containsSpecialCharacters(formStore.password)) {
        throw new Error("Password must contain special characters");
      }
      const url = urls.signin;

      // Make the API request
      const response = await axios.post(url, {
        email: formStore.email,
        password: formStore.password,
      });

      if (response.status === 200) {
        Cookies.set("authToken", response.data.access);
        Cookies.set("adminRefreshToken", response.data.refresh);
        Cookies.set("userName", response.data.user.userName);
        route.replace("/dashboard");
      }
    } catch (error: any) {
      console.error("Error completing profile:", error.message);
    } finally {
      setLoading(false);
    }
  };

  function containsSpecialCharacters(str: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
    return specialCharacters.test(str);
  }

  return (
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[100%] sm:w-[50%] h-screen rounded-none md:rounded-tl-[40px] md:rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
            Sign In
          </h1>
          <h3 className="md:text-2xl sm:text-lg text-base">
            Glad to have you back!
          </h3>
        </div>
        <div>
          <form onSubmit={onsubmitLogin} className="space-y-2">
            <div>
              <label className="text-[#3E3E3E] md:text-xl text-base sm:text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
                <input
                  type="email"
                  className="py-4 bg-[#FAFAFA] w-full text-xs md:text-base placeholder:text-[#4F5B67] rounded-[6px] indent-7"
                  placeholder="example@gmail.com"
                  value={formStore.email}
                  onChange={(e) => formStore.setField("email", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-[#3E3E3E] md:text-xl text-base sm:text-sm">
                Password
              </label>
              <div className="relative">
                <KeyRound className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
                {formStore.showPassword ? (
                  <Eye
                    onClick={formStore.togglePassword}
                    className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                  />
                ) : (
                  <EyeOff
                    onClick={formStore.togglePassword}
                    className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                  />
                )}
                <input
                  type={formStore.showPassword ? "text" : "password"}
                  className="py-4 bg-[#FAFAFA] text-xs md:text-base  placeholder:text-[#4F5B67] rounded-[6px] indent-7 w-full"
                  placeholder="Password"
                  value={formStore.password}
                  onChange={(e) =>
                    formStore.setField("password", e.target.value)
                  }
                />
              </div>
            </div>
            <p className="text-[#3E3E3E] text-sm md:text-base text-right">
              <Link href="/sign-in/forgot-password">Forgot Password?</Link>
            </p>
            {/* <p className="text-red-500 text-center">{specialCharacterErr}</p> */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#33CC99] py-4 flex justify-center items-center rounded-[8px] font-medium text-lg md:text-2xl text-black hover:text-white"
            >
              {loading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <>Sign In</>
              )}
            </button>
          </form>
        </div>
        <div>
          <p className="text-center text-base md:text-lg font-normal ">
            Don't have an account?{" "}
            <Link className="text-main font-semibold" href="/create-account">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
