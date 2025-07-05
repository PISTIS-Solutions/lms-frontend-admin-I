"use client";
import React, { useState, MouseEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { showToast } from "@/lib/showToast";
import { FaAnglesLeft, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddProjectForms = () => {
  const [sections, setSections] = useState([{ id: 1, isOpen: true }]);

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
    setCourseLink,
    setSelectedFile,
    setHours,
    setMinutes,
    setFilteredModuleData,
    setSeconds,
    setCourseTitle,
  } = useCourseFormStore();

  const toggleSection = (id: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, isOpen: !section.isOpen } : section
      )
    );
  };

  const addSection = () => {
    const newId = sections.length + 1;
    setSections([...sections, { id: newId, isOpen: true }]);
    showToast("Section Added", "success");
  };

  const deleteSection = (id: number) => {
    if (sections.length === 1) {
      showToast("Cannot delete the only section", "error");
      return;
    }
    setSections(sections.filter((section) => section.id !== id));
    showToast("Section Deleted", "error");
  };

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const uploadProject = async (): Promise<void> => {
    if (
      courseTitle !== "" &&
      courseLink !== "" &&
      filteredModuleDataStore.length !== 0 &&
      filteredProjectDataStore.length !== 0
    ) {
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
          setCourseTitle("");
          setCourseLink("");
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          setFilteredModuleData([]);
          setFilteredProjectData([]);
          router.push("/courses");
        }
      } catch (error: any) {
        // console.log(error, "err")
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
        } else if (error?.response?.status === 400) {
          toast.error("Check links and form fields properly!", {
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

    // if (!areFieldsValid) {
    //   toast.error("Check form fields!", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     theme: "dark",
    //   });
    //   return;
    // }

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
  };

  const test = () => {
    console.log("test");
  };

  useEffect(() => {
    if (
      !courseTitle ||
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

  return (
    <div className="pt-5">
      <ToastContainer />
      <h1 className="md:text-3xl text-xl font-semibold">Projects</h1>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className="mb-4 border border-[#DADADA] rounded-lg"
        >
          <div
            className="flex justify-between items-center border-b border-[#DADADA] p-3 cursor-pointer"
            onClick={() => toggleSection(section.id)}
          >
            <h1 className="font-medium">Project {index + 1}</h1>
            {section.isOpen ? (
              <FaChevronUp className="text-gray-500" />
            ) : (
              <FaChevronDown className="text-gray-500" />
            )}
          </div>
          {section.isOpen && (
            <form className="p-3 space-y-3 transition-all duration-300">
              <div>
                <div className="flex flex-end"></div>
                <label className="md:text-base text-sm text-[#3E3E3E]">
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
                <label className="md:text-base text-sm text-[#3E3E3E]">
                  <p className="mt-2">Project Link</p>
                </label>
                <div>
                  <Input
                    type="url"
                    name={`projectLink-${section.id}`}
                    id={`projectLink-${section.id}`}
                    className="bg-[#FAFAFA]"
                    placeholder="Input Project Link"
                  />
                </div>
              </div>
              <div>
                <label className="md:text-base text-sm text-[#3E3E3E]">
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
              {index > 0 && (
                <Button
                  onClick={() => deleteSection(section.id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white w-full flex items-center justify-center gap-2"
                >
                  <FiMinus />
                  <span className="text-sm font-normal">Delete Section</span>
                </Button>
              )}
            </form>
          )}
        </div>
      ))}

      <Button
        onClick={addSection}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-[#F1F1F1] hover:text-white text-black"
      >
        <IoMdAdd />
        <span className="text-sm font-normal">Add a New Project</span>
      </Button>

      <div className="flex mt-5 items-center justify-between gap-4">
        <Button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 flex items-center gap-1 flex-row-reverse text-[#333] hover:bg-gray-300 w-1/2 max-w-[113px]"
        >
          Prev <FaAnglesLeft className="inline" />
        </Button>

        <PublishBtn
          loading={loading}
          onContinue={onContinue}
          upload={uploadProject}
          test={test}
        />
      </div>

      <div className="bg-white overflow-y-scroll w-full max-w-4xl h-[60vh] p-6 rounded-[8px] shadow space-y-4">
        <h1 className="font-semibold text-2xl text-main border-b pb-2">
          Course Details Preview
        </h1>

        <div className="space-y-3">
          <div>
            <h2 className="font-semibold text-main">Course Title</h2>
            <p className="text-[#3E3E3E]">{courseTitle}</p>
          </div>

          <div>
            <h2 className="font-semibold text-main">Course Duration</h2>
            <p className="text-[#3E3E3E]">
              {hours} Hour(s), {minutes} Minute(s), {seconds} Second(s)
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-main">Course Description</h2>
            <div
              className="text-[#3E3E3E] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>

          <div>
            <h2 className="font-semibold text-main">Course Link</h2>
            <a
              href={courseLink}
              className="text-blue-600 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {courseLink}
            </a>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-main">Modules</h2>
          {filteredModuleDataStore.map((module: any, index: number) => (
            <div
              key={index}
              className="border border-[#E0E0E0] rounded-md p-4 space-y-2"
            >
              <div>
                <h3 className="font-semibold text-main">
                  Module {index + 1} Title
                </h3>
                <p className="text-[#3E3E3E]">{module.module_title}</p>
              </div>

              {module.description && (
                <div>
                  <h3 className="font-semibold text-main">Description</h3>
                  <div
                    className="text-[#3E3E3E] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: module.description }}
                  ></div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-main">Module Link</h3>
                <a
                  href={module.module_url}
                  className="text-blue-600 hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {module.module_url}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProjectForms;
