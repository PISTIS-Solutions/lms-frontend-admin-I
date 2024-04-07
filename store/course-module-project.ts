import {create} from "zustand";

interface ModuleData {
  module_title: string;
  module_sub_title: string;
  description: string;
  module_url: string;
}

interface ProjectData {
  project_title: string;
  project_description: string;
  project_url: string;
}

interface CourseData {
  title: string;
  course_duration: string;
  overview: string;
  course_url: string;
  modules: ModuleData[];
  projects: ProjectData[];
}

interface CourseFormState {
  courseData: CourseData;
  updateCourseData: (data: Partial<CourseData>) => void;
  addModule: (module: ModuleData) => void;
  updateModule: (index: number, module: ModuleData) => void;
  deleteModule: (index: number) => void;
  addProject: (project: ProjectData) => void;
  updateProject: (index: number, project: ProjectData) => void;
  deleteProject: (index: number) => void;
}

const useCourseFormStore = create<CourseFormState>((set) => ({
  courseData: {
    title: "Default Title",
    course_duration: "",
    overview: "",
    course_url: "http://example.com",
    modules: [],
    projects: [],
  },
  updateCourseData: (data) =>
    set((state) => ({ courseData: { ...state.courseData, ...data } })),
  addModule: (module) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        modules: [...state.courseData.modules, module],
      },
    })),
  updateModule: (index, module) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        modules: state.courseData.modules.map((m, i) =>
          i === index ? module : m
        ),
      },
    })),
  deleteModule: (index) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        modules: state.courseData.modules.filter((_, i) => i !== index),
      },
    })),
  addProject: (project) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        projects: [...state.courseData.projects, project],
      },
    })),
  updateProject: (index, project) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        projects: state.courseData.projects.map((p, i) =>
          i === index ? project : p
        ),
      },
    })),
  deleteProject: (index) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        projects: state.courseData.projects.filter((_, i) => i !== index),
      },
    })),
}));

export default useCourseFormStore;
