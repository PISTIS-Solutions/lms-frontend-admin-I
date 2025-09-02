"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
// import axios from "axios";
import { urls } from "@/utils/config";
import { Input } from "@/components/ui/input";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "@/components/side-comp/toolbar";
import { createAxiosInstance } from "@/lib/axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  course: z.string(),
  projectTitle: z.string(),
  projectLink: z.string(),
});

const AddProjectModal = ({
  handleProjectModal,
  courses,
  fetchCourses,
}: any) => {
  const [description, setDescription] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [editLoading, seteditLoading] = useState(false);
  const axios = createAxiosInstance();
  const onSubmit = async (data: z.infer<typeof formSchema>, e: any) => {
    e.preventDefault();
    if (
      data.course &&
      data.projectTitle &&
      data.projectLink &&
      description !== ""
    ) {
      try {
        const adminAccessToken = Cookies.get("adminAccessToken");
        seteditLoading(true);
        const response = await axios.post(
          `${urls.getCourses}${data.course}/projects/`,
          {
            project_title: data.projectTitle,
            project_hint: description,
            project_url: data.projectLink,
          },
          {
            headers: {
              Authorization: `Bearer ${adminAccessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          seteditLoading(false);
          toast.success("Project successfully added!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          // setOpenModal(false);
          // window.parent.location = window.parent.location.href;
          fetchCourses();
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
        seteditLoading(false);
      }
    }
  };

  return (
    <section className="absolute top-0 flex justify-center items-center left-0 bg-black/25 h-screen w-full">
      <ToastContainer />
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
                      <FormControl className="bg-[#FAFAFA] text-black text-sm italic">
                        <SelectTrigger>
                          <SelectValue
                            className=""
                            placeholder="Select a Course"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course: any) => {
                          return (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder="Input Github Link"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div>
                <label className="md:text-xl text-sm text-[#3E3E3E]">
                  <p className="mt-2">Additional Note</p>
                </label>
                <div>
                  <ReactQuill
                    modules={{ toolbar: toolbarOptions }}
                    theme="snow"
                    className="bg-[#FAFAFA]"
                    placeholder="Input project content details"
                    value={description}
                    onChange={setDescription}
                  />
                </div>
              </div>
              <Button
                disabled={editLoading}
                className=" py-6 w-full text-black disabled:bg-sub/25 hover:text-white px-28 bg-sub mx-auto font-semibold"
                type="submit"
              >
                {editLoading ? <Loader2 className="animate-spin" /> : "Publish"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AddProjectModal;
