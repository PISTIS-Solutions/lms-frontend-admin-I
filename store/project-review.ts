import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { toast } from "react-toastify";

interface pendingGrading {
  projectReview: any;
  reviewLoad: boolean;
  fetchProjectReview: (id:any) => Promise<void>;
}
const usePendingGradeStore = create<pendingGrading>((set, get) => ({
  projectReview: [],
  reviewLoad: false,
  fetchProjectReview: async (id) => {
    try {
      set({ reviewLoad: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(`${urls.projectReview}${id}/`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      if (response.status === 200) {
        set({ projectReview: response.data });
        set({ reviewLoad: false });
        console.log(response.data, "rD")
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchProjectReview;
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
