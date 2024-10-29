"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import logo from "../../../../public/assets/pistis_logo.png";
import { Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Fulllogo from "@/public/assets/full-logo.png";
import AuthImageContainer from "@/components/side-comp/auth-image-container";
import coverImage from "@/public/assets/auth-image/sigin-in.webp";
import avatarImg from "@/public/assets/auth-image/gene.webp";

const formSchema = z.object({
  Password: z.string().min(6, {
    message: "Password must contain a minimum of 6 characters",
  }),
  Confirm: z.string().min(6, {
    message: "Password must be the same as the one above",
  }),
});

const NewPassowrd = () => {
  //submit function
  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.Password === values.Confirm) {
        if (!containsSpecialCharacters(values.Password)) {
          throw new Error("Password must contain special characters");
        }
        // console.log(values);
        // router.push("/create-account/verify");
      } else {
        throw new Error("Password and Confirm do not match");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  function containsSpecialCharacters(str: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
    return specialCharacters.test(str);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Password: "",
      Confirm: "",
    },
  });

  //toggle password
  const [showPassword, setShowPassword] = useState(true);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <main className="bg-white h-screen w-full flex relative">
      <AuthImageContainer
        avatarImage={avatarImg}
        bgImg={coverImage}
        quote="“The most powerful thing about DevOps is the way it encourages cross-team collaboration and learning. It breaks down silos and enables everyone to contribute to the entire lifecycle of software, from idea to production, fostering a culture of continuous improvement and innovation.”"
        avatarName="Gene Kim"
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
        <div className="px-2 my-10 md:my-0 md:px-0">
          <h1 className="md:text-4xl text-3xl font-semibold">Reset Password</h1>
          <h3 className="md:text-2xl text-lg ">
            Create a safe and secured password
          </h3>
        </div>
        <div className="px-2 md:px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm font-medium">
                      Create password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                        {showPassword ? (
                          <Eye
                            onClick={togglePassword}
                            className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                          />
                        ) : (
                          <EyeOff
                            onClick={togglePassword}
                            className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                          />
                        )}
                        <Input
                          type={showPassword ? "password" : "text"}
                          className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                          placeholder="Password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-[#3E3E3E] text-xs md:text-base text-right">
                Password must contain special characters
              </p>
              <FormField
                control={form.control}
                name="Confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm font-medium">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                        {showConfirmPassword ? (
                          <Eye
                            onClick={toggleConfirmPassword}
                            className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                          />
                        ) : (
                          <EyeOff
                            onClick={toggleConfirmPassword}
                            className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                          />
                        )}
                        <Input
                          type={showConfirmPassword ? "password" : "text"}
                          className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#33CC99] py-6 font-medium text-lg md:text-2xl text-black hover:text-white"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default NewPassowrd;
