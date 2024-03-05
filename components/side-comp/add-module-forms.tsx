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
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { urls } from "@/utils/config";
import { Loader2, Plus } from "lucide-react";
import refreshAdminToken from "@/utils/refreshToken";

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

  const [loading, setLoading] = useState(false);
  const [saveModule, setSaveModule] = useState<boolean>(false);

  const router = useRouter();
  const uploadModules = async (
    values: z.infer<typeof formSchema>,
    e: any
  ): Promise<void> => {
    e.preventDefault();
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");

      setLoading(true);
      const response = await axios.post(
        urls.uploadModules,
        {
          module_title: values.moduleTitle,
          module_sub_title: values.modulesubTitle,
          module_url: values.moduleLink,
          description: values.moduleDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.module_title + " added", {
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
        await uploadModules(values, e);
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
      <ToastContainer />
      <div className="mt-4">
        <Form {...form}>
          {/* <form
            onSubmit={form.handleSubmit(uploadModules)}
            className="space-y-8"
          > */}
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
                      type="text"
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
                      type="text"
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
                      type="url"
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
          <div className="flex gap-x-5 justify-center">
            <Button
              type="submit"
              disabled={loading}
              onClick={form.handleSubmit(uploadModules)}
              className=" py-6 text-main w-full hover:text-white px-28 bg-sub mx-auto font-semibold"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>
                  {saveModule ? (
                    <span className="flex items-center gap-x-2">
                      Add new Module <Plus />{" "}
                    </span>
                  ) : (
                    "Save Module"
                  )}
                </span>
              )}
            </Button>
            {saveModule && (
              <Button
                onClick={() => {
                  router.push("add-modules/add-project");
                }}
                className=" py-6 text-main w-full hover:text-white px-28 bg-sub mx-auto font-semibold"
              >
                Continue
              </Button>
            )}
          </div>
          {/* </form> */}
        </Form>
      </div>
    </div>
  );
};

export default AddModuleForms;
