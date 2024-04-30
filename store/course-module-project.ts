import {create} from "zustand";

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

interface ModuleFormData {
  module_sub_title: string;
  module_title: string;
  module_url: string;
  description: string;
}
interface ModuleFormState {
  filteredModuleDataStore: ModuleFormData[];
  setFilteredModuleData: (data: ModuleFormData[]) => void;
}

interface ProjectFormState {
  filteredProjectDataStore: projectFormData[];
  setFilteredProjectData: (data: projectFormData[]) => void;
}
interface projectFormData {
  project_title: string;
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
  filteredModuleDataStore: [],
  setFilteredModuleData: (data) => set({ filteredModuleDataStore: data }),
  filteredProjectDataStore: [],
  setFilteredProjectData: (data) => set({ filteredProjectDataStore: data }),
  setCourseTitle: (title: string) => set({ courseTitle: title }),
  setDescription: (description: string) => set({ description: description }),
  setCourseLink: (link: string) => set({ courseLink: link }),
  setSelectedFile: (file: File | null) => set({ selectedFile: file }),
  setHours: (hours: number) => set({ hours: hours }),
  setMinutes: (minutes: number) => set({ minutes: minutes }),
  setSeconds: (seconds: number) => set({ seconds: seconds }),
}));

export default useCourseFormStore;
