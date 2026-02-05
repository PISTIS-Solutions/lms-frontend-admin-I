"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import SideNav from "@/components/side-comp/side-nav";
import {
  ArrowLeft,
  ChevronRight,
  Edit3,
  Loader2,
  Loader2Icon,
  X,
} from "lucide-react";

import ReactPlayer from "react-player";

import { ScrollArea } from "@/components/ui/scroll-area";
import TopNav from "@/components/side-comp/topNav";

import useModuleRead from "@/store/module-read";
import modGray from "@/src/assets/modGray.svg";
import SideModules from "@/components/side-comp/side-modules";
import useCourseRead from "@/store/course-read";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
// import axios from "axios";
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
  customLink,
} from "@/utils/markdown";
import Link from "next/link";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useOutsideClick } from "@/utils/outsideClick";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { GrTarget } from "react-icons/gr";
import { IoTrash } from "react-icons/io5";
import { createAxiosInstance } from "@/lib/axios";

const Content = () => {
  const params = useParams<{ modules: string; content: string }>();
  const router = useRouter();
  const courseID = params.modules;
  const moduleID = params.content;
  const axios = createAxiosInstance();
  const [selectedModuleId, setSelectedModuleId] = useState(moduleID);
  const { moduleData, fetchModuleRead, moduleLoading } = useModuleRead();
  const { courseRead, fetchCourseRead, loading } = useCourseRead();
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState(false);
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
          },
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
        if (error?.message === "Network Error") {
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

  const [openOptions, setOpenOptions] = useState(false);
  const openOptionsFunct = () => {
    setOpenOptions(true);
  };

  const optionsRef = useRef<HTMLDivElement>(null);

  useOutsideClick(optionsRef, () => setOpenOptions(false));

  const [deleting, setDeleting] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };

  const deleteCourse = async () => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");

      setDeleting(true);
      const response = await axios.delete(
        `${urls.deleteCourse}/${courseID}/modules/${moduleData?.id}/`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        },
      );

      if (response.status === 204) {
        setDeleting(false);
        toast.error(`${moduleData?.module_title} deleted successfully.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        router.push(`/courses/${courseID}`);
        // window.location.reload();
        // fetchCourses();
      } else {
        // console.error("Failed to delete course.");
      }
    } catch (error: any) {
      // console.error("Error deleting course:", error.response.data.detail);
      if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else if (error.response.data.detail === "Not found.") {
        toast.error("Course already deleted!", {
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
      setModal(false);
      setDeleting(false);
    }
  };

  // console.log(moduleData, "md")
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("admin_role");
    setRole(userRole);
  }, []);

  return (
    <main className="relative h-screen bg-[#F8F9FF]">
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
            <Link href="/courses">
              <p className="text-[#000066]">Course Content</p>
            </Link>
            <ChevronRight className="text-[#000066]" />
            <Link href={`/courses/${moduleID}`}>
              <p className="text-[#000066]">Modules</p>
            </Link>
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
              <div className="relative flex items-center justify-between">
                <h1 className=" px-4 text-[#1A1A1A] text-lg md:text-2xl my-4 font-medium">
                  {courseRead?.title}
                </h1>
                {(role === "advanced" || role === "super_admin") && (
                  <button
                    onClick={openOptionsFunct}
                    className=" p-[6px] shadow-md bg-white cursor-pointer rounded-[4px] w-[24px] h-[24px] flex justify-center items-center duration-150 ease-in-out"
                  >
                    <FaEllipsisVertical className="text-primary" />
                  </button>
                )}
                {openOptions && (
                  <div
                    className="bg-white rounded-[8px] z-10 p-4 h-auto absolute top-7 right-2 w-[140px] shadow-md"
                    ref={optionsRef}
                  >
                    <div className="flex items-center gap-x-1 cursor-pointer hover:bg-primary hover:text-white hover:rounded-[8px] p-0.5">
                      <BiEdit className="w-[14px] h-[14px]" />
                      <p onClick={handleModal} className=" text-xs font-normal">
                        Edit Module
                      </p>
                    </div>
                    <div
                      onClick={handleOpen}
                      className="flex items-center gap-x-1 text-red-500 font-medium cursor-pointer hover:bg-red-500 mt-1 hover:text-white hover:rounded-[8px] p-0.5"
                    >
                      <FaTrashAlt className="w-[14px] h-[14px]" />
                      <p className=" text-xs font-normal">Delete Module</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="md:grid flex flex-col-reverse gap-x-2 grid-cols-10">
                <span className="relative col-span-7 md:my-0 my-4">
                  <ReactPlayer
                    controls={true}
                    width="100%"
                    height="100%"
                    playing={false}
                    url={moduleData?.module_video_link}
                    className=""
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
                <ScrollArea className="my-2 md:my-0 col-span-3 max-h-[428px]">
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
              <div className="bg-white shadow-md p-4 my-2">
                <div className="">
                  <h1 className="md:text-2xl text-lg font-medium">
                    Module: {moduleData?.module_title}
                  </h1>
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
                      a: customLink,
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
        {modal && (
          <section className="absolute top-0 flex justify-center items-center left-0  bg h-screen w-full backdrop-blur-[5px] bg-white/30">
            <div className="bg-white rounded-[8px] w-[90%] md:w-[608px] shadow-lg md:p-6 px-3">
              <div className="bg-[#FF0000] w-[72px] mx-auto h-[72px] p-2 rounded-full flex items-center justify-center shadow-md">
                <IoTrash className=" text-3xl text-white" />
              </div>
              <h1 className="md:text-2xl text-lg font-semibold text-center py-2">
                Are you sure you want to <br /> delete this module?
              </h1>
              {/* <p className="md:text-base text-center text-sm text-[#3E3E3E] font-normal">
                You’ll permanently lose:
              </p> */}
              {/* <div className="flex items-center gap-3 justify-center py-8">
                <div className="flex items-center gap-x-2">
                  <Image src={modGray} alt="" className="w-[24px] h-[24px]" />
                  <p className="md:text-base text-center flex items-center text-sm text-[#3E3E3E] font-normal">
                    0 Module(s)
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <GrTarget className="w-[24px] h-[24px] text-[#3E3E3E]" />
                  <p className="md:text-base text-center flex items-center text-sm text-[#3E3E3E] font-normal">
                    0 Project(s)
                  </p>
                </div>
              </div> */}
              <div className="flex md:gap-x-2 gap-x-1 justify-between my-2 md:my-0 md:justify-end items-center">
                <p
                  className="cursor-pointer w-full py-4 rounded-[8px] text-center border border-[#3e3e3e] text-sm md:text-lg hover:bg-[#3e3e3e] hover:text-white font-medium"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </p>
                <button
                  disabled={deleting}
                  onClick={() => deleteCourse()}
                  className="bg-[#FF0000] w-full py-4 flex justify-center items-center hover:text-[#ff0000] hover:bg-white hover:border hover:border-[#ff0000] text-white text-sm md:text-lg rounded-[8px] font-medium"
                >
                  {deleting ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <p>Delete Module</p>
                  )}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Content;
