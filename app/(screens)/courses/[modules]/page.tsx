"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SideNav from "@/components/side-comp/side-nav";
import { ArrowLeft, ChevronRight, Edit3, Loader2, Plus, X } from "lucide-react";
import TopNav from "@/components/side-comp/topNav";
import useCourseRead from "@/store/course-read";
import "react-toastify/dist/ReactToastify.css";
import SideModules from "@/components/side-comp/side-modules";
import { Input } from "@/components/ui/input";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import axios from "axios";
import { urls } from "@/utils/config";
import ReactMarkdown from "react-markdown";

const Module = () => {
  const router = useRouter();
  const params = useParams<{ modules: string }>();
  const courseID = params.modules;

  const [selectedModuleId, setSelectedModuleId] = useState(courseID);

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
  const [modulesGithubLink, setModuleGithubLink] = useState("");
  const [modulesLink, setModuleLink] = useState("");
  const [editLoading, seteditLoading] = useState(false);

  const editModule = async (e: any) => {
    e.preventDefault();

    if (moduleTitle !== "" && modulesGithubLink !== "" && modulesLink !== "") {
      try {
        const adminAccessToken = Cookies.get("adminAccessToken");
        seteditLoading(true);
        const response = await axios.post(
          `${urls.getCourses}${courseID}/modules/`,
          {
            module_title: moduleTitle,
            module_url: modulesGithubLink,
            module_video_link: modulesLink,
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
          toast.success("Module successfully added!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          // window.parent.location = window.parent.location.href;
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
    fetchCourseRead(courseID);
  }, [courseID]);

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <ArrowLeft
            onClick={() => {
              router.back();
            }}
            className="cursor-pointer"
          />
          <TopNav />
        </div>
        {loading ? (
          <div className="w-[100%] flex items-center justify-center h-screen">
            <Loader2 className=" w-8 h-8 animate-spin" />
            <p>Loading Course Information</p>
          </div>
        ) : (
          <div className="p-4">
            <span className="flex gap-1 items-center">
              <p className="text-sm text-main">Course Content</p>{" "}
              <ChevronRight className="text-main" />{" "}
              <p className="text-sm text-[#9C9C9C]">{courseRead?.title}</p>{" "}
            </span>
            <div className="lg:grid flex flex-col-reverse grid-cols-10 gap-x-2 my-2 ">
              <div className="bg-white col-span-7 p-2 rounded-[8px] shadow-sm">
                <h1 className="md:text-2xl text-xl text-main py-2">
                  {courseRead?.title}
                </h1>
                {/* <span
                  dangerouslySetInnerHTML={{ __html: courseRead?.overview }}
                  className="text-[#3E3E3E] text-justify md:text-base text-sm"
                ></span> */}

                <ReactMarkdown>{courseRead?.overview}</ReactMarkdown>
              </div>
              <SideModules
                handleModal={handleModal}
                courseRead={courseRead}
                selectedModuleId={selectedModuleId}
                handleItemClick={handleItemClick}
                noEdit={true}
              />
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
                <label className=" text-base">Video Link</label>
                <Input
                  value={modulesLink}
                  onChange={(e) => setModuleLink(e.target.value)}
                  type="url"
                  placeholder="Input module video link"
                />
              </div>
              <div className="py-2">
                <label className=" text-base">Github Link</label>
                <Input
                  value={modulesGithubLink}
                  onChange={(e) => setModuleGithubLink(e.target.value)}
                  type="url"
                  placeholder="Input github video link"
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
              {editLoading ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Module;
