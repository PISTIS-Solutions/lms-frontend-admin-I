import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { toast } from "react-toastify";

interface pendingGrading {
  projectReview: any;
  reviewLoad: boolean;
  fetchProjectReview: (id: string, submissionStatus: string) => Promise<void>;
}
const usePendingGradeStore = create<pendingGrading>((set, get) => ({
  projectReview: [],
  reviewLoad: false,
  fetchProjectReview: async (id, submissionStatus = "") => {
    try {
      set({ reviewLoad: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(
        `${urls.projectReview}${id}/?submission_status=${submissionStatus}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (response.status === 200) {
        set({ projectReview: response.data });
        set({ reviewLoad: false });
        // console.log(response.data, "rD")
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchProjectReview(id, submissionStatus);
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
      set({ reviewLoad: false });
    }
  },
}));

export default usePendingGradeStore;
