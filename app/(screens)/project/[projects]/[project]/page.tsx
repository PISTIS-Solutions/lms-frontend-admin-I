"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  ChevronRight,
  Edit3,
  Loader2,
  Loader2Icon,
  Plus,
  X,
} from "lucide-react";
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
  customLink,
} from "@/utils/markdown";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useOutsideClick } from "@/utils/outsideClick";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { GrTarget } from "react-icons/gr";
import Image from "next/image";
import modIcon from "@/src/assets/modIcon.svg";
import EditProject from "@/components/side-comp/modal/edit-project";

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
      // console.log(project, "pr")
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

  const addProject = async (e: any) => {
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
          toast.success("New project added successfully!", {
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
          await addProject(e);
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

  const [openOptions, setOpenOptions] = useState(false);
  const openOptionsFunct = () => {
    setOpenOptions(true);
  };

  const optionsRef = useRef<HTMLDivElement>(null);

  useOutsideClick(optionsRef, () => setOpenOptions(false));

  const [modal, setModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const handleOpen = async () => {
    setModal(true);
    setOpenOptions(false);
  };

  const deleteCourse = async () => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");

      setDeleting(true);
      const response = await axios.delete(
        `${urls.deleteCourse}/${courseID}/projects/${project?.id}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );

      if (response.status === 204) {
        setDeleting(false);
        toast.error(`${project?.project_title} deleted successfully.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        // router.push(`/project/${project?.id}`);
        // window.location.reload();
        // fetchProjects()
        // fetchCourses();
      } else {
        // console.error("Failed to delete course.");
      }
    } catch (error: any) {
      // console.error("Error deleting course:", error.response.data.detail);
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await deleteCourse();
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

  //edit functionality
  const [editModal, setEditModal] = useState(false);
  const openEditModal = () => {
    setEditModal(true);
    setOpenOptions(false);
  };

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("admin_role");
    setRole(userRole);
  }, []);

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
        {/* <div>
          <div className=" px-4 mt-3 text-xs md:text-sm font-medium flex items-center">
            <p className="text-[#000066]">Course Content</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#000066]"> {project?.course}</p>
            <ChevronRight className="text-[#000066]" />
            <p className="text-[#000066]"> {project?.project_title}</p>
          </div>
        </div> */}
        <div className="flex items-center justify-between mt-4 relative">
          <div className="px-5 ">
            <p className=" font-medium text-[#666666] text-sm">
              {project?.course}
            </p>
            <h3 className=" font-semibold text-2xl text-main">
              {project?.project_title}
            </h3>
          </div>
          <div>
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
                className="bg-white rounded-[8px] z-10 shadow-md p-4 h-auto absolute top-4 right-2 w-[140px]"
                ref={optionsRef}
              >
                <div className="flex items-center gap-x-1 cursor-pointer hover:bg-primary hover:text-white hover:rounded-[8px] p-0.5">
                  <BiEdit className="w-[14px] h-[14px]" />
                  <p onClick={openEditModal} className=" text-xs font-normal">
                    Edit Project
                  </p>
                </div>
                <div
                  onClick={handleOpen}
                  className="flex items-center gap-x-1 text-red-500 font-medium cursor-pointer hover:bg-red-500 mt-1 hover:text-white hover:rounded-[8px] p-0.5"
                >
                  <FaTrashAlt className="w-[14px] h-[14px]" />
                  <p className=" text-xs font-normal">Delete Project</p>
                </div>
              </div>
            )}
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
                    {/* <h2 className="font-medium text-lg md:text-2xl text-main">
                      {project?.project_title}
                    </h2> */}
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
                        code: code,
                        a: customLink,
                      }}
                    >
                      {project?.project_description}
                    </Markdown>
                    <span>
                      <p className="text-main font-semibold">Hint: </p>
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
                          a: customLink,
                          code: code,
                        }}
                      >
                        {project?.project_hint}
                      </Markdown>
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
              role={role}
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
                addProject(e);
              }}
              disabled={editLoading}
              className="bg-sub hover:text-white disabled:bg-sub/25 rounded-[8px] py-2 font-semibold mt-4 text-black w-full"
            >
              {editLoading ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </div>
        </div>
      )}
      {modal && (
        <section className="absolute top-0 flex justify-center items-center left-0  bg h-screen w-full backdrop-blur-[5px] bg-white/30">
          <div className="bg-white h-[368px] rounded-[8px] w-[90%] md:w-[608px] shadow-lg md:p-6 px-3">
            <div className="bg-[#FF0000] w-[72px] mx-auto h-[72px] p-2 rounded-full flex items-center justify-center shadow-md">
              <IoTrash className=" text-3xl text-white" />
            </div>
            <h1 className="md:text-2xl text-lg font-semibold text-center py-2">
              Are you sure you want to <br /> delete this project?
            </h1>
            <p className="md:text-base text-center  text-sm text-[#3E3E3E] font-normal">
              You’ll permanently lose this project
            </p>

            <div className="flex md:gap-x-2 gap-x-1 mt-10 justify-between md:justify-end items-center">
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
                  <p>Delete Project</p>
                )}
              </button>
            </div>
          </div>
        </section>
      )}
      {editModal && (
        <section className="absolute top-0 flex justify-center items-center left-0 bg h-screen w-full backdrop-blur-[5px] bg-white/30">
          <EditProject
            courseID={courseID}
            project={project}
            setEditModal={setEditModal}
            fetchProjects={fetchProjects}
          />
        </section>
      )}
    </main>
  );
};

export default SideProject;
