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
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { urls } from "@/utils/config";
import { Loader2, Plus } from "lucide-react";
import refreshAdminToken from "@/utils/refreshToken";

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

  const [loading, setLoading] = useState(false);
  const [saveModule, setSaveModule] = useState<boolean>(false);

  const router = useRouter();
  const uploadProject = async (
    values: z.infer<typeof formSchema>,
    e: any
  ): Promise<void> => {
    e.preventDefault();
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");

      setLoading(true);
      const response = await axios.post(
        urls.uploadProjects,
        {
          project_title: values.projectTitle,
          project_description: values.additionalNote,
          project_url: values.projectLink,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.project_title + " added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        // Cookies.set("courseId", response.data.id);
        // router.push("add-modules/add-project");
        setSaveModule(true);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await uploadProject(values, e);
      } else if (error?.message === "Network Error") {
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
      setLoading(false);
    }
  };

  return (
    <div>
    
      <ToastContainer />
      <div>
        <h1 className="md:text-3xl text-xl font-semibold">Project Details</h1>
      </div>
      <div className="mt-4">
        <Form {...form}>
          {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
          <div className="my-4">
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
                      className="bg-[#FAFAFA] placeholder:italic"
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
                      className="bg-[#FAFAFA] placeholder:italic"
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
                      className="bg-[#FAFAFA] placeholder:italic"
                      placeholder="Input project content details"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            <Button
              type="submit"
              disabled={loading}
              onClick={form.handleSubmit(uploadProject)}
              className=" py-6 w-full text-black hover:text-white px-28 bg-sub mx-auto font-semibold"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>
                  {saveModule ? (
                    <span className="flex items-center gap-x-2">
                      Add Project <Plus />{" "}
                    </span>
                  ) : (
                    "Save Project"
                  )}
                </span>
              )}
            </Button>
            {saveModule && (
              <Button
                onClick={() => {
                  router.push("add-modules/add-project");
                }}
                className=" py-6 w-full text-black hover:text-white px-28 bg-sub mx-auto font-semibold"
              >
                Publish
              </Button>
            )}
          </div>
          {/* </form> */}
        </Form>
      </div>
    </div>
  );
};

export default AddProjectForms;
