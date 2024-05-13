"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCourseFormStore from "@/store/course-module-project";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "./toolbar";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddCourseForms = () => {
  const {
    courseTitle,
    description,
    courseLink,
    selectedFile,
    hours,
    minutes,
    seconds,
    setCourseTitle,
    setDescription,
    setCourseLink,
    setSelectedFile,
    setHours,
    setMinutes,
    setSeconds,
  } = useCourseFormStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSelectImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const router = useRouter();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      courseTitle &&
      hours &&
      minutes &&
      courseLink &&
      // description &&
      selectedFile
    ) {
      toast.success("Course Created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      router.push("/courses/add-course/add-modules");
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
      <ToastContainer />
      <div>
        <h1 className="md:text-3xl text-xl font-semibold">Course Details</h1>
      </div>
      <div className="mt-4">
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="my-4">
            <div className="py-2">
              <label className="py-2">Course Title (required)</label>
              <Input
                type="text"
                placeholder="Input Course Title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
            </div>
            <FormItem className="py-2">
              <label className="py-2">Course Cover</label>
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
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </FormItem>
            {/* <FormItem className="py-2">
              <label className="py-2">Description</label>
              <ReactQuill
                modules={{ toolbar: toolbarOptions }}
                theme="snow"
                placeholder="Input Course Description"
                value={description}
                onChange={setDescription}
                className="w-full"
              />
            </FormItem> */}
            <FormItem className="py-2">
              <label className="py-2">Course Link</label>
              <Input
                type="url"
                placeholder="Input Course Link"
                value={courseLink}
                onChange={(e) => setCourseLink(e.target.value)}
              />
            </FormItem>

            <FormItem className="py-2">
              <label className="py-2">Set Course Duration</label>
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
            </FormItem>
          </div>
          <div className="flex items-center  justify-center">
            <Button className="w-full bg-sub" type="submit">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForms;
