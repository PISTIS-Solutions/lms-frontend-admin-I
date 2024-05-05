"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import img from "@/public/assets/course/ansible.png";
import {
  BookText,
  Hourglass,
  Loader2,
  LucideLoader2,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import useCourseRead from "@/store/course-read";
import { Button } from "../ui/button";
// import img from "@/public/assets/course/ansible.png"

interface cardProps {
  id: number;
  // img: any;
  title: string;
  // paragraph: string;
  // module: { moduleHeader: string; moduleBody: string }[];
  duration: number;
  handleCardClick: any;
  handleOpen: any;
  image: any;
}

const CoursesCard = ({
  id,
  // img,
  title,
  // paragraph,
  // module,
  duration,
  handleCardClick,
  handleOpen,
  image,
}: cardProps) => {
  const [moduleCount, setModuleCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { fetchCourseRead } = useCourseRead();

  useEffect(() => {
    const getModuleCount = async () => {
      setLoading(true);
      try {
        const adminAccessToken = Cookies.get("adminAccessToken");
        const response = await axios.get(`${urls.getCourses}${id}/modules/`, {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        });

        console.log(response.status);
        if (response.status === 200) {
          const count = response.data.length;
          setModuleCount(count);
          setLoading(false);
        } else {
          // console.error(`Error fetching modules for course ${id}`);
          setModuleCount(0);
        }
      } catch (error: any) {
        setModuleCount(0);
      } finally {
        setLoading(false);
      }
    };

    getModuleCount();
  }, []);

  // const cloudinaryUrl = image;
  // const imageUrl = cloudinaryUrl.replace("image/upload/", "");

  return (
    <div className="relative">
      <div
        key={id}
        onClick={() => {
          fetchCourseRead(id);
          handleCardClick(id);
        }}
        className=" w-full cursor-pointer h-auto shadow-md rounded-[8px] bg-[#FFF]"
      >
        <Image
          src={image}
          width={100}
          height={100}
          alt={title}
          className="rounded-tr-[4px] max-w-[357px] max-h-[191px] object-contain w-full rounded-tl-[4px]"
        />
        <div className="p-2">
          <div className="md:mb-14 mb-5">
            <h1 className="md:text-xl text-sm capitalize font-medium">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-x-4 mt-4">
            <div className="flex md:text-base text-xs items-center gap-x-1">
              <BookText className="text-main" />
              {loading ? (
                <>
                  <LucideLoader2 className="animate-spin" />
                </>
              ) : (
                moduleCount
              )}{" "}
              module
            </div>
            <div className="flex md:text-base text-xs items-center gap-x-1">
              <Hourglass className="text-main" />
              {duration}
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleOpen}
        className="p-2 bg-white cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center absolute top-2 right-2 hover:bg-red-500 duration-150 ease-in-out text-red-500 hover:text-white"
      >
        <Trash2 className="" />
      </Button>
    </div>
  );
};

export default CoursesCard;
