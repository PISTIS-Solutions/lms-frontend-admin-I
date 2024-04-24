"use client";
import { ChevronRight, Plus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const SideProjects = ({
  project,
  handleItemClick,
  bool,
  selectedProjectId,
  handleModal,
}: any) => {
  return (
    <div className="lg:col-span-3 md:mb-0 mb-4 col-span-10 ">
      <div className="bg-white shadow-md rounded-[8px]">
        <div className="text-main p-4 text-lg md:text-2xl font-medium flex justify-between items-center py-2">
          <h3>Projects</h3>
          <span
            onClick={() => {
              handleModal();
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <p className="underline">Add</p>
            <Plus />
          </span>
        </div>
        <div className="">
          {project?.map((head: any, index: number) => {
            return (
              <div>
                {!bool ? (
                  <div
                    key={head.id}
                    onClick={() => {
                      handleItemClick(head.id);
                    }}
                    className={`cursor-pointer hover:bg-main ${
                      index === 0 ? "bg-main text-white" : "bg-white"
                    }`}
                  >
                    <h3 className="text-base md:text-lg py-3 px-4 hover:text-white flex justify-between items-center font-medium">
                      {index + 1}. {head.project_title}
                      <ChevronRight />
                    </h3>
                  </div>
                ) : (
                  <div
                    key={head.id}
                    onClick={() => {
                      handleItemClick(head.id);
                    }}
                    className={`cursor-pointer hover:bg-main ${
                      head.id === selectedProjectId
                        ? "bg-main text-white"
                        : "bg-white"
                    }`}
                  >
                    <h3 className="text-base md:text-lg py-3 px-4 hover:text-white flex justify-between items-center font-medium">
                      {index + 1}. {head.project_title}
                      <ChevronRight />
                    </h3>
                    <hr />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="my-5">
        <Button className="bg-sub w-full text-xl font-medium text-black hover:bg-main hover:text-white">
          Submit
        </Button>
      </div> */}
    </div>
  );
};

export default SideProjects;
