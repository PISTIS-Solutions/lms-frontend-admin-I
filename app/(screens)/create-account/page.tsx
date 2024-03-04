"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import logo from "../../../public/assets/pistis_logo.png";
import { Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  Email: z.string().min(2, {
    message: "Input correct email address",
  }),
  Password: z.string().min(6, {
    message: "Password must contain a minimum of 6 characters",
  }),
  Confirm: z.string().min(6, {
    message: "Password must be the same as the one above",
  }),
});

const SignUp = () => {
  //submit function
  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.Password === values.Confirm) {
        if (!containsSpecialCharacters(values.Password)) {
          throw new Error("Password must contain special characters");
        }
        router.push("/create-account/verify");
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
      Email: "",
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
          <h1 className="md:text-4xl text-3xl font-semibold">Create Account</h1>
          <h3 className="md:text-2xl text-lg ">Let’s get you started</h3>
        </div>
        <div className="px-2 md:px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                        <Input
                          type="email"
                          className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <p className="text-[#3E3E3E] text-xs md:text-base text-right">
                Password must contain special characters
              </p>
              <Button
                type="submit"
                className="w-full bg-[#33CC99] py-6 font-medium text-lg md:text-2xl text-black hover:text-white"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <p className="text-center text-sm absolute bottom-4 md:sticky w-full md:text-lg font-normal ">
            Already have an account? <Link href="/sign-in">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
