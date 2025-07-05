"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2, MinusCircle, PlusCircle } from "lucide-react";
import useCourseFormStore from "@/store/course-module-project";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/showToast";
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

const AddModuleForms = () => {
  const [sections, setSections] = useState([{ id: 1, isOpen: true }]);

  const { setFilteredModuleData, courseTitle, courseLink } =
    useCourseFormStore();
  const router = useRouter();

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

  interface ModuleFormData {
    module_title: string;
    module_url: string;
    module_Github_url: string;
  }
  const [loading, setLoading] = useState<boolean>(false);
  const onContinue = () => {
    setLoading(true);
    const filteredModuleData = sections
      .map((section) => {
        const moduleTitleInput = document.getElementById(
          `moduleTitle-${section.id}`
        ) as HTMLInputElement | null;
        const moduleLinkInput = document.getElementById(
          `moduleLink-${section.id}`
        ) as HTMLInputElement | null;
        const moduleGithubLinkInput = document.getElementById(
          `moduleGithubLink-${section.id}`
        ) as HTMLInputElement | null;
        if (moduleTitleInput && moduleLinkInput && moduleGithubLinkInput) {
          return {
            module_title: moduleTitleInput.value,
            module_url: moduleLinkInput.value,
            module_Github_url: moduleGithubLinkInput.value,
          };
        } else {
          return null;
        }
      })
      .filter((data): data is ModuleFormData => data !== null);

    const areFieldsValid = sections.every((section) => {
      const moduleTitleInput = document.getElementById(
        `moduleTitle-${section.id}`
      ) as HTMLInputElement | null;
      const moduleLinkInput = document.getElementById(
        `moduleLink-${section.id}`
      ) as HTMLInputElement | null;
      const moduleGithubLinkInput = document.getElementById(
        `moduleGithubLink-${section.id}`
      ) as HTMLInputElement | null;

      return (
        moduleTitleInput?.value.trim() !== "" &&
        moduleLinkInput?.value.trim() !== "" &&
        moduleGithubLinkInput?.value.trim() !== ""
      );
    });

    if (areFieldsValid) {
      setFilteredModuleData(filteredModuleData);
      setLoading(false);
      showToast("Modules added!", "success");
      router.push("add-modules/add-project");
    } else {
      showToast("Check form fields!", "error");

      setLoading(false);
    }
  };

  useEffect(() => {
    if (!courseTitle || !courseLink) {
      showToast("Error! Add Course again!", "error")
      setLoading(false);
      router.replace("/courses/add-course");
      return;
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="flex items-center justify-between">
        <h1 className="md:text-3xl text-xl font-semibold">Curriculum</h1>
      </div>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className="mb-4 border border-[#DADADA] rounded-lg"
        >
          <div
            className="flex justify-between items-center border-b border-[#DADADA] p-3 cursor-pointer"
            onClick={() => toggleSection(section.id)}
          >
            <h1 className="font-medium">Module {index + 1}</h1>
            {section.isOpen ? (
              <FaChevronUp className="text-gray-500" />
            ) : (
              <FaChevronDown className="text-gray-500" />
            )}
          </div>

          {section.isOpen && (
            <div className="p-3 space-y-3 transition-all duration-300">
             
              <div>
                <label className="md:text-base text-sm text-[#3E3E3E]">
                  Module Title
                </label>
                <Input
                  type="text"
                  name={`moduleTitle-${section.id}`}
                  id={`moduleTitle-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Enter your module title here"
                />
              </div>

              <div>
                <label className="md:text-base text-sm text-[#3E3E3E]">
                  Sub-title
                </label>
                <Input
                  type="text"
                  name={`moduleSubTitle-${section.id}`}
                  id={`moduleSubTitle-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Enter your module sub-title here"
                />
              </div>

              <div>
                <label className="md:text-base text-sm text-[#3E3E3E]">
                  Video Link
                </label>
                <Input
                  type="url"
                  name={`moduleGithubLink-${section.id}`}
                  id={`moduleGithubLink-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Enter your video link here"
                />
              </div>

              <div>
                <label className="md:text-base text-sm text-[#3E3E3E]">
                  Github Link
                </label>
                <Input
                  type="url"
                  name={`moduleLink-${section.id}`}
                  id={`moduleLink-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Enter your github link here"
                />
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
            </div>
          )}
        </div>
      ))}
      <Button
        onClick={addSection}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-[#F1F1F1] hover:text-white text-black"
      >
        <IoMdAdd />
        <span className="text-sm font-normal">Add a New Module</span>
      </Button>

      <div className="flex mt-5 items-center justify-between gap-4">
        <Button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 flex items-center gap-1 flex-row-reverse text-[#333] hover:bg-gray-300 w-1/2 max-w-[113px]"
        >
          Prev <FaAnglesLeft className="inline" />
        </Button>

        <Button
          disabled={loading}
          onClick={onContinue}
          type="submit"
          className="bg-sub  text-white hover:bg-sub/90 w-full max-w-[113px]"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span className="flex items-center gap-1">
              <FaAnglesRight className="inline" />
              Next
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddModuleForms;
