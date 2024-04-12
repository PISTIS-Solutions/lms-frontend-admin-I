"use client";
import React, { useState, MouseEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2Icon, MinusCircle, PlusCircle } from "lucide-react";
import useCourseFormStore from "@/store/course-module-project";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import PublishBtn from "./publishBtn";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "./toolbar";

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

  interface projectFormData {
    project_title: string;
    project_url: string;
    project_description: string;
  }

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const uploadProject = async (): Promise<void> => {
    // e.preventDefault();

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
        !description ||
        !courseLink ||
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
      const response = await axios.post(
        urls.uploadCourses,
        {
          title: courseTitle,
          course_duration: convertToISO8601(hours, minutes, seconds),
          overview: description,
          course_url: courseLink,
          modules: filteredModuleDataStore,
          projects: filteredProjectDataStore,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
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
      !description ||
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
    </div>
  );
};

export default AddProjectForms;
