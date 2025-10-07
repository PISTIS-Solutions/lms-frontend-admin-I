"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { urls } from "@/utils/config";
import { createAxiosInstance } from "@/lib/axios";
import Image from "next/image";

interface cardProps {
  id: number;
  title: string;
  duration: string;
  image: any;
  setEditModal: (val: boolean) => void;
  course_category: string;
  url: string;
}

const EditCourse = ({
  id,
  title,
  duration,
  image,
  setEditModal,
  url,
  course_category,
}: cardProps) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState(course_category || "Intermediate");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const axios = createAxiosInstance();
  const levels = ["Intermediate", "Advanced"];

  useEffect(() => {
    if (title) setCourseTitle(title);
    if (url) setCourseLink(url);
    if (image) setSelectedFile(image);

    console.log(image, "image");

    if (duration) {
      const [Oldhours, Oldminutes, Oldseconds] = duration
        .split(":")
        .map(Number);
      setHours(Oldhours);
      setMinutes(Oldminutes);
      setSeconds(Oldseconds);
    }
  }, [title, url, image, duration]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSelectImageClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!courseTitle || !courseLink || !selectedFile || !category) {
      toast.error("Form Details incomplete", { theme: "dark" });
      return;
    }

    try {
      setLoading(true);

      const convertToISO8601 = (h: number, m: number, s: number): string => {
        const totalSeconds = h * 3600 + m * 60 + s;
        return `PT${totalSeconds}S`;
      };

      const formData = new FormData();
      formData.append("title", courseTitle);
      formData.append("course_url", courseLink);
      formData.append("course_category", category);
      formData.append(
        "course_duration",
        convertToISO8601(hours, minutes, seconds)
      );

      if (typeof selectedFile !== "string") {
        formData.append("course_image", selectedFile);
      }

      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.patch(`${urls.getCourses}${id}/`, formData, {
        headers: { Authorization: `Bearer ${adminAccessToken}` },
      });

      if (response.status === 200) {
        toast.success(`${courseTitle} updated successfully!`, {
          theme: "dark",
        });
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Something went wrong", {
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[8px] border-t-4 border-t-primary bg-white p-2 md:p-6 h-[80vh] overflow-y-scroll scrollbar-hide w-[70%]">
      <ToastContainer />
      <h1 className="md:text-3xl text-xl font-semibold">Course Details</h1>

      <form className="space-y-8 mt-4" onSubmit={onSubmit}>
        <div>
          <label>Course Title (required)</label>
          <Input
            type="text"
            placeholder={title}
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Course Cover</label>

          {typeof selectedFile === "string" ? (
            <Image
              width={100}
              height={100}
              src={selectedFile}
              alt="Course Cover"
              className="w-40 h-28 object-cover rounded-md border mb-3"
            />
          ) : selectedFile ? (
            <Image
              width={100}
              height={100}
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Cover"
              className="w-40 h-28 object-cover rounded-md border mb-3"
            />
          ) : image ? (
            <Image
              width={100}
              height={100}
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Current Cover"
              className="w-40 h-28 object-cover rounded-md border mb-3"
            />
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSelectImageClick}
              className="bg-[#D6DADE] text-black px-4 py-2 text-sm font-medium rounded-md hover:bg-[#c2c6cc]"
            >
              {selectedFile ? "Change Image" : "Upload Image"}
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div>
          <label>Course Link</label>
          <Input
            type="url"
            placeholder={url}
            value={courseLink}
            onChange={(e) => setCourseLink(e.target.value)}
          />
        </div>

        <div>
          <label>Set Course Duration</label>
          <div className="flex items-center text-sm gap-2">
            <Input
              type="number"
              value={hours}
              className="w-14 text-center"
              onChange={(e) => setHours(Math.min(+e.target.value, 99))}
              max={99}
            />
            <span>Hour(s)</span>
            <Input
              type="number"
              value={minutes}
              className="w-14 text-center"
              onChange={(e) => setMinutes(Math.min(+e.target.value, 59))}
              max={59}
            />
            <span>Min(s)</span>
            <Input
              type="number"
              value={seconds}
              className="w-14 text-center"
              onChange={(e) => setSeconds(Math.min(+e.target.value, 59))}
              max={59}
            />
            <span>Sec(s)</span>
          </div>
        </div>

        <div>
          <label>Course Category</label>
          <div className="flex gap-4">
            {levels.map((level) => (
              <label key={level} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="courseLevel"
                  value={level}
                  checked={category === level}
                  onChange={() => setCategory(level)}
                  className="accent-sub w-4 h-4"
                />
                <span className="ml-2">{level} Course</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <p
            onClick={() => setEditModal(false)}
            className="cursor-pointer w-full py-2 rounded-[8px] text-center border border-[#3e3e3e] text-sm md:text-lg hover:bg-[#3e3e3e] hover:text-white font-medium"
          >
            Cancel
          </p>
          <button
            disabled={loading}
            className="w-full py-2 flex items-center justify-center disabled:bg-sub/25 rounded-[8px] bg-sub"
            type="submit"
          >
            {loading ? <Loader className="animate-spin" /> : "Proceed"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
