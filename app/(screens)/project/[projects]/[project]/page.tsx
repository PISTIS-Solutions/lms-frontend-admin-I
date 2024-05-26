"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ChevronRight, Edit3, Loader2, Plus, X } from "lucide-react";
import { dummydata } from "@/app/data/dummyModules";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/side-comp/topNav";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import SideProjects from "@/components/side-comp/side-projects";
import { Input } from "@/components/ui/input";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "@/components/side-comp/toolbar";
import Markdown from "react-markdown";
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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const SideProject = () => {
  const router = useRouter();
  //   const [showList, setShowList] = useState(false);
  const params = useParams<{ projects: string; project: string }>();
  const courseID = params.projects;
  const projectID = params.project;

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState(projectID);

  const fetchProjectsRead = async () => {
    try {
      setLoading(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(
        `${urls.getCourses}${courseID}/projects/${projectID}/`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      setProject(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchProjectsRead();
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
      setLoading(false);
    }
  };

  const handleItemClick = (projectId: any) => {
    setSelectedProjectId(projectId === selectedProjectId ? null : projectId);
    router.replace(`/project/${courseID}/${projectId}`);
  };
  const [loadingProjectList, setLoadingProjectList] = useState(false);
  const [projectList, setProjectList] = useState<any | null>(null);

  const fetchProjects = async () => {
    try {
      setLoadingProjectList(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(
        `${urls.getCourses}${courseID}/projects/`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      setProjectList(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchProjects();
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
      setLoadingProjectList(false);
    }
  };

  useEffect(() => {
    fetchProjectsRead();
    fetchProjects();
  }, [courseID, projectID]);
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const [projectTitle, setProjectitle] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [description, setDescription] = useState("");
  const [editLoading, seteditLoading] = useState(false);

  const editModule = async (e: any) => {
    e.preventDefault();

    if (projectTitle !== "" && projectLink !== "" && description !== "") {
      try {
        const adminAccessToken = Cookies.get("adminAccessToken");
        seteditLoading(true);
        const response = await axios.post(
          `${urls.getCourses}${courseID}/projects/`,
          {
            project_title: projectTitle,
            project_url: projectLink,
            project_hint: description,
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
          toast.success("Project successfully edited!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          // window.parent.location = window.parent.location.href;
          fetchProjectsRead();
          fetchProjects();
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

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
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
        <div>
          <div className=" px-4 mt-3 text-xs md;text-sm font-medium flex items-center">
            <p className="text-[#000066]">Course Content</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#000066]"> {project?.course}</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#000066]"> {project?.project_title}</p>
          </div>
        </div>
        {loading ? (
          <div className="w-[100%] flex items-center justify-center h-screen">
            <Loader2 className=" w-8 h-8 animate-spin" />
            <p>Loading Project Information</p>
          </div>
        ) : (
          <div className="lg:grid flex flex-col-reverse grid-cols-10 relative gap-x-4 p-5">
            <div className="col-span-7 bg-white shadow-md rounded-[8px]  ">
              <div>
                <div>
                  <div className="p-4">
                    <h2 className="font-medium text-lg md:text-2xl text-main">
                      {project?.project_title}
                    </h2>
                    <Markdown
                      className="font-normal py-2 text-justify text-[#3E3E3E] text-base md:text-xl"
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
                        code: code
                      }}
                    >
                      {project?.project_description}
                    </Markdown>
                    <span>
                      <p className="text-main font-semibold">Hint: </p>
                      <ReactMarkdown
                        className="font-normal py-2 text-justify text-[#3E3E3E] text-base md:text-xl"
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
                        }}
                      >
                        {project?.project_hint}
                      </ReactMarkdown>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <SideProjects
              project={projectList}
              handleItemClick={handleItemClick}
              bool={true}
              selectedProjectId={selectedProjectId}
              handleModal={handleModal}
            />
          </div>
        )}
      </div>
      {openModal && (
        <div className="bg-black/25 w-full flex justify-center items-center h-screen absolute top-0 left-0">
          <div className="bg-white w-[70vw] border-t-2 overflow-y-scroll rounded-[8px] p-5 border-t-main">
            <div className="flex items-center justify-between ">
              <h1 className="text-main font-semibold text-xl">
                Project Details
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
                <label className=" text-base">Project title</label>
                <Input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectitle(e.target.value)}
                  placeholder="Input Project title"
                />
              </div>

              <div className="py-2">
                <label className=" text-base">Github Link</label>
                <Input
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  type="url"
                  placeholder="Input Project github link"
                />
              </div>
              <div className="py-2">
                <label className=" text-base">Description</label>
                <ReactQuill
                  modules={{ toolbar: toolbarOptions }}
                  theme="snow"
                  placeholder="Input Project Hint"
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
              {editLoading ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default SideProject;
