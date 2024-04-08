"use client";
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";

import { Loader2Icon, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoursesCard from "@/components/side-comp/courses-card";
import TopNav from "@/components/side-comp/topNav";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { dummydata } from "@/app/data/dummyModules";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import useCourseRead from "@/store/course-read";

// interface CoursesData {
//   id: string;
//   title: string;
//   slug: string;
//   overview: any;
//   course_url: string;
//   course_duration: string;
// }
// interface CoursesArray {
//   courses: CoursesData[];
// }

const Courses = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { response } = useCourseRead();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(urls.getCourses, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      setCourses(response.data.results);
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
        window.location.reload();
      } else {
        console.error("Failed to delete course.");
      }
    } catch (error: any) {
      console.error("Error deleting course:", error.message);
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await deleteCourse(courseId);
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
      setModal(false);
      setDeleting(false);
    }
  };

  const handleOpen = (courseId: string) => {
    setSelectedCourse(courseId);
    setModal(true);
  };
  const [cardLoad, setCardLoad] = useState<boolean>(false);
  const handleCardClick = (id: any) => {
    setCardLoad(true);
    if (response === 200) {
      router.push(`/courses/${id}`);
      setCardLoad(false);
    } else {
      toast.error("Check your network!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      setCardLoad(false);
    }
  };

  return (
    <div className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="md:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <ToastContainer />
        <div className="py-2 px-2 md:px-7">
          <div className="flex justify-end">
            <Link href="/courses/add-course">
              <Button className="flex items-center md:text-base text-xs gap-x-2 cursor-pointer text-black hover:text-white bg-sub">
                New Course
                <Plus />
              </Button>
            </Link>
          </div>
          <div className="my-5 grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
            {loading ? (
              <span className="flex text-center justify-center items-center">
                <Loader2Icon className=" animate-spin" />
                Loading...
              </span>
            ) : courses && courses.length > 0 ? (
              courses.map((course: any) => (
                <div key={course.id}>
                  <CoursesCard
                    id={course.id}
                    title={course.title}
                    duration={course.course_duration}
                    handleCardClick={handleCardClick}
                    handleOpen={() => handleOpen(course.id)}
                    cardLoad={cardLoad}
                  />
                </div>
              ))
            ) : (
              <p className="text-center">No courses available.</p>
            )}
          </div>
        </div>
        {modal && (
          <section className="absolute top-0 flex justify-center items-center left-0 bg-slate-100/50 h-screen w-full">
            <div className="bg-white md:py-14 py-3 px-2 md:px-7 h-[200px] rounded-[8px] w-1/2 md:w-[608px]">
              <h1 className="md:text-2xl text-lg font-medium">Delete Course</h1>
              <p className="md:text-xl text-sm text-[#3E3E3E] font-normal">
                Are you sure you want to delete this course? You will not be
                able to retrieve it later
              </p>
              <div className="flex md:gap-x-2 gap-x-1 justify-between my-2 md:my-0 md:justify-end items-center">
                <Button
                  disabled={deleting}
                  onClick={() => deleteCourse(selectedCourse!)}
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
    </div>
  );
};

export default Courses;
