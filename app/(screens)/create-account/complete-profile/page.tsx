"use client";

import React from "react";
import Image from "next/image";

import logo from "../../../../public/assets/pistis_logo.png";

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

const formSchema = z.object({
  Firstname: z.string().min(2, {
    message: "Input First name",
  }),
  Lastname: z.string().min(2, {
    message: "Input Last name",
  }),
});

const completeProfile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="text-4xl font-semibold">Complete your profile</h1>
          <h3 className="text-2xl">Please provide personal details</h3>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="Firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
                      First name
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="text"
                          className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px]"
                          placeholder="Enter First name"
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
                name="Lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px]"
                          placeholder="Enter Last Name"
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
                className="w-full mt-10 bg-[#33CC99] py-6 font-medium text-2xl text-black hover:text-white"
              >
                Proceed
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <p className="text-center text-lg font-normal ">
            Already have an account? <Link href="/sign-in">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default completeProfile;
