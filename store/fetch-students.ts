import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";

interface StudentsStore {
  students: any;
  loading: boolean;
  fetchStudents: (pageNumber: number) => Promise<void>;
}

const useStudentsStore = create<StudentsStore>((set, get) => ({
  students: {},
  loading: false,

  fetchStudents: async (pageNumber: number) => {
    try {
      set({ loading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(urls.getStudents, {
        params: {
          page: pageNumber,
        },
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      set({ students: response.data });
      
    } catch (error: any) {
      console.error("Error fetching courses:", error.message);
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchStudents(pageNumber); 
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
