import { create } from "zustand";
// import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { createAxiosInstance } from "@/lib/axios";

interface State {
  getModuleCount: (id: any) => Promise<number>;
}
const axios = createAxiosInstance();
const useModuleCount = create<State>((set) => ({
  getModuleCount: async (id: any) => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(`${urls.getCourses}${id}/modules/`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      if (response.status === 200) {
        return response.data.length;
      } else {
        return 0;
      }
    } catch (error) {
      return 0;
    }
  },
}));

export default useModuleCount;
