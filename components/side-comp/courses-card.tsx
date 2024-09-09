"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { LucideLoader2, Menu } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import useCourseRead from "@/store/course-read";
import { Button } from "../ui/button";
import modIcon from "@/public/assets/modIcon.svg";
import timer from "@/public/assets/timer.svg";
import { FaEllipsisVertical } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { useOutsideClick } from "@/utils/outsideClick";
import useModuleCount from "@/store/module-count";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface cardProps {
  id: number;
  title: string;
  duration: number;
  handleCardClick: any;
  handleOpen: any;
  image: any;
  openEditModal: any;
  key: any;
  isDraggable?: boolean;
}

const CoursesCard = ({
  id,
  title,
  duration,
  image,
  handleCardClick,
  handleOpen,
  openEditModal,
  key,
  isDraggable = false,
}: cardProps) => {
  // const [loading, setLoading] = useState(false);
  const { fetchCourseRead } = useCourseRead();
  // const [moduleCount, setModuleCount] = useState(0);

  // useEffect(() => {
  //   const getModuleCount = async () => {
  //     setLoading(true);
  //     try {
  //       const adminAccessToken = Cookies.get("adminAccessToken");
  //       const response = await axios.get(`${urls.getCourses}${id}/modules/`, {
  //         headers: {
  //           Authorization: `Bearer ${adminAccessToken}`,
  //         },
  //       });

  //       // console.log(response.status);
  //       if (response.status === 200) {
  //         const count = response.data.length;
  //         setModuleCount(count);
  //         setLoading(false);
  //       } else {
  //         // console.error(`Error fetching modules for course ${id}`);
  //         setModuleCount(0);
  //       }
  //     } catch (error: any) {
  //       setModuleCount(0);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getModuleCount();
  // }, []);

  const { getModuleCount } = useModuleCount();
  const [moduleCount, setModuleCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModuleCount = async () => {
      setLoading(true);
      const count = await getModuleCount(id);
      setModuleCount(count);
      setLoading(false);
    };

    fetchModuleCount();
  }, [id, getModuleCount]);

  const [openOptions, setOpenOptions] = useState(false);
  const openOptionsFunct = () => {
    setOpenOptions(true);
  };

  const optionsRef = useRef<HTMLDivElement>(null);

  useOutsideClick(optionsRef, () => setOpenOptions(false));

  //
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const dragAndDropStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={dragAndDropStyle}
      className="relative touch-action-none max-w-[300px] min-[1440px]:max-w-[347px]"
      key={key}
    >
      <div
        key={id}
        onClick={() => {
          fetchCourseRead(id);
          handleCardClick(id);
        }}
        className=" w-full cursor-pointer h-[374px shadow-md rounded-[8px] bg-[#fff] p-2 h-full flex flex-col"
      >
        <div className="relative">
          <Image
            src={image}
            width={100}
            height={100}
            alt={title}
            className="rounded-tr-[4px] h-[191px] object-cover w-full rounded-tl-[4px] bg-cover rounded-t-lg"
          />

          {isDraggable && (
            <div className="absolute inset-0 bg-black/20 flex justify-center items-center rounded-t-lg">
              <div className="bg-white p-5 rounded-lg border border-black/20">
                <Menu />
              </div>
            </div>
          )}
        </div>
        <div className="p-2 flex justify-between h-[inherit] self-stretch flex-col">
          <div className="md:mb-5 mb-5">
            <h1 className="md:text-xl text-lg capitalize font-medium text-[#2E2E2E]">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-x-4 z-10">
            <div className="flex md:text-base text-xs items-center gap-x-1">
              {/* <BookText className="text-main" /> */}
              <Image src={modIcon} alt="" />
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
              {/* <Hourglass className="text-main" /> */}
              <Image src={timer} alt="" />
              {duration}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={openOptionsFunct}
        className=" p-[6px] shadow-md bg-white cursor-pointer rounded-[4px] w-[24px] h-[24px] flex justify-center items-center absolute top-4 right-4 duration-150 ease-in-out"
      >
        <FaEllipsisVertical className="text-primary" />
      </button>
      {openOptions && (
        <div
          className="bg-white rounded-[8px] p-4 h-auto absolute top-4 right-4 w-[140px]"
          ref={optionsRef}
        >
          <div className="flex items-center gap-x-1 cursor-pointer hover:bg-primary hover:text-white hover:rounded-[8px] p-0.5">
            <BiEdit className="w-[14px] h-[14px]" />
            <p onClick={openEditModal} className=" text-xs font-normal">
              Edit Course
            </p>
          </div>
          <div
            onClick={handleOpen}
            className="flex items-center gap-x-1 text-red-500 font-medium cursor-pointer hover:bg-red-500 mt-1 hover:text-white hover:rounded-[8px] p-0.5"
          >
            <FaTrashAlt className="w-[14px] h-[14px]" />
            <p className=" text-xs font-normal">Delete Course</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesCard;
