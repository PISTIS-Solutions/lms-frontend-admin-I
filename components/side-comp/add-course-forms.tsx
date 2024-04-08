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
  Description: z.string(),
  courseLink: z.string(),
});
type FormData = z.infer<typeof formSchema>;

const AddCourseForms = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseTitle: "",
      courseLink: "",
      Description: "",
    },
  });

  //file selection: image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSelectImageClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  // const convertToISO8601 = (
  //   hours: number,
  //   minutes: number,
  //   seconds: number
  // ): string => {
  //   const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  //   return `PT${totalSeconds}S`;
  // };
const router = useRouter()
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (courseTitle && hours && minutes && courseLink) {
      toast.success("Course Created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      router.push("/courses/add-course/add-modules")
      // console.log(convertToISO8601(hours, minutes, seconds));
    } else {
      toast.error("Form Details incomplete", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <div>
        <h1 className="md:text-3xl text-xl font-semibold">Course Details</h1>
      </div>
      <ToastContainer />
      <div className="mt-4">
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(uploadCourses)}
            className="space-y-8"
          >
            <div className="my-4">
              <FormField
                control={form.control}
                name="courseTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm my-2 text-[#3E3E3E]">
                      Course Title (required)
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        type="text"
                        className="bg-[#FAFAFA] placeholder:italic"
                        placeholder="Input Course Title"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                <label className="md:text-xl text-sm text-[#3E3E3E]">
                  <p className="py-2">Course Cover</p>
                </label>
                <div className="flex bg-[#FAFAFA] border py-3 relative border-[#D6DADE] rounded-md w-full items-center">
                  <span
                    className="bg-[#D6DADE] text-black cursor-pointer text-sm  absolute right-0 px-8 py-3 font-semibold rounded-br-md rounded-tr-md"
                    onClick={handleSelectImageClick}
                  >
                    Select
                  </span>
                  <div className="flex items-center ml-2">
                    {selectedFile ? (
                      <p className="text-black text-sm">{selectedFile.name}</p>
                    ) : (
                      <p className="italic text-[#919BA7] text-sm">
                        Select image
                      </p>
                    )}
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-xl text-sm text-[#3E3E3E]">
                      <p className="pt-2">Description</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-[#FAFAFA] placeholder:italic"
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
                    <FormLabel className="md:text-xl text-sm text-[#3E3E3E]">
                      <p className="pt-2">Course Link</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        className="bg-[#FAFAFA] placeholder:italic"
                        placeholder="Input Course Link"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="my-2">
                <label className="md:text-xl text-sm text-[#3E3E3E]">
                  Set Course Duration
                </label>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={hours}
                      className="w-14 bg-[#FAFAFA] placeholder:italic text-center"
                      onChange={(e) =>
                        setHours(Math.min(parseInt(e.target.value, 10), 99))
                      }
                      max={99}
                    />
                    <p>Hour(s)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={minutes}
                      className="w-14 bg-[#FAFAFA] placeholder:italic text-center"
                      onChange={(e) =>
                        setMinutes(Math.min(parseInt(e.target.value, 10), 59))
                      }
                      max={59}
                    />
                    <p>Min(s)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={seconds}
                      className="w-14 bg-[#FAFAFA] placeholder:italic text-center"
                      onChange={(e) =>
                        setSeconds(Math.min(parseInt(e.target.value, 10), 59))
                      }
                      max={59}
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
                    <FormLabel className="md:text-xl text-sm my-2 text-[#3E3E3E]">
                      Set Course Duration
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-[#FAFAFA] placeholder:italic"
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
                // disabled={loading}
                className=" py-6 text-black hover:text-white bg-sub mx-auto w-full font-semibold"
                type="submit"
              >
                {/* {loading ? <Loader2 className="animate-spin" /> : "Continue"} */}
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
