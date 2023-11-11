"use client";

import React, { useState } from "react";
import Image from "next/image";

import logo from "../../../public/assets/pistis_logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  Email: z.string().min(2, {
    message: "Input correct email address",
  }),
  Password: z.string().min(6, {
    message: "Password must contain a minimum of 6 characters",
  }),
});

const SignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  //toggle password
  const [showPassword, setShowPassword] = useState(true);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const route = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // setCookie("logged", "true");
    route.push("/dashboard");
  }
  return (
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="text-4xl font-semibold">Sign In</h1>
          <h3 className="text-2xl">Glad to have you back!</h3>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
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
                    <FormLabel className="text-xl font-medium">
                      Password
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
              <p className="text-[#3E3E3E] text-base text-right">
                <Link href="/sign-in/forgot-password">Forgot Password?</Link>
              </p>
              <Button
                type="submit"
                className="w-full bg-[#33CC99] py-6 font-medium text-2xl text-black hover:text-white"
              >
                Sign In
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <p className="text-center text-lg font-normal ">
            Don't have an account?{" "}
            <Link href="/create-account">Create Account</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
