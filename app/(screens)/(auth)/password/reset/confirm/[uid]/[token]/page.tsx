"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import logo from "@/public/assets/pistis_logo.png";
import {  KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import useForgotPassStore from "@/store/forgot-password";
import { urls } from "@/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPassword = () => {
  const passwordStore = useForgotPassStore();
  const params = useParams<{ uid: any; token: any }>();
  const router = useRouter();
  const [specialCharacterErr, setSpecialCharacterErr] = useState();
  const [loading, setLoading] = useState<boolean>();

  const onSubmitChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (passwordStore.password === passwordStore.confirm) {
        if (!containsSpecialCharacters(passwordStore.password)) {
          throw new Error("Password must contain special characters");
        }
        setLoading(true);
        const response = await fetch(urls.changePassword, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: params.uid,
            token: params.token,
            new_password: passwordStore.password,
            re_new_password: passwordStore.confirm,
          }),
        });
        if (response.ok) {
          toast.success("Password changed Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          router.push("/");
        }
      }
    } catch (error: any) {
      setSpecialCharacterErr(error.message);
      if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
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
      <div className="bg-white w-[100%] lg:w-[50%] h-screen rounded-none lg:rounded-tl-[40px] lg:rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-5  md:px-6 lg:px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
            Reset Password
          </h1>
          <h3 className="md:text-2xl sm:text-lg text-base">
            Create a safe and secured password
          </h3>
        </div>
        <ToastContainer />
        <div>
          <form onSubmit={onSubmitChangePassword} className="space-y-3">
            <p className="text-[#3E3E3E] md:text-xl sm:text-base text-sm">
              Create Password
            </p>
            <div className="relative">
              <KeyRound className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
              {passwordStore.showPassword ? (
                <Eye
                  onClick={passwordStore.togglePassword}
                  className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                />
              ) : (
                <EyeOff
                  onClick={passwordStore.togglePassword}
                  className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                />
              )}
              <input
                type={passwordStore.showPassword ? "text" : "password"}
                className="py-4 bg-[#FAFAFA] text-xs md:text-base  placeholder:text-[#4F5B67] rounded-[6px] indent-9 w-full"
                placeholder="Password"
                value={passwordStore.password}
                onChange={(e) =>
                  passwordStore.setField("password", e.target.value)
                }
              />
            </div>
            <p className="text-xl font-semibold">Confirm password</p>
            <div className="relative">
              <KeyRound className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
              {passwordStore.showConfirmPassword ? (
                <Eye
                  onClick={passwordStore.toggleConfirmPassword}
                  className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                />
              ) : (
                <EyeOff
                  onClick={passwordStore.toggleConfirmPassword}
                  className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                />
              )}
              <input
                type={passwordStore.showConfirmPassword ? "text" : "password"}
                className="py-4 bg-[#FAFAFA] text-xs md:text-base  placeholder:text-[#4F5B67] rounded-[6px] indent-9 w-full"
                placeholder="Confirm Password"
                value={passwordStore.confirm}
                onChange={(e) =>
                  passwordStore.setField("confirm", e.target.value)
                }
              />
            </div>
            <p className="text-red-500 text-xs md:text-sm lg:text-base text-center">
              Password must contain special characters
            </p>
            <div>
              <p className="text-red-500 text-center">{specialCharacterErr}</p>
              {passwordStore.password != passwordStore.confirm ? (
                <p className="text-red-500 text-xs md:text-sm lg:text-base text-center">
                  Password and Confirm password contains different characters
                </p>
              ) : (
                <></>
              )}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#33CC99] py-4 flex justify-center items-center rounded-[8px] font-medium text-lg md:text-2xl text-black hover:text-white"
            >
              {loading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <>Submit</>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default NewPassword;
