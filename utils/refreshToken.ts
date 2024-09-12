import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "./config";

const refreshAdminToken = async (): Promise<void> => {
  try {
    const adminTokens = {
      refresh: Cookies.get("adminRefreshToken"),
      access: Cookies.get("adminAccessToken"),
    };
    const refreshResponse = await axios.post(urls.adminRefresh, adminTokens);
    Cookies.set("adminAccessToken", refreshResponse.data.access, {
      sameSite: "None",
      secure: true,
    });
  } catch (refreshError: any) {
    console.error("Error refreshing token:", refreshError.message);
    Cookies.remove("adminAccessToken");
    window.location.href = "/";
    throw refreshError;
  }
};

export default refreshAdminToken;
