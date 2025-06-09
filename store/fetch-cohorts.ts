import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL, urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";

interface cohorts {
  id: string;
  tag: string;
  start_date: string;
  end: string;
  description: number;
  status: string;
  registration_status: string;
}

interface CohortStore {
  cohorts: cohorts[];
  loading: boolean;
  count: number;
  next: null | string;
  previous: null | string;
  fetchCohorts: (
    page: number,
    searchQuery?: string,
    // selectedValue?: string,
    // ordering?: string,
    // isActive?: string
  ) => Promise<any>;
}

const useCohortStore = create<CohortStore>((set, get) => ({
  cohorts: [],
  count: 0,
  loading: false,
  next: null,
  previous: null,

  fetchCohorts: async (
    page,
    searchQuery = ""
    // selectedValue = "",
    // ordering = "",
    // isActive = ""
  ) => {
    try {
      set({ loading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");

      const trimmedQuery = searchQuery.trim();

      const response = await axios.get(`${urls.cohorts}?page=${page}&search=${trimmedQuery}&page_size=10`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      console.log(response)
      set({
        cohorts: response.data.results,
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
      return response.data.results;
    } catch (error: any) {
      console.error("Error fetching cohorts:", error.message);
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchCohorts(page, searchQuery);
      } else if (error?.message === "Network Error") {
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
        toast.error(error?.response?.data?.detail, {
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

export default useCohortStore;
