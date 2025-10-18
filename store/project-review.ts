import { create } from "zustand";
// import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { toast } from "react-toastify";
import { createAxiosInstance } from "@/lib/axios";

interface pendingGrading {
  projectReview: any;
  reviewLoad: boolean;
  fetchProjectReview: (id: string, submissionStatus: string, page:number) => Promise<void>;
}
const axios = createAxiosInstance();
const usePendingGradeStore = create<pendingGrading>((set, get) => ({
  projectReview: [],
  reviewLoad: false,

  fetchProjectReview: async (
    id,
    submissionStatus = "",
    page = 1,
    page_size = 2
  ) => {
    try {
      set({ reviewLoad: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(
        `${urls.projectReview}${id}/?status=${submissionStatus}&page=${page}&page_size=${page_size}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (response.status === 200) {
        set({
          projectReview: response.data.results,
          reviewLoad: false,
        });
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
      set({ reviewLoad: false });
    }
  },
}));

export default usePendingGradeStore;
