import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  course: z.string(),
  // module: z.string(),
  projectTitle: z.string(),
  projectLink: z.string(),
  additionalNote: z.string(),
});

const AddProjectModal = ({ handleProjectModal }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();
    if (
      data.course &&
      // data.module &&
      data.projectTitle &&
      data.projectLink &&
      data.additionalNote !== ""
    ) {
      console.log(data);
    }
  };

  return (
    <section className="absolute top-0 flex justify-center items-center left-0 bg-black/25 h-screen w-full">
      <div className="rounded-[8px] border-t-4 border-t-primary bg-white  p-2 md:p-6 w-[60%] ">
        <div className="flex justify-between items-center">
          <h1 className="md:text-2xl text-xl font-semibold">Project Details</h1>
          <span
            onClick={handleProjectModal}
            className="text-primary border border-primary rounded-lg cursor-pointer p-1 "
          >
            <X />
          </span>
        </div>
        <div className="mt-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      <p>Select Course</p>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="bg-[#FAFAFA] text-[#919BA7] text-sm italic">
                        <SelectTrigger>
                          <SelectValue
                            className=""
                            placeholder="Select a Course"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Test Course 1">
                          Test Course 1
                        </SelectItem>
                        <SelectItem value="Test Course 2">
                          Test Course 2
                        </SelectItem>
                        <SelectItem value="Test Course 3">
                          Test Course 3
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="module"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm text-[#3E3E3E]">
                      <p className="">Select Module</p>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="bg-[#FAFAFA] text-[#919BA7] text-sm italic">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Module" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Test Module 1">
                          Test Module 1
                        </SelectItem>
                        <SelectItem value="Test Module 2">
                          Test Module 2
                        </SelectItem>
                        <SelectItem value="Test Module 3">
                          Test Module 3
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="projectTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      <p>Project Title</p>
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
                      <p className="mt-2">Project Link</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
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
                      <p className="mt-2">Additional Note</p>
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
              <Button
                className=" py-6 w-full text-black hover:text-white px-28 bg-sub mx-auto font-semibold"
                type="submit"
              >
                Publish
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AddProjectModal;
