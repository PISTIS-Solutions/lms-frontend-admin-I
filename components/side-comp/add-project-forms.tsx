"use client";
import React, { useState, MouseEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2Icon, MinusCircle, PlusCircle, X } from "lucide-react";
import useCourseFormStore from "@/store/course-module-project";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import PublishBtn from "./publishBtn";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "./toolbar";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddProjectForms = () => {
  const [sections, setSections] = useState([{ id: 1 }]);

  const {
    setFilteredProjectData,
    filteredProjectDataStore,
    courseTitle,
    description,
    courseLink,
    selectedFile,
    hours,
    minutes,
    seconds,
    filteredModuleDataStore,
  } = useCourseFormStore();

  const addSection = () => {
    const newId = sections.length + 1;
    setSections([...sections, { id: newId }]);
    toast.success("Section Added", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });
  };

  const deleteSection = (id: any) => {
    setSections(sections.filter((section) => section.id !== id));
    toast.error("Section Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const uploadProject = async (): Promise<void> => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");
      const convertToISO8601 = (
        hours: number,
        minutes: number,
        seconds: number
      ): string => {
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return `PT${totalSeconds}S`;
      };
      setLoading(true);

      if (
        !courseTitle ||
        // !description ||
        !courseLink ||
        !selectedFile ||
        !filteredModuleDataStore.length ||
        !filteredProjectDataStore.length
      ) {
        toast.error("Error! Add Course again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        setLoading(false);
        router.replace("/courses/add-course");
        return;
      }

      const payload = new FormData();

      payload.append("title", courseTitle);
      payload.append(
        "course_duration",
        convertToISO8601(hours, minutes, seconds)
      );
      payload.append("course_url", courseLink);
      payload.append("course_image", selectedFile);

      filteredModuleDataStore.forEach((module: any, index: any) => {
        payload.append(`modules[${index}]module_title`, module.module_title);
        payload.append(`modules[${index}]module_url`, module.module_url);
        payload.append(
          `modules[${index}]module_video_link`,
          module.module_Github_url
        );
      });

      filteredProjectDataStore.forEach((project: any, index: any) => {
        payload.append(
          `projects[${index}]project_title`,
          project.project_title
        );
        payload.append(
          `projects[${index}]project_hint`,
          project.project_description
        );
        payload.append(`projects[${index}]project_url`, project.project_url);
      });

      const response = await axios.post(urls.uploadCourses, payload, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success(response.data.title + " added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        router.push("/courses");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await uploadProject();
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

  const onContinue = async (e: any) => {
    e.preventDefault();
    const areFieldsValid = sections.every((section) => {
      const projectTitleInput = document.getElementById(
        `projectTitle-${section.id}`
      ) as HTMLInputElement;
      const projectLinkInput = document.getElementById(
        `projectLink-${section.id}`
      ) as HTMLInputElement;
      const projectDetailsInput = document.getElementById(
        `projectDetails-${section.id}`
      ) as HTMLElement;

      return (
        projectTitleInput.value.trim() !== "" &&
        projectLinkInput.value.trim() !== "" &&
        (projectDetailsInput?.textContent?.trim() ?? "") !== ""
      );
    });

    if (!areFieldsValid) {
      toast.error("Check form fields!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      return;
    }

    const filteredProjectData = sections.map((section) => {
      const projectTitleInput = document.getElementById(
        `projectTitle-${section.id}`
      ) as HTMLInputElement;
      const projectLinkInput = document.getElementById(
        `projectLink-${section.id}`
      ) as HTMLInputElement;
      const projectDetailsInput = document.getElementById(
        `projectDetails-${section.id}`
      ) as HTMLElement;

      return {
        project_title: projectTitleInput.value,
        project_url: projectLinkInput.value,
        project_description: projectDetailsInput?.textContent ?? "",
      };
    });

    setFilteredProjectData(
      filteredProjectData.filter(
        (data) =>
          data.project_title.trim() !== "" &&
          data.project_url.trim() !== "" &&
          data.project_description.trim() !== ""
      )
    );

    // console.log(filteredProjectData, "fp");
    // Call uploadProject
    // await uploadProject(e);
  };

  const test = () => {
    console.log("test");
  };

  useEffect(() => {
    if (
      !courseTitle ||
      // !description ||
      !courseLink ||
      !filteredModuleDataStore.length
    ) {
      toast.error("Error! Add Course again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      setLoading(false);
      router.replace("/courses/add-course");
      return;
    }
  }, []);

  // const [openPreview, setOpenPreview] = useState(false);
  // const handlepreview = () => {
  //   setOpenPreview((prev) => !prev);
  // };
  return (
    <div className="pt-5">
      <ToastContainer />
      {sections.map((section, index) => (
        <div key={section.id} className="mt-4">
          <div className="flex items-center justify-between">
            <h1 className="md:text-3xl text-xl font-semibold">
              Project Details
            </h1>
            {index > 0 ? (
              <Button
                onClick={() => deleteSection(section.id)}
                className="cursor-pointer flex items-center justify-center gap-2 bg-red-500 hover:text-white rounded-[8px] px-4 py-2 text-black"
              >
                <MinusCircle className="text-white" />
                <span className="text-sm font-normal">Delete Section</span>
              </Button>
            ) : (
              <Button
                onClick={addSection}
                className="cursor-pointer flex items-center justify-center gap-2 bg-[#F1F1F1] hover:text-white rounded-[8px] px-4 py-2 text-black"
              >
                <PlusCircle />
                <span className="text-sm font-normal">Add Section</span>
              </Button>
            )}
            {/* <div className="flex items-center justify-betwee mt-4"></div> */}
          </div>

          <form className="my-4">
            <div>
              <div className="flex  flex-end">
                {/* <button
                  onClick={() => {
                    handlepreview();
                  }}
                >
                  Preview
                </button> */}
              </div>
              <label className="md:text-xl text-sm text-[#3E3E3E]">
                <p className="">Project Title</p>
              </label>
              <div className="">
                <Input
                  type="text"
                  name={`projectTitle-${section.id}`}
                  id={`projectTitle-${section.id}`}
                  className="bg-[#FAFAFA] "
                  placeholder="Input Project Title"
                />
              </div>
            </div>
            <div>
              <label className="md:text-xl text-sm text-[#3E3E3E]">
                <p className="mt-2">Project Link</p>
              </label>
              <div>
                <Input
                  type="url"
                  name={`projectLink-${section.id}`}
                  id={`projectLink-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Input Project Sub-Title"
                />
              </div>
            </div>
            <div>
              <label className="md:text-xl text-sm text-[#3E3E3E]">
                <p className="mt-2">Additional Note</p>
              </label>
              <div>
                <ReactQuill
                  modules={{ toolbar: toolbarOptions }}
                  theme="snow"
                  // name={`moduleDetails-${section.id}`}
                  id={`projectDetails-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Input project content details"
                  // value={description}
                  // onChange={setDescription}
                />
              </div>
            </div>
          </form>
        </div>
      ))}
      <PublishBtn
        loading={loading}
        onContinue={onContinue}
        upload={uploadProject}
        test={test}
      />

      <div className="bg-white overflow-y-scroll w-3/4 h-[60vh] p-2 rounded-[8px]">
        <div className="">
          <h1 className="font-semibold text-xl text-main">
            Course Details Preview
          </h1>
        </div>
        <div>
          <ul>
            {/* <Image src={selectedFile} alt={courseTitle}/> */}
            <li className="py-1">
              <span className="font-semibold text-main">Course Title:</span>{" "}
              <br /> {courseTitle}
            </li>
            <li className="py-1">
              <span className="font-semibold text-main">Course Duration:</span>{" "}
              <br /> {hours} Hours, {minutes} Minutes and {seconds} Seconds
            </li>
            <li className="py-1">
              <span className="font-semibold text-main">
                Course Description:
              </span>
              <p
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
                className=" text-[#3E3E3E]"
              ></p>
            </li>
            <li className="py-1">
              <span className="font-semibold text-main">CourseLink:</span>{" "}
              <br /> {courseLink}
            </li>
            <hr />
            <div className="py-2">
              <h1>Modules</h1>
              {filteredModuleDataStore.map((module: any) => {
                return (
                  <ul key={module.id}>
                    <ol className="py-1">
                      <span className="font-semibold text-main">
                        Module Title:
                      </span>{" "}
                      <br /> {module.module_title}
                    </ol>
                    {/* <ol className="py-1">
                      <span className="font-semibold text-main">
                        Module SubTitle:
                      </span>{" "}
                      <br /> {module.module_sub_title}
                    </ol> */}
                    <ol className="py-1">
                      <span className="font-semibold text-main">
                        Module Description:
                      </span>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: module.description,
                        }}
                        className=" text-[#3E3E3E]"
                      ></p>
                    </ol>

                    <ol className="py-1">
                      <span className="font-semibold text-main">
                        Module Link:
                      </span>{" "}
                      <br /> <span>{module.module_url}</span>
                    </ol>
                    <hr />
                  </ul>
                );
              })}
            </div>
            {/* <div>
              <h1>Projects</h1>
              {filteredProjectDataStore.map((project: any) => {
                return (
                  <ul>
                    <ol>Project Title: {project.project_title}</ol>
                    <ol>Project Description: {project.project_description}</ol>
                    <ol>Project Link: {project.project_url}</ol>
                  </ul>
                );
              })}
            </div> */}
          </ul>
        </div>
      </div>
      {/* {openPreview && (
        <div className="absolute top-0 flex items-center justify-center right-0 w-full h-screen bg-black/25">
         
        </div>
      )} */}
    </div>
  );
};

export default AddProjectForms;
