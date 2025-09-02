import { create } from "zustand";
// import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";
import { createAxiosInstance } from "@/lib/axios";

interface readStudent {
  moduleData: any;
  moduleLoading: boolean;
  response: any;
  fetchModuleRead: (id: string, moduleID: string) => Promise<void>;
}
const axios = createAxiosInstance();
const useModuleRead = create<readStudent>((set, get) => ({
  moduleData: null,
  moduleLoading: false,
  response: null,

  fetchModuleRead: async (id: string, moduleID: string) => {
    try {
      set({ moduleLoading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      // const courseID = localStorage.getItem("courseID");
      const response = await axios.get(
        `${urls.uploadCourses}${id}/modules/${moduleID}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      set({ moduleData: response.data });
      if (response.status === 200) {
        set({ moduleLoading: false });
        // console.log(response.data, "rd");
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
      set({ moduleLoading: false });
    }
  },
}));

export default useModuleRead;
