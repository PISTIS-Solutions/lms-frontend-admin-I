"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCourseFormStore from "@/store/course-module-project";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

import "react-quill/dist/quill.snow.css";
import { showToast } from "@/lib/showToast";
import { AiOutlineUpload } from "react-icons/ai";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

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
  const [courseLevel, setCourseLevel] = useState("intermediate");

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
      showToast("Course Created", "success");
      router.push("/courses/add-course/add-modules");
    } else {
      showToast("Form Details incomplete", "error");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <h1 className="md:text-3xl text-xl font-semibold">Course Overview</h1>
      </div>
      <div className="mt-4">
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="my-4">
            {" "}
            <FormItem className="py-2">
              <label className="py-2 text-[#666666]">Course Cover</label>
              <div className="flex bg-[#FAFAFA] border py-3 relative border-[#D6DADE] rounded-md w-full items-center">
                <span
                  className="bg-sub text-white flex items-center cursor-pointer text-sm gap-2 absolute right-1 px-2 py-2 font-semibold rounded-md"
                  onClick={handleSelectImageClick}
                >
                  <AiOutlineUpload className="w-6 h-6" /> Upload Image
                </span>
                <div className="flex items-center ml-2">
                  {selectedFile ? (
                    <p className="text-black text-sm">{selectedFile.name}</p>
                  ) : (
                    <p className="italic text-[#919BA7] text-sm">
                      Upload your course cover here
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
            <div className="py-2">
              <label className="py-2 text-[#666666]">Course Title</label>
              <Input
                className="w-full bg-[#FAFAFA] border border-[#D6DADE] rounded-md p-2"
                type="text"
                placeholder="Enter your course title here"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
            </div>
            <FormItem className="py-2">
              <label className="py-2 text-[#666666]">Course Link</label>
              <Input
                className="w-full bg-[#FAFAFA] border border-[#D6DADE] rounded-md p-2"
                type="url"
                placeholder="Enter your course link here"
                value={courseLink}
                onChange={(e) => setCourseLink(e.target.value)}
              />
            </FormItem>
            <FormItem className="py-2">
              <label className="py-2 text-[#666666]">Course Description</label>
              <textarea
                className="w-full h-24 bg-[#FAFAFA] border border-[#D6DADE] rounded-md p-2"
                placeholder="Enter your course description here"
                // value={courseDescription}
                // onChange={(e) => setCourseDescription(e.target.value)}
              />
            </FormItem>
            <FormItem className="py-2">
              <label className="py-2 text-[#666666]">Course Overview</label>
              <textarea
                className="w-full h-24 bg-[#FAFAFA] border border-[#D6DADE] rounded-md p-2"
                placeholder="Enter your course overview here"
                // value={courseDescription}
                // onChange={(e) => setCourseDescription(e.target.value)}
              />
            </FormItem>
            <div className="py-2">
              <label className="py-2 block text-[#666666]">Course Level</label>
              <div className="flex items-center gap-4">
                {["intermediate", "advanced"].map((level) => (
                  <label
                    key={level}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="courseLevel"
                      id={level}
                      value={level}
                      checked={courseLevel === level}
                      onChange={() => setCourseLevel(level)}
                      className="accent-sub w-4 h-4"
                    />
                    <span className="text-[#666666] ml-2 capitalize">
                      {level} Course
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <FormItem className="py-4">
              <label className="block mb-3 text-[#666666] font-medium text-sm">
                Set Course Duration
              </label>

              <div className="flex flex-wrap items-center gap-4">
              
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    max={99}
                    value={hours}
                    placeholder="0"
                    className="w-16 bg-[#FAFAFA] text-center text-sm font-medium rounded-md shadow-sm border border-[#ccc] focus:outline-none focus:ring-1 focus:ring-sub"
                    onChange={(e) =>
                      setHours(
                        Math.min(parseInt(e.target.value || "0", 10), 99)
                      )
                    }
                  />
                  <span className="text-sm text-[#666666]">Hour(s)</span>
                </div>

                
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    max={59}
                    value={minutes}
                    placeholder="0"
                    className="w-16 bg-[#FAFAFA] text-center text-sm font-medium rounded-md shadow-sm border border-[#ccc] focus:outline-none focus:ring-1 focus:ring-sub"
                    onChange={(e) =>
                      setMinutes(
                        Math.min(parseInt(e.target.value || "0", 10), 59)
                      )
                    }
                  />
                  <span className="text-sm text-[#666666]">Min(s)</span>
                </div>

                
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    max={59}
                    value={seconds}
                    placeholder="0"
                    className="w-16 bg-[#FAFAFA] text-center text-sm font-medium rounded-md shadow-sm border border-[#ccc] focus:outline-none focus:ring-1 focus:ring-sub"
                    onChange={(e) =>
                      setSeconds(
                        Math.min(parseInt(e.target.value || "0", 10), 59)
                      )
                    }
                  />
                  <span className="text-sm text-[#666666]">Sec(s)</span>
                </div>
              </div>
            </FormItem>
            <div className="flex items-center gap-6 py-4">
              <div className="flex-1">
                <label className="block mb-1 text-[#666666]">
                  Select Tutor
                </label>
                <select
                  name="tutor"
                  className="w-full border border-[#ccc] rounded px-3 py-2 text-[#333] focus:outline-none focus:ring-1 focus:ring-sub"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a tutor
                  </option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                  <option value="emeka">Emeka Obi</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block mb-1 text-[#666666]">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
                    ₦
                  </span>
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-3 py-2 border border-[#ccc] rounded text-[#333] focus:outline-none focus:ring-1 focus:ring-sub"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button
              type="button"
              // onClick={handlePrevious}
              className="bg-gray-200 flex items-center gap-1 flex-row-reverse text-[#333] hover:bg-gray-300 w-1/2 max-w-[113px]"
            >
              Prev <FaAnglesLeft className="inline" />
            </Button>

            <Button
              type="submit"
              className="bg-sub flex items-center gap-1 text-white hover:bg-sub/90 w-full max-w-[113px]"
            >
              Next <FaAnglesRight className="inline" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForms;
