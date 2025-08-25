"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CoursesCard from "@/components/side-comp/courses-card";
import ProjectCard from "@/components/side-comp/project-card";
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, Loader2Icon, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
// import { dummydata } from "@/app/data/dummyModules";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "@/components/side-comp/topNav";
import AddProjectModal from "@/components/side-comp/modal/add-project-modal";
import refreshAdminToken from "@/utils/refreshToken";
import { Skeleton } from "@/components/ui/skeleton";

const Project = () => {
  const router = useRouter();
  const [projectModal, setProjectModal] = useState(false);
  const handleProjectModal = () => {
    setProjectModal((prev) => !prev);
  };
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [projects, setCourses] = useState<any | null>(null);
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(urls.getCourses, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      setCourses(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchCourses();
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
  useEffect(() => {
    fetchCourses();
  }, []);

  const [deleting, setDeleting] = useState(false);

  const deleteCourse = async (courseId: string) => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");

      setDeleting(true);
      const response = await axios.delete(`${urls.deleteCourse}/${courseId}`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      if (response.status === 204) {
        setDeleting(false);
        toast.error(`Course with ID ${courseId} deleted successfully.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        // window.location.reload();
        fetchCourses();
      } else {
        // console.error("Failed to delete course.");
      }
    } catch (error: any) {
      // console.error("Error deleting course:", error.message);
      if (error.response && error.response.status === 401) {
        try {
          const adminRefreshToken = Cookies.get("adminRefreshToken");
          const adminAccessToken = Cookies.get("adminAccessToken");

          const refreshResponse = await axios.post(urls.adminRefresh, {
            refresh: adminRefreshToken,
            access: adminAccessToken,
          });

          Cookies.set("adminAccessToken", refreshResponse.data.access, {
            sameSite: "None",
            secure: true,
          });

          await deleteCourse(courseId);
        } catch (refreshError: any) {
          console.error("Error refreshing token:", refreshError.message);
        }
      }
    } finally {
      setModal(false);
      setDeleting(false);
    }
  };

  const handleOpen = (courseId: string) => {
    setSelectedProject(courseId);
    setModal(true);
  };
  const handleCardClick = (id: any) => {
    router.push(`/project/${id}`);
  };

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("admin_role");
    setRole(userRole);
  }, []);

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="py-2 px-2 md:px-7">
          <div className="flex justify-end">
            {/* <Link href="/courses/add-course"> */}
            {(role === "advanced" || role === "super_admin") && (
              <Button
                onClick={handleProjectModal}
                className="flex items-center md:text-base text-xs gap-x-2 cursor-pointer text-black hover:text-white bg-sub"
              >
                New Project
                <Plus />
              </Button>
            )}
            {/* </Link> */}
          </div>
          <div className="my-5 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2 md:gap-5">
            {loading ? (
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col space-y-3 shadow-md p-4 w-full">
                  <Skeleton className="h-[125px]  rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <p className="text-xl text-main font-bold my-4">Loading...</p>
              </div>
            ) : projects && projects.length > 0 ? (
              projects.map((project: any) => (
                <div key={project.id}>
                  <ProjectCard
                    id={project.id}
                    handleCardClick={handleCardClick}
                    handleOpen={() => handleOpen(project.id)}
                    img={project.course_image}
                    title={project.title}
                    paragraph={project.paragraph}
                    module={project.module}
                    duration={project.duration}
                    project={project.project}
                    category={project?.course_category}
                  />
                </div>
              ))
            ) : (
              <p className="text-center">No projects available.</p>
            )}
          </div>
        </div>
        {modal && (
          <section className="absolute top-0 flex justify-center items-center left-0 bg-slate-100/50 h-screen w-full">
            <div className="bg-white md:py-14 py-3 px-2 md:px-7 h-[200px] rounded-[8px] w-[90%] md:w-[608px]">
              <h1 className="md:text-2xl text-lg font-medium">Delete Course</h1>
              <p className="md:text-xl text-sm text-[#3E3E3E] font-normal">
                Are you sure you want to delete this course? You will not be
                able to retrieve it later
              </p>
              <div className="md:flex block md:gap-x-2 gap-x-1 justify-between my-2 md:my-0 md:justify-end items-center">
                <Button
                  disabled={deleting}
                  onClick={() => deleteCourse(selectedProject!)}
                  className="bg-red-500 text-white text-sm md:text-lg rounded-[8px]"
                >
                  {deleting ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <p>Delete</p>
                  )}
                </Button>
                <p
                  className="cursor-pointer text-sm md:text-lg"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
      <div>
        {projectModal && (
          <AddProjectModal
            courses={projects}
            fetchCourses={fetchCourses}
            handleProjectModal={handleProjectModal}
          />
        )}
      </div>
    </main>
  );
};

export default Project;
