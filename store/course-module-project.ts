import { create } from "zustand";

interface CourseFormState {
  courseTitle: string;
  description: string;
  courseLink: string;
  selectedFile: File | null;
  hours: number;
  minutes: number;
  seconds: number;
  setCourseTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCourseLink: (link: string) => void;
  setSelectedFile: (file: File | null) => void;
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
  setSeconds: (seconds: number) => void;
}

interface ModuleFormState {
  moduleData: ModuleFormData[];
  addModuleData: (data: ModuleFormData) => void;
}

interface ModuleFormData {
  module_title: string;
  module_url: string;
  overview: string;
  module_sub_title: string;
}

interface ProjectFormState {
  projectData: projectFormData[];
  addProjectData: (data: projectFormData) => void;
}
interface projectFormData {
  project_title: string;
  project_url: string;
  project_description: string;
}

const useCourseFormStore = create<
  CourseFormState & ModuleFormState & ProjectFormState
>((set) => ({
  courseTitle: "",
  description: "",
  courseLink: "",
  selectedFile: null,
  hours: 0,
  minutes: 0,
  seconds: 0,
  moduleData: [],
  addModuleData: (data) =>
    set((state) => ({ moduleData: [...state.moduleData, data] })),
  projectData: [],
  addProjectData: (data) =>
    set((state) => ({ projectData: [...state.projectData, data] })),
  setCourseTitle: (title: string) => set({ courseTitle: title }),
  setDescription: (description: string) => set({ description: description }),
  setCourseLink: (link: string) => set({ courseLink: link }),
  setSelectedFile: (file: File | null) => set({ selectedFile: file }),
  setHours: (hours: number) => set({ hours: hours }),
  setMinutes: (minutes: number) => set({ minutes: minutes }),
  setSeconds: (seconds: number) => set({ seconds: seconds }),
}));

export default useCourseFormStore;
