"use client";
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  Loader2,
  Loader2Icon,
  LucideLoader2,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CoursesCard from "@/components/side-comp/courses-card";
import TopNav from "@/components/side-comp/topNav";

import modGray from "@/public/assets/modGray.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import useModuleCount from "@/store/module-count";
import { IoTrash } from "react-icons/io5";
import { GrTarget } from "react-icons/gr";
import useProjectCount from "@/store/projectCount";
import EditCourse from "@/components/side-comp/modal/edit-course";
import { Skeleton } from "@/components/ui/skeleton";
import organizeIcon from "@/public/assets/svg/organize.svg";
import resetIcon from "@/public/assets/svg/reset.svg";
import saveIcon from "@/public/assets/svg/save.svg";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { defaultOrder } from "@/utils/DefaultCourseOrderFormat";

interface Course {
  id: string;
  title: string;
  slug: string;
  course_category: string;
  course_image: string;
  overview: string;
  course_url: string;
  course_duration: string;
  course_image_url: string;
  module_count: number;
}

interface updatedCourseOrderProps {
  id: string;
  order: number;
}

const Courses = () => {
  const router = useRouter();
  const [allCourses, setAllCourses] = useState<Course[] | null>(null);
  const [displayedCourses, setDisplayedCourses] = useState<Course[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [courseIds, setCourseIds] = useState([]);
  const [isDragDropEnabled, setIsDragDropEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  //fetch course
  const fetchCourses = async () => {
    const adminAccessToken = Cookies.get("adminAccessToken");
    try {
      setLoading(true);
      const response = await axios.get(urls.getCourses, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      if (response.status === 200) {
        setDisplayedCourses(response.data);
        setAllCourses(response.data);
        const ids = response.data.map((course: { id: number }) => course.id);
        setCourseIds(ids);
        // console.log(response.data, "rd")
      }
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

  //delete course
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
        toast.error(`Course deleted successfully.`, {
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
      // console.error("Error deleting course:", error.response.data.detail);
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
      } else if (error.response.data.detail === "Not found.") {
        toast.error("Course already deleted!", {
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

  //modal open
  const [moduleCounts, setModuleCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const [projectCounts, setProjectCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const { getModuleCount } = useModuleCount();
  const { getProjectCount } = useProjectCount();

  const handleOpen = async (courseId: string) => {
    setSelectedCourse(courseId);
    setModal(true);

    const moduleCount = await getModuleCount(courseId);
    const projectCount = await getProjectCount(courseId);

    setModuleCounts((prevCounts) => ({
      ...prevCounts,
      [courseId]: moduleCount,
    }));
    setProjectCounts((prevCounts) => ({
      ...prevCounts,
      [courseId]: projectCount,
    }));
  };

  const openEditModal = (course: any) => {
    setSelectedCourse(course);
    setEditModal(true);
  };
  //open course content
  const handleCardClick = (id: any) => {
    router.push(`/courses/${id}`);
  };
  // console.log(courses, "cl")

  // add drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id === over?.id) {
      return;
    }

    const updateState = (courses: Course[]) => {
      if (courses == null) return null;

      const oldIndex = courses.findIndex((course) => course.id === active.id);
      const newIndex = courses.findIndex((course) => course.id === over?.id);
      const reorderedCourses = arrayMove(courses, oldIndex, newIndex);

      return reorderedCourses;
    };

    setDisplayedCourses((courses) => updateState(courses!));
    setAllCourses((courses) => updateState(courses!));
    console.log(displayedCourses);
  }

  const handleUpdateCourses = async (displayedCourses: Course[]) => {
    setUpdating(true);
    const adminAccessToken = Cookies.get("adminAccessToken");

    const updatedCourseOrder =
      displayedCourses &&
      displayedCourses.map((course, idx) => ({
        id: course.id,
        order: idx + 1,
      }));

    try {
      const response = await axios.post(
        urls.UpdateCourses,
        {
          courses: updatedCourseOrder,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      setUpdating(false);
      setIsDragDropEnabled(false);
      toast.success(response.data.detail, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await handleUpdateCourses(displayedCourses);
      } else if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchQuery(searchValue);

    if (allCourses) {
      if (searchValue === "") {
        setDisplayedCourses(allCourses);
      } else {
        const filteredCourses =
          allCourses &&
          allCourses.filter((course) =>
            course.title.toLowerCase().includes(searchValue)
          );
        setDisplayedCourses(filteredCourses);
      }
    }
  };

  const handleResetCourseOrder = (orderArray: string[]) => {
    if (!allCourses) return;

    const reorderedCourses = orderArray
      .map((title) =>
        allCourses.find((course) =>
          course.title.toLowerCase().includes(title.toLowerCase())
        )
      )
      .filter((course) => course !== undefined) as Course[];

    setAllCourses(reorderedCourses);
    setDisplayedCourses(reorderedCourses);
    handleUpdateCourses(reorderedCourses);
  };

  return (
    <div className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[86px] h-[70px] flex md:justify-between justify-end px-3 items-center w-full md:px-7">
          <h2 className="font-medium text-[32px] text-[#484848] hidden md:inline">
            Courses
          </h2>
          <TopNav />
        </div>
        <ToastContainer />
        <div className="py-2 px-7">
          <div className="flex flex-wrap justify-between gap-[10px] mt-2">
            {!isDragDropEnabled ? (
              <>
                <div className="flex border border-[#9F9F9F] rounded-[6px] p-[10px_12px] items-center gap-x-4 w-full md:w-1/3 h-full">
                  {/* Search input field */}
                  <Search color="#9F9F9F" size={16} />
                  <input
                    type="text"
                    placeholder="Search for a course"
                    className="placeholder:text-[#A2A2A2] text-black text-xs md:text-base focus:outline-none focus:ring-0 focus:border-none border-0 bg-transparent p-0 w-full"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-[10px]">
                  <Button
                    onClick={() => setIsDragDropEnabled(true)}
                    className="flex items-center md:text-base text-xs gap-x-2 cursor-pointer border-sub text-sub border bg-white p-[11px] px-4 hover:bg-sub/80 hover:text-white hover:border-white"
                  >
                    <Image src={organizeIcon} alt="organize icon" />
                    Organize Courses
                  </Button>
                  <Link href="/courses/add-course">
                    <Button className="flex items-center md:text-base text-xs gap-x-2 cursor-pointer hover:text-white bg-sub px-5 py-[13px] hover:bg-sub/60">
                      <Plus size={20} />
                      Create a new course
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Button
                  className="p-[10px_16px] text-[#f00] flex gap-3 bg-transparent border-[#f00] border hover:bg-red-400 hover:border-none hover:text-white"
                  onClick={() => handleResetCourseOrder(defaultOrder)}
                >
                  <Image src={resetIcon} alt="reset icon" />
                  Reset
                </Button>
                <Button
                  className="p-[10px_16px] text-white bg-sub flex gap-3 hover:bg-sub/80 h-full"
                  onClick={() => handleUpdateCourses(displayedCourses!)}
                >
                  {updating ? (
                    <>
                      <LucideLoader2 className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Image src={saveIcon} alt="reset icon" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
          {loading ? (
            <div className="my-5 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2 md:gap-5">
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
            </div>
          ) : displayedCourses && displayedCourses?.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={displayedCourses}
                strategy={rectSortingStrategy}
                disabled={!isDragDropEnabled}
              >
                <div className="my-5 flex flex-wrap justify-center gap-5">
                  {displayedCourses?.map((course: any) => (
                    <>
                      <CoursesCard
                        image={course?.course_image_url}
                        id={course?.id}
                        title={course?.title}
                        duration={course?.course_duration}
                        handleCardClick={handleCardClick}
                        handleOpen={() => handleOpen(course?.id)}
                        openEditModal={() => openEditModal(course)}
                        key={course.id}
                        isDraggable={isDragDropEnabled}
                      />
                    </>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <p className="text-center">No courses available.</p>
          )}
        </div>
        {modal && (
          <section className="absolute top-0 flex justify-center items-center left-0  bg h-screen w-full backdrop-blur-[5px] bg-white/30">
            <div className="bg-white h-[368px] rounded-[8px] w-[90%] md:w-[608px] shadow-lg md:p-6 px-3">
              <div className="bg-[#FF0000] w-[72px] mx-auto h-[72px] p-2 rounded-full flex items-center justify-center shadow-md">
                <IoTrash className=" text-3xl text-white" />
              </div>
              <h1 className="md:text-2xl text-lg font-semibold text-center py-2">
                Are you sure you want to <br /> delete this course?
              </h1>
              <p className="md:text-base text-center text-sm text-[#3E3E3E] font-normal">
                You’ll permanently lose:
              </p>
              <div className="flex items-center gap-3 justify-center py-8">
                <div className="flex items-center gap-x-2">
                  <Image src={modGray} alt="" className="w-[24px] h-[24px]" />
                  <p className="md:text-base text-center flex items-center text-sm text-[#3E3E3E] font-normal">
                    {selectedCourse ? (
                      moduleCounts[selectedCourse] || (
                        <Loader2 className="animate-spin" />
                      )
                    ) : (
                      <Loader2 className="animate-spin" />
                    )}{" "}
                    Module(s)
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <GrTarget className="w-[24px] h-[24px] text-[#3E3E3E]" />
                  <p className="md:text-base text-center flex items-center text-sm text-[#3E3E3E] font-normal">
                    {selectedCourse ? (
                      projectCounts[selectedCourse] || (
                        <Loader2 className="animate-spin" />
                      )
                    ) : (
                      <Loader2 className="animate-spin" />
                    )}{" "}
                    Project(s)
                  </p>
                </div>
              </div>
              <div className="flex md:gap-x-2 gap-x-1 justify-between my-2 md:my-0 md:justify-end items-center">
                <p
                  className="cursor-pointer w-full py-4 rounded-[8px] text-center border border-[#3e3e3e] text-sm md:text-lg hover:bg-[#3e3e3e] hover:text-white font-medium"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </p>
                <button
                  disabled={deleting}
                  onClick={() => deleteCourse(selectedCourse!)}
                  className="bg-[#FF0000] w-full py-4 flex justify-center items-center hover:text-[#ff0000] hover:bg-white hover:border hover:border-[#ff0000] text-white text-sm md:text-lg rounded-[8px] font-medium"
                >
                  {deleting ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <p>Delete Course</p>
                  )}
                </button>
              </div>
            </div>
          </section>
        )}
        {editModal && selectedCourse && (
          <section className="absolute top-0 flex justify-center items-center left-0 bg h-screen w-full backdrop-blur-[5px] bg-white/30">
            <EditCourse
              image={selectedCourse?.course_image_url}
              id={selectedCourse?.id}
              title={selectedCourse?.title}
              duration={selectedCourse?.course_duration}
              url={selectedCourse?.course_url}
              setEditModal={setEditModal}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default Courses;
