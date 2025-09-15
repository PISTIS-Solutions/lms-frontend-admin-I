//this is for the first click of project
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { toolbarOptions } from "../toolbar";
import { urls } from "@/utils/config";
// import axios from "axios";
import refreshAdminToken from "@/utils/refreshToken";

import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { createAxiosInstance } from "@/lib/axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditProject = ({
  courseID,
  project,
  setEditModal,
  fetchProjects,
}: any) => {
  const [projectTitle, setProjectitle] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [description, setDescription] = useState("");
  const [editLoading, seteditLoading] = useState(false);
  const axios = createAxiosInstance();
  useEffect(() => {
    if (project?.project_title) {
      setProjectitle(project?.project_title);
    }
    if (project?.project_url) {
      setProjectLink(project?.project_url);
    }
    if (project?.project_hint) {
      setDescription(project?.project_hint);
    }
  }, []);

  //edit functionality
  const editProject = async (e: any) => {
    e.preventDefault();

    if (projectTitle !== "" && projectLink !== "") {
      try {
        const adminAccessToken = Cookies.get("adminAccessToken");
        seteditLoading(true);
        const response = await axios.patch(
          `${urls.getCourses}${courseID}/projects/${project?.id}/`,
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
            setEditModal(false);
          toast.success("Project successfully edited!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          // window.parent.location = window.parent.location.href;
          fetchProjects();
        }
      } catch (error: any) {
       if (error?.message === "Network Error") {
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

  return (
    <div className="rounded-[8px] border-t-4 border-t-primary bg-white p-2 md:p-6 w-[90%]">
      <ToastContainer />
      <div>
        <h1 className="md:text-3xl text-xl font-semibold">Project Details</h1>
      </div>
      <form className="my-4" onSubmit={editProject}>
        <div>
          <div className="flex flex-end"></div>
          <label className="md:text-xl text-sm text-[#3E3E3E]">
            <p className="">Project Title</p>
          </label>
          <div className="">
            <input
              type="text"
              className="bg-[#FAFAFA]  w-full border-none rounded-[8px]"
              placeholder="Input Project Title"
              value={projectTitle}
              onChange={(e) => {
                setProjectitle(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <label className="md:text-xl text-sm text-[#3E3E3E]">
            <p className="mt-2">Project Link</p>
          </label>
          <div>
            <input
              type="url"
              className="bg-[#FAFAFA] w-full border-none rounded-[8px]"
              placeholder="Input Project Link"
              value={projectLink}
              onChange={(e) => {
                setProjectLink(e.target.value);
              }}
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
              className="bg-[#FAFAFA] w-full border-none rounded-[8px]"
              placeholder="Input project hint"
              value={description}
              onChange={setDescription}
            />
          </div>
        </div>
        <div className="flex items-center mt-2 gap-2 justify-center">
          <p
            onClick={() => {
              setEditModal(false);
            }}
            className="cursor-pointer w-full py-4 rounded-[8px] text-center border border-[#3e3e3e] text-sm md:text-lg hover:bg-[#3e3e3e] hover:text-white font-medium"
          >
            Cancel
          </p>
          <button
            disabled={editLoading}
            className="w-full py-4 flex items-center justify-center disabled:bg-sub/25 rounded-[8px] bg-sub"
            type="submit"
          >
            {editLoading ? (
              <Loader className="animate-spin text-center" />
            ) : (
              "Proceed"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
