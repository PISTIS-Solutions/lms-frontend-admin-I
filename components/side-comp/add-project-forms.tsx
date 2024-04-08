"use client";
import React, { useState, MouseEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { urls } from "@/utils/config";
import { Loader2, Plus } from "lucide-react";
import refreshAdminToken from "@/utils/refreshToken";

const formSchema = z.object({
  projectTitle: z.string(),
  projectLink: z.string(),
  additionalNote: z.string(),
});

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
  const onContinue = async (e: any) => {
    e.preventDefault();

    const filteredProjectData = sections
      .map((section) => {
        const projectTitleInput = document.getElementById(
          `projectTitle-${section.id}`
        ) as HTMLInputElement;
        const projectLinkInput = document.getElementById(
          `projectLink-${section.id}`
        ) as HTMLInputElement;
        const projectDetailsInput = document.getElementById(
          `projectDetails-${section.id}`
        ) as HTMLInputElement;

        if (projectTitleInput && projectLinkInput && projectDetailsInput) {
          return {
            project_title: projectTitleInput.value,
            project_url: projectLinkInput.value,
            project_description: projectDetailsInput.value,
          };
        } else {
          return null;
        }
      })
      .filter((data): data is projectFormData => data !== null);

    const areFieldsValid = sections.every((section) => {
      const projectTitleInput = document.getElementById(
        `projectTitle-${section.id}`
      ) as HTMLInputElement;
      const projectLinkInput = document.getElementById(
        `projectLink-${section.id}`
      ) as HTMLInputElement;
      const projectDetailsInput = document.getElementById(
        `projectDetails-${section.id}`
      ) as HTMLInputElement;

      return (
        projectTitleInput.value.trim() !== "" &&
        projectLinkInput.value.trim() !== "" &&
        projectDetailsInput.value.trim() !== ""
      );
    });

    if (areFieldsValid) {
      setFilteredProjectData(filteredProjectData);
      await uploadProject(e);
    } else {
      toast.error("Check form fields!", {
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

  const uploadProject = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");

      setLoading(true);

      // Check if any required field is missing
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
        router.replace("/courses/add-course")
        return; 
      }

      const response = await axios.post(
        urls.uploadProjects,
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
      if (response.status === 200) {
        toast.success(response.data.project_title + " added", {
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
        await uploadProject(values, e);
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

  return (
    <div>
    
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
                  placeholder="Input Module Sub-Title"
                />
              </div>
            </div>
            <div>
              <label className="md:text-xl text-sm text-[#3E3E3E]">
                <p className="mt-2">Additional Note</p>
              </label>
              <div>
                <Textarea
                  name={`projectDetails-${section.id}`}
                  id={`projectDetails-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Input Module Description"
                />
              </div>
            </div>
          </form>
        </div>
      ))}
      <div>
        <Button
          disabled={loading}
          onClick={(e) => {
            onContinue(e);
          }}
          className="py-6 text-black w-full hover:text-white px-28 bg-sub mx-auto font-semibold"
        >
          {loading ? <Loader2Icon className="animate-spin" /> : <> Publish</>}
        </Button>
      </div>
    </div>
  );
};

export default AddProjectForms;
