import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL, urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";

interface student {
  id: string;
  email: string;
  // full_name: string;
  first_name: string;
  last_name: string;
  courses_completed: [];
  status: string;
  subscription: string | any;
  phone_number: string;
  location: string;
  is_student: boolean;
  has_complete_onboarding: boolean;
  is_active: boolean;
  profile_photo: string;
  date_joined: string;
  last_login: string;
  time_left: {
    time_left: string;
    expiration_date: string;
  };
  user_id: string;
}

interface StudentsStore {
  students: student[];
  loading: boolean;
  count: number;
  next: null | string;
  previous: null | string;
  fetchStudents: (
    page: number,
    searchQuery?: string,
    selectedValue?: string,
    // ordering?: string,
    // isActive?: string,
    category?: string,
    is_challenge_user?: boolean
  ) => Promise<any>;
}

const useStudentsStore = create<StudentsStore>((set, get) => ({
  students: [],
  loading: false,
  count: 0,
  next: null,
  previous: null,

  fetchStudents: async (
    page,
    searchQuery = "",
    selectedValue = "",
    // ordering = "",
    // isActive = "",,
    category = "",
    is_challenge_user = false
  ) => {
    try {
      set({ loading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");

      const trimmedQuery = searchQuery.trim();

      const response = await axios.get(
        `${baseURL}/students/students/?page=${page}&search=${trimmedQuery}&payment_status=${selectedValue}&page_size=10&category=${category}&is_challenge_user=${is_challenge_user}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      // console.log(response, "students");
      set({
        students: response.data.results,
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
      return response.data.results;
    } catch (error: any) {
      console.error("Error fetching students:", error.message);
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchStudents(page, searchQuery, selectedValue, category);
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
