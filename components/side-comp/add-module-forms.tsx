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

const AddModuleForms = () => {
  const [sections, setSections] = useState([{ id: 1 }]);
  const { setFilteredModuleData, courseTitle, courseLink } =
    useCourseFormStore();
  const router = useRouter();

  const addSection = () => {
    const newId = sections.length + 1;
    setSections([...sections, { id: newId }]);
    showToast("Section Added", "success");
  };

  const deleteSection = (id: number) => {
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
                <p className="mt-2">Video Link</p>
              </label>
              <div>
                <Input
                  type="url"
                  name={`moduleGithubLink-${section.id}`}
                  id={`moduleGithubLink-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Input Video Link"
                />
              </div>
            </div>
            <div>
              <label className="md:text-xl text-sm text-[#3E3E3E]">
                <p className="mt-2">Github Link</p>
              </label>
              <div>
                <Input
                  type="url"
                  name={`moduleLink-${section.id}`}
                  id={`moduleLink-${section.id}`}
                  className="bg-[#FAFAFA]"
                  placeholder="Input Github Link"
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
