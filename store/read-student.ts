import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL, urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";

interface readStudent {
  studentData: any;
  loading: boolean;
  response: any;
  fetchStudentInfo: (id: any) => Promise<void>;
}

const useStudentInfoStore = create<readStudent>((set, get) => ({
  studentData: null,
  loading: false,
  response: null,

  fetchStudentInfo: async (id: any) => {
    try {
      set({ loading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(`${baseURL}/students/${id}/details/`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      console.log(response)
      set({ studentData: response.data });
      set({ response: response.status });
      if (response.status === 200) {
        set({ loading: false });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchStudentInfo(id);
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

export default useStudentInfoStore;
