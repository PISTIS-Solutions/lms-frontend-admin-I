"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import logo from "@/public/assets/pistis_logo.png";
import { Mail, KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import useForgotPassStore from "@/store/forgot-password";
import { urls } from "@/utils/config";

const NewPassword = () => {
  const passwordStore = useForgotPassStore();
  const params = useParams<{ uid: any; token: any }>();
  const router = useRouter();

  const [specialCharacterErr, setSpecialCharacterErr] = useState();
  const [loading, setLoading] = useState<boolean>();
  const [modal, setModal] = useState<boolean>(false);

  //submit function
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
          setModal(true);
          // router.push("/create-account/activate/[uid]");
        } else {
          // setModal(false);
        }
      }
    } catch (error: any) {
      setSpecialCharacterErr(error.message);
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
      <div className="bg-white w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="text-4xl font-semibold">Reset Password</h1>
          <h3 className="text-2xl">Create a safe and secured password</h3>
        </div>
        <div>
          <form onSubmit={onSubmitChangePassword} className="space-y-3">
            <p className="text-xl font-semibold">Create Password</p>
            <div className="relative">
              <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
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
                className="py-4 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-10 w-full"
                placeholder="Password"
                value={passwordStore.password}
                onChange={(e) =>
                  passwordStore.setField("password", e.target.value)
                }
              />
            </div>
            <p className="text-[#3E3E3E] text-base text-right">
              Password must contain special characters
            </p>
            <p className="text-xl font-semibold">Confirm password</p>
            <div className="relative">
              <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
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
                className="py-4 w-full bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-10"
                placeholder="Confirm Password"
                value={passwordStore.confirm}
                onChange={(e) =>
                  passwordStore.setField("confirm", e.target.value)
                }
              />
            </div>
            <div>
              {modal && (
                <p className="text-green-500 text-md text-center">
                  Password Changed Successfully
                </p>
              )}
              <p className="text-red-500 text-center">{specialCharacterErr}</p>
              {passwordStore.password != passwordStore.confirm ? (
                <p className="text-red-500 text-center">
                  Password and Confirm password contains different characters
                </p>
              ) : (
                <></>
              )}
            </div>
            <button
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
        <div></div>
      </div>
    </main>
  );
};

export default NewPassword;
