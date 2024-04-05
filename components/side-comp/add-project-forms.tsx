// "use client";
// import React, { useState } from "react";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { Textarea } from "../ui/textarea";
// import Cookies from "js-cookie";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { urls } from "@/utils/config";
// import { Loader2, Plus } from "lucide-react";
// import refreshAdminToken from "@/utils/refreshToken";

// const formSchema = z.object({
//   projectTitle: z.string(),
//   projectLink: z.string(),
//   additionalNote: z.string(),
// });

// const AddProjectForms = () => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       projectTitle: "",
//       projectLink: "",
//       additionalNote: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const [saveModule, setSaveModule] = useState<boolean>(false);

//   const router = useRouter();
//   const uploadProject = async (
//     values: z.infer<typeof formSchema>,
//     e: any
//   ): Promise<void> => {
//     e.preventDefault();
//     try {
//       const adminAccessToken = Cookies.get("adminAccessToken");

//       setLoading(true);
//       const response = await axios.post(
//         urls.uploadProjects,
//         {
//           project_title: values.projectTitle,
//           project_description: values.additionalNote,
//           project_url: values.projectLink,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${adminAccessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.status === 200) {
//         toast.success(response.data.project_title + " added", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: false,
//           theme: "dark",
//         });
//         // Cookies.set("courseId", response.data.id);
//         // router.push("add-modules/add-project");
//         setSaveModule(true);
//       }
//     } catch (error: any) {
//       if (error.response && error.response.status === 401) {
//         await refreshAdminToken();
//         await uploadProject(values, e);
//       } else if (error?.message === "Network Error") {
//         toast.error("Check your network!", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: false,
//           theme: "dark",
//         });
//       } else {
//         toast.error(error?.response?.data?.detail, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: false,
//           theme: "dark",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>

//       <ToastContainer />
//       <div>
//         <h1 className="md:text-3xl text-xl font-semibold">Project Details</h1>
//       </div>
//       <div className="mt-4">
//         <Form {...form}>
//           {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
//           <div className="my-4">
//             <FormField
//               control={form.control}
//               name="projectTitle"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
//                     <p>Project Title</p>
//                   </FormLabel>
//                   <FormControl className="">
//                     <Input
//                       className="bg-[#FAFAFA] placeholder:italic"
//                       placeholder="Input Project Title"
//                       {...field}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="projectLink"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
//                     <p className="mt-2">Project Link</p>
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="url"
//                       className="bg-[#FAFAFA] placeholder:italic"
//                       placeholder="Input Project Sub-Title"
//                       {...field}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="additionalNote"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
//                     <p className="mt-2">Additional Note</p>
//                   </FormLabel>
//                   <FormControl>
//                     <Textarea
//                       className="bg-[#FAFAFA] placeholder:italic"
//                       placeholder="Input project content details"
//                       {...field}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="flex flex-wrap gap-5 justify-center">
//             <Button
//               type="submit"
//               disabled={loading}
//               onClick={form.handleSubmit(uploadProject)}
//               className=" py-6 w-full text-black hover:text-white px-28 bg-sub mx-auto font-semibold"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 <span>
//                   {saveModule ? (
//                     <span className="flex items-center gap-x-2">
//                       Add Project <Plus />{" "}
//                     </span>
//                   ) : (
//                     "Save Project"
//                   )}
//                 </span>
//               )}
//             </Button>
//             {saveModule && (
//               <Button
//                 onClick={() => {
//                   router.push("add-modules/add-project");
//                 }}
//                 className=" py-6 w-full text-black hover:text-white px-28 bg-sub mx-auto font-semibold"
//               >
//                 Publish
//               </Button>
//             )}
//           </div>
//           {/* </form> */}
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AddProjectForms;

"use client";
import React, { useState, MouseEvent } from "react";
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

const AddProjectForms = () => {
  const [sections, setSections] = useState([{ id: 1 }]);
  const {
    addProjectData,
    projectData,
    courseTitle,
    description,
    courseLink,
    selectedFile,
    hours,
    minutes,
    seconds,
    setCourseTitle,
    setDescription,
    setCourseLink,
    setSelectedFile,
    setHours,
    setMinutes,
    setSeconds,
    moduleData,
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

  const onSave = (index: number) => {
    const projectTitleInput = document.getElementById(
      `projectTitle-${index}`
    ) as HTMLInputElement;
    const projectLinkInput = document.getElementById(
      `projectLink-${index}`
    ) as HTMLInputElement;
    const projectDetailsInput = document.getElementById(
      `projectDetails-${index}`
    ) as HTMLInputElement;

    if (projectTitleInput && projectLinkInput && projectDetailsInput) {
      const formDataObject = {
        project_title: projectTitleInput.value,
        project_url: projectLinkInput.value,
        project_description: projectDetailsInput.value,
      };
      addProjectData(formDataObject);

      toast.success("Section Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    } else {
      console.error("Error: Input element not found.");
    }
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const uploadProject = async (
    // values: z.infer<typeof formSchema>,
    e: any
  ): Promise<void> => {
    e.preventDefault();
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
      const response = await axios.post(
        urls.uploadCourses,
        {
          title: courseTitle,
          course_duration: convertToISO8601(hours, minutes, seconds),
          overview: description,
          course_url: courseLink,
          modules: moduleData,
          projects: projectData,
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
        // Cookies.set("courseId", response.data.id);
        // setSaveModule(true);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await uploadProject(e);
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
          <div className="flex justify-center">
            <Button
              onClick={() => onSave(section.id)}
              className="py-2 text-black mb-5 hover:text-white px-28 bg-sub mx-auto font-semibold"
            >
              Save
            </Button>
          </div>
        </div>
      ))}
      <div>
        <Button
          disabled={loading}
          onClick={(e) => uploadProject(e)}
          className="py-6 text-black w-full hover:text-white px-28 bg-sub mx-auto font-semibold"
        >
          {loading ? <Loader2Icon className="animate-spin" /> : <> Publish</>}
        </Button>
      </div>
    </div>
  );
};

export default AddProjectForms;
