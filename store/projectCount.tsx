// useProjectCount.ts
import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";

interface State {
  getProjectCount: (id: any) => Promise<number>;
}

const useProjectCount = create<State>(() => ({
  getProjectCount: async (id: any) => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(`${urls.getCourses}${id}/projects/`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      if (response.status === 200) {
        return response.data.length;
      } else {
        console.error(`Error fetching modules for course ${id}`);
        return 0;
      }
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      return 0;
    }
  },
}));

export default useProjectCount;
