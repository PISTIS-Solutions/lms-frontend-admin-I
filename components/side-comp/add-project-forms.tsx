"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { FaChevronDown, FaChevronUp, FaAnglesLeft } from "react-icons/fa6";
import useCourseFormStore from "@/store/course-module-project";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import PublishBtn from "./publishBtn";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "./toolbar";
import { showToast } from "@/lib/showToast";
import { createAxiosInstance } from "@/lib/axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddProjectForms = () => {
  const [sections, setSections] = useState([{ id: 1, isOpen: true }]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const axios = createAxiosInstance();
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
    price,
    course_category,
    // courseOverwiew,
    filteredModuleDataStore,
    setCourseLink,
    setSelectedFile,
    setHours,
    setMinutes,
    setFilteredModuleData,
    setSeconds,
    setCourseTitle,
    // tutor,
  } = useCourseFormStore();

  useEffect(() => {
    if (!courseTitle || !courseLink || !filteredModuleDataStore.length) {
      showToast("Error! Add Course again!", "error");
      router.replace("/courses/add-course");
    }
  }, []);

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

  const appendIfExists = (
    form: FormData,
    key: string,
    value?: string | Blob
  ) => {
    if (
      value !== undefined &&
      value !== null &&
      value.toString().trim() !== ""
    ) {
      form.append(key, value);
    }
  };

  const uploadProject = async (): Promise<void> => {
    if (
      !courseTitle ||
      !courseLink ||
      !filteredModuleDataStore.length ||
      !filteredProjectDataStore.length ||
      !selectedFile
    ) {
      showToast("Error! Add Course again!", "error");
      router.replace("/courses/add-course");
      return;
    }

    setLoading(true);
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");
      const payload = new FormData();

      payload.append("title", courseTitle);
      payload.append("course_url", courseLink);
      payload.append("course_image", selectedFile);
      payload.append(
        "course_duration",
        `PT${hours * 3600 + minutes * 60 + seconds}S`
      );

      appendIfExists(payload, "price", price?.toString());
      appendIfExists(payload, "course_category", course_category);
      // appendIfExists(payload, "overview", courseOverwiew);
      // appendIfExists(payload, "tutor", tutor);

      filteredModuleDataStore.forEach((module: any, index: number) => {
        appendIfExists(
          payload,
          `modules[${index}]module_title`,
          module.module_title
        );
        appendIfExists(
          payload,
          `modules[${index}]module_url`,
          module.module_url
        );
        appendIfExists(
          payload,
          `modules[${index}]module_video_link`,
          module.module_Github_url
        );
      });

      filteredProjectDataStore.forEach((project: any, index: number) => {
        appendIfExists(
          payload,
          `projects[${index}]project_title`,
          project.project_title
        );
        appendIfExists(
          payload,
          `projects[${index}]project_url`,
          project.project_url
        );

        appendIfExists(
          payload,
          `projects[${index}]project_hint`,
          project.project_description
        );
      });

      const response = await axios.post(urls.uploadCourses, payload, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        showToast(`${response.data.title} added`, "success");
        resetForm();
        router.push("/courses");
      }
    } catch (error: any) {
      handleUploadError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadError = async (error: any) => {
    if (error?.message === "Network Error") {
      showToast("Check your network!", "error");
    } else if (error?.response?.status === 400) {
      showToast(
        error?.response?.data || "Check links and form fields properly!",
        "error"
      );
    } else {
      showToast(
        error?.response?.data?.detail || "Upload failed",
        error.response.data.message
      );
    }
  };

  const resetForm = () => {
    setCourseTitle("");
    setCourseLink("");
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setFilteredModuleData([]);
    setFilteredProjectData([]);
  };

  const onContinue = (e: React.FormEvent) => {
    e.preventDefault();

    const validProjects = sections
      .map((section) => {
        const title =
          (
            document.getElementById(
              `projectTitle-${section.id}`
            ) as HTMLInputElement
          )?.value || "";
        const url =
          (
            document.getElementById(
              `projectLink-${section.id}`
            ) as HTMLInputElement
          )?.value || "";
        const desc =
          (
            document.getElementById(
              `projectDetails-${section.id}`
            ) as HTMLElement
          )?.textContent?.trim() || "";

        return {
          project_title: title,
          project_url: url,
          project_description: desc,
        };
      })
      .filter((p) => p.project_title.trim() && p.project_url.trim());

    setFilteredProjectData(validProjects);
  };

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
            onClick={() => toggleSection(section.id)}
            className="flex justify-between items-center border-b p-3 cursor-pointer"
          >
            <h1 className="font-medium">Project {index + 1}</h1>
            {section.isOpen ? (
              <FaChevronUp className="text-gray-500" />
            ) : (
              <FaChevronDown className="text-gray-500" />
            )}
          </div>
          {section.isOpen && (
            <form className="p-3 space-y-3">
              <div>
                <label className="md:text-base text-sm text-[#3E3E3E]">
                  Project Title
                </label>
                <Input
                  id={`projectTitle-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Input Project Title"
                />
              </div>
              <div>
                <label className="md:text-base text-sm text-[#3E3E3E]">
                  Project Link
                </label>
                <Input
                  id={`projectLink-${section.id}`}
                  type="url"
                  className="bg-[#FAFAFA]"
                  placeholder="Input Project Link"
                />
              </div>
              <div>
                <label className="md:text-base text-sm text-[#3E3E3E]">
                  Additional Note
                </label>
                <ReactQuill
                  modules={{ toolbar: toolbarOptions }}
                  theme="snow"
                  id={`projectDetails-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Input project content details"
                />
              </div>
              {index > 0 && (
                <Button
                  onClick={() => deleteSection(section.id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white w-full flex items-center justify-center gap-2"
                >
                  <FiMinus />{" "}
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
        <IoMdAdd />{" "}
        <span className="text-sm font-normal">Add a New Project</span>
      </Button>

      <div className="flex mt-5 items-center justify-between gap-4">
        <Button
          onClick={() => router.back()}
          className="bg-gray-200 flex items-center gap-1 text-[#333] hover:bg-gray-300 w-1/2 max-w-[113px]"
        >
          Prev <FaAnglesLeft />
        </Button>
        <PublishBtn
          loading={loading}
          onContinue={onContinue}
          upload={uploadProject}
          test={() => console.log("test")}
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
            <p className="text-blue-600 hover:underline break-all">
              {courseOverwiew}
            </p>
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
                  />
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
