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

const formSchema = z.object({
  courseTitle: z.string(),
  subTitle: z.string(),
  Description: z.string(),
  courseLink: z.string(),
  courseDuration: z.string(),
});

const AddCourseForms = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseTitle: "",
      courseDuration: "",
      courseLink: "",
      Description: "",
      subTitle: "",
    },
  });

  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("add-course/add-modules");
  }

  return (
    <div>
      <div className="flex items-center my-10 mx-20 relative ">
        <div className="bg-white shadow-md w-[72px] h-[36px] flex justify-center items-center p-2 absolute -top-10 -left-5 rounded-[8px]">
          <p className="text-main text-xs font-medium">Course</p>
        </div>
        <div className="w-[50px] h-[25px] block rounded-full bg-sub" />
        <div className="bg-[#D6DADE] w-full h-[4px]"></div>
        <div className="w-[50px] h-[25px] rounded-full bg-sub" />
        <div className="bg-[#D6DADE] w-full h-[4px]"></div>
        <div className="w-[50px] h-[25px] rounded-full bg-sub" />
      </div>
      <div>
        <h1 className="text-3xl font-semibold">Course Details</h1>
      </div>
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="my-4">
              <FormField
                control={form.control}
                name="courseTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl my-3 text-[#3E3E3E]">
                      Course Title (required)
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        className="bg-[#FAFAFA]"
                        placeholder="Input Course Title"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl my-3 text-[#3E3E3E]">
                      Sub-Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#FAFAFA]"
                        placeholder="Input Course Sub-Title"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl my-3 text-[#3E3E3E]">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#FAFAFA]"
                        placeholder="Input Course Description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courseLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl my-3 text-[#3E3E3E]">
                      Course Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#FAFAFA]"
                        placeholder="Input Course Link"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courseDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl my-3 text-[#3E3E3E]">
                      Set Course Duration
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-[#FAFAFA]"
                        placeholder="Input Course Duration"
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

export default AddCourseForms;
