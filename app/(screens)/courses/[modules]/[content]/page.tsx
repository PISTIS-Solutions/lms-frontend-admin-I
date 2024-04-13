"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SideNav from "@/components/side-comp/side-nav";
import { ArrowLeft, ChevronRight, Edit3, Loader2, Plus, X } from "lucide-react";

import ReactPlayer from "react-player";

import { ScrollArea } from "@/components/ui/scroll-area";
import TopNav from "@/components/side-comp/topNav";

import useModuleRead from "@/store/module-read";
import SideModules from "@/components/side-comp/side-modules";
import useCourseRead from "@/store/course-read";
import { Input } from "@/components/ui/input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "@/components/side-comp/toolbar";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import axios from "axios";
import { urls } from "@/utils/config";

const Content = () => {
  const params = useParams<{ modules: string; content: string }>();
  const router = useRouter();
  const courseID = params.modules;
  const moduleID = params.content;

  const [selectedModuleId, setSelectedModuleId] = useState(moduleID);
  const { moduleData, fetchModuleRead, moduleLoading } = useModuleRead();
  const { courseRead, fetchCourseRead, loading } = useCourseRead();
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleItemClick = (moduleId: any) => {
    setSelectedModuleId(moduleId === selectedModuleId ? null : moduleId);
    router.replace(`/courses/${courseID}/${moduleId}`);
  };
  const [moduleTitle, setModuletitle] = useState("");
  const [modulesubTitle, setModulesubtitle] = useState("");
  const [modulesLink, setModuleLink] = useState("");
  const [description, setDescription] = useState("");
  const [editLoading, seteditLoading] = useState(false);

  const editModule = async (e: any) => {
    e.preventDefault();

    if (moduleTitle !== "" && modulesubTitle !== "" && modulesLink !== "") {
      try {
        const adminAccessToken = Cookies.get("adminAccessToken");
        seteditLoading(true);
        const response = await axios.patch(
          `${urls.getCourses}${courseID}/modules/${moduleID}/`,
          {
            module_title: moduleTitle,
            module_sub_title: modulesubTitle,
            module_url: modulesLink,
            description: description,
          },
          {
            headers: {
              Authorization: `Bearer ${adminAccessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          seteditLoading(false);
          setOpenModal(false);
          toast.success("Module successfully edited!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          window.parent.location = window.parent.location.href;
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          await refreshAdminToken();
          await editModule(e);
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
        seteditLoading(false);
      }
    } else {
      toast.error("Check fields fields!", {
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

  useEffect(() => {
    fetchModuleRead(courseID, moduleID);
    fetchCourseRead(courseID);
  }, [courseID, moduleID, fetchModuleRead, fetchCourseRead]);

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <ToastContainer />
        <div className="md:h-[96px] h-[60px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <ArrowLeft
            onClick={() => {
              router.back();
            }}
            className="cursor-pointer"
          />
          <TopNav />
        </div>
        <div className="">
          <div className=" px-4 mt-3 text-xs md;text-sm font-medium flex items-center">
            <p className="text-[#000066]">Course Content</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#000066]">Modules</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#000066]"> {moduleData?.module_title}</p>
          </div>
          {moduleLoading ? (
            <div className="w-[100%] flex items-center justify-center h-screen">
              <Loader2 className=" w-8 h-8 animate-spin" />
              <p>Loading Module Information</p>
            </div>
          ) : (
            <div>
              <h1 className=" px-4 text-[#1A1A1A] text-lg md:text-2xl my-4 font-medium">
                {moduleData?.module_title}
              </h1>
              <div className="md:grid block p-4 gap-x-4 grid-cols-10">
                <ReactPlayer
                  light={true}
                  controls={true}
                  url={moduleData?.module_url}
                  className="w-full h-[428px] md:col-span-7"
                />
                <ScrollArea className="h-[428px] rounded-[8px] shadow-md my-2 md:my-0 bg-white col-span-3">
                  {loading ? (
                    <div className="w-[100%] flex items-center justify-center h-screen">
                      <Loader2 className=" w-8 h-8 animate-spin" />
                      <p>Loading Modules</p>
                    </div>
                  ) : (
                    <SideModules
                      courseRead={courseRead}
                      selectedModuleId={selectedModuleId}
                      handleItemClick={handleItemClick}
                    />
                  )}
                </ScrollArea>
              </div>
              <div className="bg-white shadow-md p-4">
                <div className="flex justify-between items-center">
                  <h1 className="md:text-2xl text-lg font-medium">
                    Module 1: {moduleData?.module_title}
                  </h1>
                  <span
                    onClick={handleModal}
                    className=" md:text-xl text-sm text-main underline gap-x-2 cursor-pointer flex items-center"
                  >
                    <p className="">Edit</p>
                    <Edit3 />
                  </span>
                </div>
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: moduleData?.description,
                    }}
                    className="py-4 text-[#3E3E3E]"
                  ></p>
                </div>
              </div>
            </div>
          )}
        </div>
        {openModal && (
          <div className="bg-black/25 w-full flex justify-center items-center h-screen absolute top-0 left-0">
            <div className="bg-white w-[70vw] border-t-2 overflow-y-scroll rounded-[8px] p-5 border-t-main">
              <div className="flex items-center justify-between ">
                <h1 className="text-main font-semibold text-xl">
                  Module Details
                </h1>
                <span
                  onClick={handleModal}
                  className="border border-main rounded-[8px] cursor-pointer"
                >
                  <X />
                </span>
              </div>
              <div className="mt-4">
                <div className="py-2">
                  <label className=" text-base">Module title</label>
                  <Input
                    type="text"
                    value={moduleTitle}
                    onChange={(e) => setModuletitle(e.target.value)}
                    placeholder="Input module title"
                  />
                </div>
                <div className="py-2">
                  <label className=" text-base">Sub-title</label>
                  <Input
                    value={modulesubTitle}
                    onChange={(e) => setModulesubtitle(e.target.value)}
                    type="text"
                    placeholder="Input module sub-title"
                  />
                </div>
                <div className="py-2">
                  <label className=" text-base">Video Link</label>
                  <Input
                    value={modulesLink}
                    onChange={(e) => setModuleLink(e.target.value)}
                    type="url"
                    placeholder="Input module video link"
                  />
                </div>
                <div className="py-2">
                  <label className=" text-base">Description</label>
                  <ReactQuill
                    modules={{ toolbar: toolbarOptions }}
                    theme="snow"
                    placeholder="Input module details"
                    value={description}
                    onChange={setDescription}
                    className="w-full"
                  />
                </div>
              </div>
              <Button
                onClick={(e) => {
                  editModule(e);
                }}
                disabled={editLoading}
                className="bg-sub hover:text-white disabled:bg-sub/25 rounded-[8px] py-2 font-semibold mt-4 text-black w-full"
              >
                {editLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Content;
