"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/src/assets/pistis_logo.png";
import { Eye, EyeOff, KeyRound, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLoginFormStore from "@/store/sign-in-store";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import coverImage from "@/src/assets/auth-image/sigin-in.webp";
import avatarImg from "@/src/assets/auth-image/gene.webp";
import InputField from "@/components/side-comp/sign-in/inputField";

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
      const response = await axios.post(url, {
        email: formStore.email,
        password: formStore.password,
      });
      if (response.status === 200) {
        toast.success("Successfully Logged in!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        localStorage.setItem("admin_role", response.data.user.role);
        Cookies.set("adminAccessToken", response.data.access, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("adminRefreshToken", response.data.refresh, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("fullName", response.data.user.full_name, {
          sameSite: "None",
          secure: true,
        });
        route.replace("/dashboard");
        setLoading(false);
      }
    } catch (error: any) {
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
      } else if (
        error?.response?.data?.detail ===
        "No active account found with the given credentials"
      ) {
        toast.error("Incorrect email and password!", {
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
    <main className="h-screen w-full flex relative">
      {/* <NextNProgress />  */}
      <div className=" w-[100%] lg:w-[50%] p-10  sticky top-0  pr-0 hidden lg:block">
        <div className="relative h-full">
          <Image
            src={coverImage}
            alt="auth image"
            className="w-full h-full object-fill "
          />
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-[20px]  text-white w-[78.8%] ml-[24px] mb-[24px] ">
            <div className="auth-border_gradient ">
              <blockquote className="mb-4 leading-relaxed font-sfProDisplay ">
                “The most powerful thing about DevOps is the way it encourages
                cross-team collaboration and learning. It breaks down silos and
                enables everyone to contribute to the entire lifecycle of
                software, from idea to production, fostering a culture of
                continuous improvement and innovation.”
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={avatarImg}
                    alt="avatar image"
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm"
                  />
                </div>
                <p className="font-semibold text-2xl">Gene Kim</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-[100%] lg:w-[50%] h-screen rounded-none lg:rounded-tl-[40px] lg:rounded-bl-[40px] flex flex-col justify-around px-5  md:px-6 lg:px-10 xl:px-16">
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
        <ToastContainer />
        <div>
          <form onSubmit={onsubmitLogin} className="space-y-2">
            <InputField
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="example@gmail.com"
              value={formStore.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                formStore.setField("email", e.target.value)
              }
            />
            <InputField
              label="Password"
              type={formStore.showPassword ? "text" : "password"}
              icon={KeyRound}
              placeholder="Password"
              value={formStore.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                formStore.setField("password", e.target.value)
              }
              toggleIcon={formStore.showPassword ? Eye : EyeOff}
              onToggle={formStore.togglePassword}
            />

            <p className="text-[#3E3E3E] text-xs md:text-sm lg:text-base text-right">
              <Link href="/sign-in/forgot-password">Forgot Password?</Link>
            </p>
            {!containsSpecialCharacters(formStore.password) && (
              <p className="text-red-500 text-xs md:text-sm lg:text-base text-center">
                Password must contain special characters
              </p>
            )}
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
      </div>
    </main>
  );
};

export default SignIn;
