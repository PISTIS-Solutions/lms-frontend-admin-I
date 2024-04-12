"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2, MinusCircle, PlusCircle } from "lucide-react";
import useCourseFormStore from "@/store/course-module-project";
import { useRouter } from "next/navigation";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "./toolbar";

const AddModuleForms = () => {
  const [sections, setSections] = useState([{ id: 1 }]);
  const { setFilteredModuleData, courseTitle, description, courseLink } =
    useCourseFormStore();
  const router = useRouter();

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

  const deleteSection = (id: number) => {
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

  interface ModuleFormData {
    module_title: string;
    module_url: string;
    description: string;
    module_sub_title: string;
  }
  const [loading, setLoading] = useState<boolean>(false);
  const onContinue = () => {
    setLoading(true);
    const filteredModuleData = sections
      .map((section) => {
        const moduleTitleInput = document.getElementById(
          `moduleTitle-${section.id}`
        ) as HTMLInputElement;
        const modulesubTitleInput = document.getElementById(
          `modulesubTitle-${section.id}`
        ) as HTMLInputElement;
        const moduleLinkInput = document.getElementById(
          `moduleLink-${section.id}`
        ) as HTMLInputElement;
        const moduleDetailsInput = document.getElementById(
          `moduleDetails-${section.id}`
        ) as HTMLElement;

        if (
          moduleTitleInput &&
          modulesubTitleInput &&
          moduleLinkInput &&
          moduleDetailsInput
        ) {
          return {
            module_title: moduleTitleInput.value,
            module_sub_title: modulesubTitleInput.value,
            module_url: moduleLinkInput.value,
            description: moduleDetailsInput?.textContent ?? "",
          };
        } else {
          return null;
        }
      })
      .filter((data): data is ModuleFormData => data !== null);
    const areFieldsValid = sections.every((section) => {
      const moduleTitleInput = document.getElementById(
        `moduleTitle-${section.id}`
      ) as HTMLInputElement;
      const modulesubTitleInput = document.getElementById(
        `modulesubTitle-${section.id}`
      ) as HTMLInputElement;
      const moduleLinkInput = document.getElementById(
        `moduleLink-${section.id}`
      ) as HTMLInputElement;
      const moduleDetailsInput = document.getElementById(
        `moduleDetails-${section.id}`
      ) as HTMLElement;

      return (
        moduleTitleInput.value.trim() !== "" &&
        modulesubTitleInput.value.trim() !== "" &&
        moduleLinkInput.value.trim() !== "" &&
        (moduleDetailsInput?.textContent?.trim() ?? "") !== ""
      );
    });

    if (areFieldsValid) {
      setFilteredModuleData(filteredModuleData);
      setLoading(false);
      toast.success("Modules added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      router.push("add-modules/add-project");
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      !courseTitle ||
      !description ||
      !courseLink
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
              Module Details
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
          </div>

          <form className="my-4">
            <div>
              <label className="md:text-xl text-sm text-[#3E3E3E]">
                <p className="">Module Title</p>
              </label>
              <div className="">
                <Input
                  type="text"
                  name={`moduleTitle-${section.id}`}
                  id={`moduleTitle-${section.id}`}
                  className="bg-[#FAFAFA] "
                  placeholder="Input Module Title"
                />
              </div>
            </div>
            <div>
              <label className="md:text-xl text-sm text-[#3E3E3E]">
                <p className="mt-2">Sub-Title</p>
              </label>
              <div>
                <Input
                  type="text"
                  name={`modulesubTitle-${section.id}`}
                  id={`modulesubTitle-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Input Module Sub-Title"
                />
              </div>
            </div>
            <div>
              <label className="md:text-xl text-sm text-[#3E3E3E]">
                <p className="mt-2">Video Link</p>
              </label>
              <div>
                <Input
                  type="url"
                  name={`moduleLink-${section.id}`}
                  id={`moduleLink-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Input Module Description"
                />
              </div>
            </div>
            <div>
              <label className="md:text-xl text-sm text-[#3E3E3E]">
                <p className="mt-2">Content Details</p>
              </label>
              <div>
                <ReactQuill
                  modules={{ toolbar: toolbarOptions }}
                  theme="snow"
                  // name={`moduleDetails-${section.id}`}
                  id={`moduleDetails-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Input module content details"
                  // value={description}
                  // onChange={setDescription}
                />
              </div>
            </div>
          </form>
        </div>
      ))}
      <div className="flex justify-center">
        <Button
          disabled={loading}
          onClick={onContinue}
          className="py-2 text-black mb-5 hover:text-white px-28 bg-sub mx-auto font-semibold"
        >
          {loading ? <Loader2 className="animate-spin" /> : <>Continue</>}
        </Button>
      </div>
    </div>
  );
};

export default AddModuleForms;
