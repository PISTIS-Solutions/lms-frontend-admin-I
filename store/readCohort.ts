import { create } from "zustand";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";

interface readStudent {
  cohortData: any;
  loading: boolean;
  // response: any;
  fetchCohortData: (id: any) => Promise<void>;
}

const useReadCohort = create<readStudent>((set, get) => ({
  cohortData: null,
  loading: false,
  fetchCohortData: async (id:string) => {
    try {
      set({ loading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(`${urls.cohorts}${id}/`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      set({ cohortData: response.data });
      console.log(response)
      if (response.status === 200) {
        set({ loading: false });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchCohortData(id);
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

export default useReadCohort;
