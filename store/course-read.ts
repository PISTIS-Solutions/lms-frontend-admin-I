import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";

interface readStudent {
  courseRead: any;
  loading: boolean;
  fetchCourseRead: (id: any) => Promise<void>;
}

const useCourseRead = create<readStudent>((set, get) => ({
  courseRead: null,
  loading: false,

  fetchCourseRead: async (id: any) => {
    try {
      set({ loading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(`${urls.uploadCourses}${id}`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      set({ courseRead: response.data });
      console.log(response);
      if (response.status === 200) {
        // router.push(`/students/student`)
        set({ loading: false });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchCourseRead(id);
      } else if (error.message === "Network Error") {
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
      set({ loading: false });
    }
  },
}));

export default useCourseRead;
