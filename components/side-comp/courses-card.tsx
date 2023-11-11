import Image from "next/image";
import React from "react";

import img from "@/public/assets/course/ansible.png";
import { BookText, Hourglass, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface cardProps {
  id: number;
  img: any;
  title: string;
  paragraph: string;
  module: { moduleHeader: string; moduleBody: string }[];
  duration: number;
  handleCardClick: any;
  handleOpen: () => void;
}

const CoursesCard = ({
  id,
  img,
  title,
  paragraph,
  module,
  duration,
  handleCardClick,
  handleOpen,
}: cardProps) => {
  return (
    <div className="relative">
      <div
        key={id}
        onClick={() => {
          handleCardClick(id);
        }}
        className=" w-full cursor-pointer h-auto shadow-md rounded-[8px] bg-[#FFF]"
      >
        <Image
          src={img}
          alt="img"
          className="rounded-tr-[4px] w-full rounded-tl-[4px]"
        />
        <div className="p-2">
          <div className="mb-14">
            <h1 className="text-xl font-medium">{title}</h1>
            <p className="text-lg text-[#3E3E3E]">{paragraph}</p>
          </div>
          <div className="flex items-center gap-x-4 mt-4">
            <div className="flex items-center gap-x-1">
              <BookText className="text-main" />
              {/* {module} module */}
              {module.length} module
            </div>
            <div className="flex items-center gap-x-1">
              <Hourglass className="text-main" />
              {duration} week
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={handleOpen}
        className="p-2 bg-white cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center absolute top-2 right-2 hover:bg-red-500 duration-150 ease-in-out text-red-500 hover:text-white"
      >
        <Trash2 className="" />
      </div>
    </div>
  );
};

export default CoursesCard;
