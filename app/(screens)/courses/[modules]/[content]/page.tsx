"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SideNav from "@/components/side-comp/side-nav";
import { ArrowLeft, ChevronRight, Edit3, Loader2, X } from "lucide-react";

import ReactPlayer from "react-player";

import { ScrollArea } from "@/components/ui/scroll-area";
import TopNav from "@/components/side-comp/topNav";

import useModuleRead from "@/store/module-read";
import SideModules from "@/components/side-comp/side-modules";
import useCourseRead from "@/store/course-read";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import axios from "axios";
import { urls } from "@/utils/config";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import {
  CustomH2,
  code,
  customH3,
  customOL,
  customP,
  customTD,
  customTH,
  customUL,
  strong,
} from "@/utils/markdown";

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
  const [moduleTitle, setModuleTitle] = useState("");
  const [modulesLink, setModuleLink] = useState("");
  const [modulesGithubLink, setModuleGithubLink] = useState("");
  const [editLoading, seteditLoading] = useState(false);

  useEffect(() => {
    if (moduleData?.module_title) {
      setModuleTitle(moduleData.module_title);
    }
    if (moduleData?.module_video_link) {
      setModuleLink(moduleData.module_video_link);
    }
    if (moduleData?.module_url) {
      setModuleGithubLink(moduleData.module_url);
    }
  }, [moduleData]);

  const handleInputChange = (setter: any) => (e: any) => {
    setter(e.target.value);
  };

  const editModule = async (e: any) => {
    e.preventDefault();

    // console.log(" module_title:", moduleTitle,);
    // console.log("module_video_link:", modulesLink)
    // console.log(modulesGithubLink, "modgit")
    if (moduleTitle !== "" && modulesLink !== "") {
      try {
        const adminAccessToken = Cookies.get("adminAccessToken");
        seteditLoading(true);
        const response = await axios.patch(
          `${urls.getCourses}${courseID}/modules/${moduleID}/`,
          {
            module_title: moduleTitle,
            module_video_link: modulesLink,
            module_url: modulesGithubLink,
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
          // window.parent.location = window.parent.location.href;
          fetchModuleRead(courseID, moduleID);
          fetchCourseRead(courseID);
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
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
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
                {courseRead?.title}
              </h1>
              <div className="md:grid flex flex-col-reverse gap-x-2 grid-cols-10">
                <span className="relative col-span-7">
                  <ReactPlayer
                    controls={true}
                    width="100%"
                    height="100%"
                    playing={false}
                    url={moduleData?.module_video_link}
                    className="md:h-[428px] md:my-0 my-4"
                    config={{
                      youtube: {
                        playerVars: {
                          modestbranding: 1,
                          controls: 1,
                        },
                      },
                    }}
                  />
                  {/* <div className=" bg-transparent cursor-not-allowed w-full h-14 absolute top-0" />
                  <div className=" bg-transparent cursor-not-allowed w-full h-14 absolute bottom-0" /> */}
                </span>
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
                      noEdit={false}
                    />
                  )}
                </ScrollArea>
              </div>
              <div className="bg-white shadow-md p-4">
                <div className="flex justify-between items-center">
                  <h1 className="md:text-2xl text-lg font-medium">
                    Module: {moduleData?.module_title}
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
                  {/* <p
                    dangerouslySetInnerHTML={{
                      __html: moduleData?.description,
                    }}
                    className="py-4 text-[#3E3E3E]"
                  ></p> */}
                  <ReactMarkdown
                    className="py-4 text-[#3E3E3E]"
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: CustomH2,
                      h3: customH3,
                      ol: customOL,
                      p: customP,
                      ul: customUL,
                      th: customTH,
                      td: customTD,
                      strong: strong,
                      code: code,
                    }}
                  >
                    {moduleData?.description}
                  </ReactMarkdown>
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
                    onChange={handleInputChange(setModuleTitle)}
                    placeholder={moduleData?.module_title}
                  />
                </div>

                <div className="py-2">
                  <label className=" text-base">Gihub Link</label>
                  <Input
                    type="url"
                   value={modulesGithubLink}
                    onChange={handleInputChange(setModuleGithubLink)}
                    placeholder={moduleData?.module_url}
                  />
                </div>
                <div className="py-2">
                  <label className=" text-base">Video Link</label>
                  <Input
                    type="url"
                    value={modulesLink}
                    onChange={handleInputChange(setModuleLink)}
                    placeholder={moduleData?.module_video_link}
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
