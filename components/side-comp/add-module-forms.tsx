"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  moduleTitle: z.string(),
  modulesubTitle: z.string(),

  moduleLink: z.string(),
  moduleDetails: z.string(),
});

const AddModuleForms = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moduleTitle: "",
      moduleLink: "",
      moduleDetails: "",
      modulesubTitle: "",
    },
  });

  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // router.push("add-course/add-modules/add-project");
    router.push("add-modules/add-project");
  }

  return (
    <div>
      <div className="flex items-center my-10 mx-20 relative ">
        <div className="bg-white shadow-md w-[72px] h-[36px] flex justify-center items-center p-2 absolute -top-10 left-[30%] md:left-[46%] rounded-[8px]">
          <p className="text-main text-xs font-medium">Module</p>
        </div>
        <div className="w-[50px] h-[18px] md:h-[25px] block rounded-full bg-sub" />
        <div className="bg-sub w-full h-[4px]"></div>
        <div className="w-[50px] h-[18px] md:h-[25px] rounded-full bg-sub" />
        <div className="bg-[#D6DADE] w-full h-[4px]"></div>
        <div className="w-[50px] h-[18px] md:h-[25px] rounded-full bg-sub" />
      </div>
      <div>
        <h1 className="md:text-3xl text-xl font-semibold">Module Details</h1>
      </div>
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="my-4">
              <FormField
                control={form.control}
                name="moduleTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Module Title
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        className="bg-[#FAFAFA]"
                        placeholder="Input Module Title"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modulesubTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Sub-Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#FAFAFA]"
                        placeholder="Input Module Sub-Title"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moduleLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Video Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#FAFAFA]"
                        placeholder="Input Module Description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moduleDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Content Details
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-[#FAFAFA]"
                        placeholder="Input module content details"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button
                className=" py-6 text-main hover:text-white px-28 bg-sub mx-auto font-semibold"
                type="submit"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddModuleForms;
