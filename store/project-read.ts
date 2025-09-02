import { create } from "zustand";
// import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";
import { createAxiosInstance } from "@/lib/axios";

interface readStudent {
  projectData: any;
  projectLoading: boolean;
  response: any;
  fetchProjectRead: (id: string, moduleID: string) => Promise<void>;
}
const axios = createAxiosInstance();
const useProjectRead = create<readStudent>((set, get) => ({
  projectData: null,
  projectLoading: false,
  response: null,

  fetchProjectRead: async (id: string, projectID: string) => {
    try {
      set({ projectLoading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      // const courseID = localStorage.getItem("courseID");
      const response = await axios.get(
        `${urls.uploadCourses}${id}/projects/${projectID}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      set({ projectData: response.data });
      if (response.status === 200) {
        set({ projectLoading: false });
      }
    } catch (error: any) {
     if (error.message === "Network Error") {
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
        toast.error(error.response?.data?.detail, {
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
      set({ projectLoading: false });
    }
  },
}));

export default useProjectRead;
