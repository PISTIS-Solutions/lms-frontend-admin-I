"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  projectTitle: z.string(),
  projectLink: z.string(),
  additionalNote: z.string(),
});

const AddProjectForms = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      projectLink: "",
      additionalNote: "",
    },
  });

  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <div className="flex items-center my-10 mx-20 relative ">
        <div className="bg-white shadow-md w-[72px] h-[36px] flex justify-center items-center p-2 absolute -top-10 -right-5 rounded-[8px]">
          <p className="text-main text-xs font-medium">Project</p>
        </div>
        <div className="w-[50px] h-[18px] md:h-[25px] block rounded-full bg-sub" />
        <div className="bg-sub w-full h-[4px]"></div>
        <div className="w-[50px] h-[18px] md:h-[25px] rounded-full bg-sub" />
        <div className="bg-[#D6DADE] w-full h-[4px]"></div>
        <div className="w-[50px] h-[18px] md:h-[25px] rounded-full bg-sub" />
      </div>
      <div>
        <h1 className="md:text-3xl text-xl font-semibold">Project Details</h1>
      </div>
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="my-4">
              <FormField
                control={form.control}
                name="projectTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Project Title
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        className="bg-[#FAFAFA]"
                        placeholder="Input Project Title"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Project Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#FAFAFA]"
                        placeholder="Input Project Sub-Title"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalNote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Additional Note
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-[#FAFAFA]"
                        placeholder="Input project content details"
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
                Publish
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProjectForms;
