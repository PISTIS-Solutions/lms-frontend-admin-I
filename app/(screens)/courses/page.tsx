"use client";
import SideNav from "@/components/side-comp/side-nav";
import React, { useEffect, useState } from "react";
import CoursesCard from "@/components/side-comp/courses-card";
import TopNav from "@/components/side-comp/topNav";

import modGray from "@/public/assets/modGray.svg";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { ToastContainer } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";
import useModuleCount from "@/store/module-count";
import useProjectCount from "@/store/projectCount";
import EditCourse from "@/components/side-comp/modal/edit-course";
import { Skeleton } from "@/components/ui/skeleton";
import organizeIcon from "@/public/assets/svg/organize.svg";
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
} from "@dnd-kit/sortable";
import { showToast } from "@/lib/showToast";
import OrganiseComp from "@/components/side-comp/courses/organiseComp";
import DeleteModal from "@/components/side-comp/courses/deleteModal";

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
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchCourses();
      } else if (error?.message === "Network Error") {
        showToast("Check your network!", "error");
      } else {
        showToast(error?.response?.data?.detail, "error");
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
      const response = await axios.delete(`${urls.deleteCourse}/${courseId}/`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      if (response.status === 204) {
        setDeleting(false);
        showToast("Course deleted successfully.", "success");
        fetchCourses();
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await deleteCourse(courseId);
      } else if (error?.message === "Network Error") {
        showToast("Check your network!", "error");
      } else if (error.response.data.detail === "Not found.") {
        showToast("Course already deleted!", "error");
      } else {
        showToast(error?.response?.data?.detail, "error");
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

    setDisplayedCourses((courses) => {
      if (courses == null) return null;

      const oldIndex = courses.findIndex((course) => course.id === active.id);
      const newIndex = courses.findIndex((course) => course.id === over?.id);
      const reorderedCourses = arrayMove(courses, oldIndex, newIndex);

      return reorderedCourses;
    });
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
      setAllCourses(displayedCourses);
      showToast(response.data.detail, "success");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await handleUpdateCourses(displayedCourses);
      } else if (error?.message === "Network Error") {
        showToast("Check your network!", "error");
      } else {
        showToast(error?.response?.data?.detail, "error");
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

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("admin_role");
    setRole(userRole);
  }, []);

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
        <div className="py-2 px-7 ">
          <OrganiseComp
            isDragDropEnabled={isDragDropEnabled}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            role={role}
            setIsDragDropEnabled={setIsDragDropEnabled}
            organizeIcon={organizeIcon}
            saveIcon={saveIcon}
            updating={updating}
            allCourses={allCourses}
            displayedCourses={displayedCourses}
            setDisplayedCourses={setDisplayedCourses}
            handleUpdateCourses={handleUpdateCourses}
          />
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
                        role={role}
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
          <>
            <DeleteModal
              modGray={modGray}
              selectedCourse={selectedCourse}
              moduleCounts={moduleCounts}
              projectCounts={projectCounts}
              deleting={deleting}
              setModal={setModal}
              deleteCourse={deleteCourse}
            />
          </>
        )}
        {editModal && selectedCourse && (
          <section className="absolute z-[99] top-0 flex justify-center items-center left-0 bg h-screen w-full backdrop-blur-[5px] bg-white/30">
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
