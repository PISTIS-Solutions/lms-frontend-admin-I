import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL, urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";

interface StudentsStore {
  students: any[];
  loading: boolean;
  count: number;
  fetchStudents: (
    page: number,
    searchQuery?: string,
    selectedValue?: string,
    ordering?: string
  ) => Promise<any>;
}

const useStudentsStore = create<StudentsStore>((set, get) => ({
  students: [],
  count: 0,
  loading: false,

  fetchStudents: async (
    page,
    searchQuery = "",
    selectedValue = "",
    ordering = ""
  ) => {
    try {
      set({ loading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");

      const trimmedQuery = searchQuery.trim();

      const response = await axios.get(
        `${baseURL}/users/student/?page=${page}&search=${trimmedQuery}&status=${selectedValue}&ordering=${ordering}date_joined`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      set({
        students: response.data,
        count: response.data.count,
      });
      return response.data.results;
    } catch (error: any) {
      console.error("Error fetching students:", error.message);
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchStudents(page, searchQuery, selectedValue, ordering);
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

export default useStudentsStore;
