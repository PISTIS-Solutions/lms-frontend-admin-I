"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCourseFormStore from "@/store/course-module-project";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";
import { Loader } from "lucide-react";
import { createKey } from "next/dist/shared/lib/router/router";

interface cardProps {
  id: number;
  title: string;
  duration: number;
  image: any;
  setEditModal: any;
  url: string;
}

const EditCourse = ({
  id,
  title,
  duration,
  image,
  setEditModal,
  url,
}: cardProps) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>();

  // useEffect(() => {}, [title, image, url]);

  useEffect(() => {
    if (title) {
      setCourseTitle(title);
    }
    if (image) {
      setSelectedFile(image);
    }
    if (url) {
      setCourseLink(url);
    }
    if (duration) {
      const splitTime = (timeString: any) => {
        const [Oldhours, Oldminutes, Oldseconds] = timeString
          .split(":")
          .map(Number);
        return { Oldhours, Oldminutes, Oldseconds };
      };

      const { Oldhours, Oldminutes, Oldseconds } = splitTime(duration);
      setHours(Oldhours);
      setMinutes(Oldminutes);
      setSeconds(Oldseconds);
    }

    // console.log(hours, minutes, image);
  }, []);
  // console.log(selectedFile)
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
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (courseTitle && hours && minutes && courseLink && selectedFile) {
      try {
        setLoading(true);

        const convertToISO8601 = (
          hours: number,
          minutes: number,
          seconds: number
        ): string => {
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;
          return `PT${totalSeconds}S`;
        };

        const formData = new FormData();
        formData.append("title", courseTitle);
        formData.append("course_url", courseLink);
        formData.append(
          "course_duration",
          convertToISO8601(hours, minutes, seconds)
        );

        // Check if `selectedFile` is a string or a File object
        if (typeof selectedFile !== "string") {
          formData.append("course_image", selectedFile);
        }

        const adminAccessToken = Cookies.get("adminAccessToken");
        const response = await axios.patch(
          `${urls.getCourses}${id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${adminAccessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setLoading(true);
          toast.success(`${courseTitle} has been modified successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          window.location.reload();
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          await refreshAdminToken();
          await onSubmit(e);
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
    <div className="rounded-[8px] border-t-4 border-t-primary bg-white p-2 md:p-6 w-[90%]">
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
                placeholder={title}
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
                {/* <div className="flex items-center ml-2">
                  {selectedFile ? (
                    <p className="text-black text-sm">{selectedFile.name ? |}</p>
                  ) : (
                    <p className="italic text-[#919BA7] text-sm">
                      {image ? image.toString() : "No image selected"}
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
                </div> */}
                <div className="flex items-center ml-2">
                  {typeof selectedFile === "string" ? (
                    <p className="italic text-[#919BA7] text-sm">
                      {selectedFile || image}
                    </p>
                  ) : selectedFile ? (
                    <p className="text-black text-sm">{selectedFile.name}</p>
                  ) : (
                    <p className="italic text-[#919BA7] text-sm">{image}</p>
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
            <FormItem className="py-2">
              <label className="py-2">Course Link</label>
              <Input
                type="url"
                placeholder={url}
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
                    // placeholder={hours || 0}
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
                    // placeholder={}
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
          <div className="flex items-center gap-2 justify-center">
            <p
              onClick={() => {
                setEditModal(false);
              }}
              className="cursor-pointer w-full py-4 rounded-[8px] text-center border border-[#3e3e3e] text-sm md:text-lg hover:bg-[#3e3e3e] hover:text-white font-medium"
            >
              Cancel
            </p>
            <button
              disabled={loading}
              className="w-full py-4 flex items-center justify-center disabled:bg-sub/25 rounded-[8px] bg-sub"
              type="submit"
            >
              {loading ? (
                <Loader className="animate-spin text-center" />
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
