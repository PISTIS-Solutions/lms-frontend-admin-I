import { create } from "zustand";
// import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import { createAxiosInstance } from "@/lib/axios";

interface readStudent {
  studentData: any;
  loading: boolean;
  // response: any;
  fetchStudentData: () => Promise<void>;
}
const axios = createAxiosInstance();
const useStudentStore = create<readStudent>((set, get) => ({
  studentData: null,
  loading: false,
  fetchStudentData: async () => {
    try {
      set({ loading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(urls.updateStudentProfile, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      set({ studentData: response.data });
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
      set({ loading: false });
    }
  },
}));

export default useStudentStore;
