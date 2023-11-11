"use client";
import React, { useState } from "react";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

import user from "@/public/assets/avatar.png";
import { EditIcon, Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  Email: z.string().min(2, {
    message: "Input correct email address",
  }),
  fullName: z.string(),
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

const SettingsPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      fullName: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [notSame, setNotSame] = useState("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.confirmPassword === values.newPassword) {
      console.log(values);
      setNotSame("");
    } else {
      setNotSame("New Password and Confirm Password must be the same");
    }
  }

  const [showPassword, setShowPassword] = useState(true);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [showNewPassword, setShowNewPassword] = useState(true);
  const toggleNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <main>
      <SideNav />
      <div className="ml-64  bg-[#F8F9FF] overflow-y-scroll h-screen">
        <div className="h-[96px] flex justify-end bg-white shadow-md p-4 w-full">
          <div className="flex items-center gap-2">
            <Avatar>
              {/* <AvatarImage src={avatar} /> */}
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-base font-medium ">John Mark</h1>
              <p className="text-sm text-[#5D5B5B]">Admin</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div>
            <div className=" flex justify-center items-center">
              <div className="relative">
                <Image
                  className="w-[159px] h-[159px] rounded-full"
                  src={user}
                  alt="user"
                  priority
                />
                <span className="bg-white rounded-full cursor-pointer absolute bottom-0 right-0 p-2">
                  <EditIcon />
                </span>
              </div>
            </div>
            <div>
              <div className="px-5">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-6 py-5">
                      <h1 className="text-[22px] col-span-2 font-medium ">
                        General
                      </h1>
                      <div className="col-span-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-normal">
                                Full name
                              </FormLabel>
                              <FormControl>
                                <div className="">
                                  <Input
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] w-full rounded-[6px] indent-6"
                                    placeholder="John Mark"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="Email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-normal">
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
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 py-5">
                      <h1 className="text-[22px] col-span-2 font-medium ">
                        Password
                      </h1>
                      <div className="col-span-4">
                        <FormField
                          control={form.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-normal">
                                Current password
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
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-normal">
                                New password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                                  {showNewPassword ? (
                                    <Eye
                                      onClick={toggleNewPassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  ) : (
                                    <EyeOff
                                      onClick={toggleNewPassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  )}
                                  <Input
                                    type={showNewPassword ? "password" : "text"}
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                    placeholder="Password"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-normal">
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
                                    type={
                                      showConfirmPassword ? "password" : "text"
                                    }
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                    placeholder="Password"
                                    {...field}
                                  />
                                  <p className="text-xl text-red-500 text-center">
                                    {notSame}
                                  </p>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="w-1/3 bg-[#33CC99] py-6 font-medium  text-2xl text-black hover:text-white"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
              <div className="flex justify-between items-center p-5">
                <h2 className="text-[22px] font-medium ">Delete Account</h2>
                <p className="text-xl font-normal w-96">
                  All data associated with this account will be deleted if you
                  deactivate this account
                </p>
                <h2 className="text-red-500 cursor-pointer text-xl font-medium ">
                  Deactivate
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
