import Image from "next/image";
import React, { useEffect, useState } from "react";

import img from "@/public/assets/course/ansible.png";
import { BookText, Hourglass, LucideLoader2, Trash2 } from "lucide-react";
import useCourseRead from "@/store/course-read";
import axios from "axios";
import { urls } from "@/utils/config";

import Cookies from "js-cookie";
import useProjectRead from "@/store/project-read";
import useProjectCount from "@/store/projectCount";

interface cardProps {
  id: number;
  img: any;
  title: string;
  paragraph: string;
  module: { moduleHeader: string; moduleBody: string }[];
  project: { moduleHeader: string; moduleBody: string }[];
  duration: number;
  handleCardClick: any;
  handleOpen: () => void;
  
}

const ProjectCard = ({
  id,
  img,
  title,
  paragraph,
  handleCardClick,
  project,
  handleOpen,
}: cardProps) => {
  const { fetchProjectRead } = useProjectRead();
  // const [moduleCount, setModuleCount] = useState(0);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getProjectCount = async () => {
  //     setLoading(true);
  //     try {
  //       const adminAccessToken = Cookies.get("adminAccessToken");
  //       const response = await axios.get(`${urls.getCourses}${id}/projects/`, {
  //         headers: {
  //           Authorization: `Bearer ${adminAccessToken}`,
  //         },
  //       });
  //       if (response.status === 200) {
  //         setModuleCount(response.data.length);
  //         setLoading(false);
  //       } else {
  //         console.error(`Error fetching modules for course ${id}`);
  //         setModuleCount(0);
  //       }
  //     } catch (error: any) {
  //       console.error(`Error: ${error.message}`);
  //       setModuleCount(0);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getProjectCount();
  // }, []);

  // const imageUrl = img?.replace("image/upload/", "");
  const { getProjectCount } = useProjectCount();
  const [moduleCount, setModuleCount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchModuleCount = async () => {
      setLoading(true);
      const count = await getProjectCount(id);
      setModuleCount(count);
      setLoading(false);
    };

    fetchModuleCount();
  }, [id, getProjectCount]);

  return (
    <div className="relative">
      <div
        key={id}
        onClick={() => {
          handleCardClick(id);
          // fetchProjectRead()
        }}
        className=" w-full cursor-pointer h-[374px] shadow-md rounded-[8px] bg-[#FFF]"
      >
        <Image
          src={img}
          width={100}
          height={100}
          alt={title}
          priority
          className="rounded-tr-[4px] h-[191px] object-cover w-full rounded-tl-[4px]"
        />
        <div className="p-2">
          <div className="md:mb-14 mb-5">
            <h1 className="md:text-xl text-base font-medium">{title}</h1>
            {/* <p className="md:text-lg text-xs text-[#3E3E3E]">{paragraph}</p> */}
          </div>
          <div className="absolute bottom-3">
            <div className="flex md:text-base text-xs items-center gap-x-1">
              <BookText className="text-main" />
              {loading ? (
                <>
                  <LucideLoader2 className="animate-spin" />
                </>
              ) : (
                moduleCount
              )}{" "}
              projects
            </div>
          </div>
        </div>
      </div>
      {/* <div
        onClick={handleOpen}
        className="p-2 bg-white cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center absolute top-2 right-2 hover:bg-red-500 duration-150 ease-in-out text-red-500 hover:text-white"
      >
        <Trash2 className="" />
      </div> */}
    </div>
  );
};

export default ProjectCard;
