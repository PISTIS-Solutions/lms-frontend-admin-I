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
import axios from "axios";
import { urls } from "@/utils/config";
import { CheckCircle, Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";

const formSchema = z.object({
  courseTitle: z.string(),
  subTitle: z.string(),
  Description: z.string(),
  courseLink: z.string(),
  // courseDuration: z.string(),
});
type FormData = z.infer<typeof formSchema>;

const AddCourseForms = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseTitle: "",
      courseLink: "",
      Description: "",
      subTitle: "",
    },
  });

  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const convertToISO8601 = (
    hours: number,
    minutes: number,
    seconds: number
  ): string => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return `PT${totalSeconds}S`;
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const uploadCourses = async (values: FormData, e: any): Promise<void> => {
    e.preventDefault();
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");
      const iso8601Duration = convertToISO8601(hours, minutes, seconds);

      setLoading(true);
      const response = await axios.post(
        urls.uploadCourses,
        {
          title: values.courseTitle,
          sub_title: values.subTitle,
          course_url: values.courseLink,
          course_duration: iso8601Duration,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success(response.data.title + " added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        Cookies.set("courseId", response.data.id);
        router.push("add-course/add-modules");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await uploadCourses(values, e);
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
        <div className="bg-white shadow-md w-[72px] h-[36px] flex justify-center items-center p-2 absolute -top-10 -left-5 rounded-[8px]">
          <p className="text-main text-xs font-medium">Course</p>
        </div>
        <div className="w-[50px] h-[18px] md:h-[25px] block rounded-full bg-sub" />
        <div className="bg-[#D6DADE] w-full h-[4px]"></div>
        <div className="w-[50px] h-[18px] md:h-[25px] rounded-full bg-sub" />
        <div className="bg-[#D6DADE] w-full h-[4px]"></div>
        <div className="w-[50px] h-[18px] md:h-[25px] rounded-full bg-sub" />
      </div>
      <div>
        <h1 className="md:text-3xl text-xl font-semibold">Course Details</h1>
      </div>
      <ToastContainer />
      <div className="mt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(uploadCourses)}
            className="space-y-8"
          >
            <div className="my-4">
              <FormField
                control={form.control}
                name="courseTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Course Title (required)
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        type="text"
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
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Sub-Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
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
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
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
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                      Course Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        className="bg-[#FAFAFA]"
                        placeholder="Input Course Link"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                <label className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                  Set Course Duration
                </label>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={hours}
                      className=" w-14 text-center"
                      onChange={(e) => setHours(parseInt(e.target.value, 10))}
                    />
                    <p>Hour(s)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={minutes}
                      className="w-14 text-center"
                      onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
                    />
                    <p>Min(s)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={seconds}
                      className="w-14 text-center"
                      onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
                    />
                    <p>Sec(s)</p>
                  </div>
                </div>
              </div>
              {/* <FormField
                control={form.control}
                name="courseDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
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
              /> */}
            </div>
            <div className="flex items-center justify-center">
              <Button
                disabled={loading}
                className=" py-6 text-main hover:text-white px-28 bg-sub mx-auto font-semibold"
                type="submit"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Continue"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddCourseForms;
