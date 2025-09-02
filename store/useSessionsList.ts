import { create } from "zustand";
// import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";
import { createAxiosInstance } from "@/lib/axios";

interface Session {
  id: string;
  topic: string;
  preferred_date: string;
  alternative_date: string;
  duration: number;
  note: string;
  status: string;
}

interface SessionsStore {
  sessions: Session[];
  count: number;
  next: string | null;
  previous: string | null;
  loading: boolean;
  fetchSessions: (page?: number) => Promise<void>;
}
const axios = createAxiosInstance();
const useSessionsList = create<SessionsStore>((set, get) => ({
  sessions: [],
  count: 0,
  next: null,
  previous: null,
  loading: false,

  fetchSessions: async (page = 1) => {
    try {
      set({ loading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");

      const response = await axios.get(`${urls.booking}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      const data = response.data;
      set({
        sessions: data.results,
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } catch (error: any) {
      console.error("Error fetching sessions:", error.message);

     if (error.message === "Network Error") {
        toast.error("Check your network!", { theme: "dark" });
      } else {
        toast.error(error.response?.data?.detail || "Error fetching sessions", {
          theme: "dark",
        });
      }
    } finally {
      set({ loading: false });
    }
  },
}));

export default useSessionsList;
