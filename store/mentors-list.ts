import { create } from "zustand";
// import axios from "axios";
import Cookies from "js-cookie";
import { baseURL, urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";
import { createAxiosInstance } from "@/lib/axios";

interface mentors {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  is_staff: boolean;
}

interface MentorsStore {
  mentors: mentors[];
  loadMentors: boolean;
  count: number;
  next: null | string;
  previous: null | string;
  fetchMentors: (page: number, searchQuery?: string, role?:string) => Promise<any>;
}
const axios = createAxiosInstance();
const useMentorsList = create<MentorsStore>((set, get) => ({
  mentors: [],
  count: 0,
  loadMentors: false,
  next: null,
  previous: null,

  fetchMentors: async (page, searchQuery = "", role = "") => {
    try {
      set({ loadMentors: true });
      const adminAccessToken = Cookies.get("adminAccessToken");

      const trimmedQuery = searchQuery.trim();

      const response = await axios.get(
        `${urls.mentorList}?page=${page}&search=${trimmedQuery}&role=${role}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      set({
        mentors: response.data.results,
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
      return response.data.results;
    } catch (error: any) {
     if (error?.message === "Network Error") {
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
      set({ loadMentors: false });
    }
  },
}));

export default useMentorsList;
