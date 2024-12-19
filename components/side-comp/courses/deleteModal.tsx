import { Loader2, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { GrTarget } from "react-icons/gr";
import { IoTrash } from "react-icons/io5";

const DeleteModal = ({
  modGray,
  selectedCourse,
  moduleCounts,
  projectCounts,
  deleting,
  setModal,
  deleteCourse,
}: any) => {
  return (
    <section className="absolute top-0 flex z-[99] justify-center items-center left-0  bg h-screen w-full backdrop-blur-[5px] bg-white/30">
      <div className="bg-white h-[368px] rounded-[8px] w-[90%] md:w-[608px] shadow-lg md:p-6 px-3">
        <div className="bg-[#FF0000] w-[72px] mx-auto h-[72px] p-2 rounded-full flex items-center justify-center shadow-md">
          <IoTrash className=" text-3xl text-white" />
        </div>
        <h1 className="md:text-2xl text-lg font-semibold text-center py-2">
          Are you sure you want to <br /> delete this course?
        </h1>
        <p className="md:text-base text-center text-sm text-[#3E3E3E] font-normal">
          You’ll permanently lose:
        </p>
        <div className="flex items-center gap-3 justify-center py-8">
          <div className="flex items-center gap-x-2">
            <Image src={modGray} alt="" className="w-[24px] h-[24px]" />
            <p className="md:text-base text-center flex items-center text-sm text-[#3E3E3E] font-normal">
              {selectedCourse ? (
                moduleCounts[selectedCourse] || (
                  <Loader2 className="animate-spin" />
                )
              ) : (
                <Loader2 className="animate-spin" />
              )}{" "}
              Module(s)
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <GrTarget className="w-[24px] h-[24px] text-[#3E3E3E]" />
            <p className="md:text-base text-center flex items-center text-sm text-[#3E3E3E] font-normal">
              {selectedCourse ? (
                projectCounts[selectedCourse] || (
                  <Loader2 className="animate-spin" />
                )
              ) : (
                <Loader2 className="animate-spin" />
              )}{" "}
              Project(s)
            </p>
          </div>
        </div>
        <div className="flex md:gap-x-2 gap-x-1 justify-between my-2 md:my-0 md:justify-end items-center">
          <p
            className="cursor-pointer w-full py-4 rounded-[8px] text-center border border-[#3e3e3e] text-sm md:text-lg hover:bg-[#3e3e3e] hover:text-white font-medium"
            onClick={() => setModal(false)}
          >
            Cancel
          </p>
          <button
            disabled={deleting}
            onClick={() => deleteCourse(selectedCourse!)}
            className="bg-[#FF0000] w-full py-4 flex justify-center items-center hover:text-[#ff0000] hover:bg-white hover:border hover:border-[#ff0000] text-white text-sm md:text-lg rounded-[8px] font-medium"
          >
            {deleting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <p>Delete Course</p>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
