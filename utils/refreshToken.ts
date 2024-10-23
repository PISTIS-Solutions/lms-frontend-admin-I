"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "./config";

const refreshAdminToken = async (): Promise<void> => {
  try {
    const refreshToken = Cookies.get("adminRefreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const refreshResponse = await axios.post(urls.adminRefresh, {
      refresh: refreshToken,
    });

    Cookies.set("adminAccessToken", refreshResponse.data.access, {
      sameSite: "None",
      secure: true,
    });
    Cookies.set("adminRefreshToken", refreshResponse.data.refresh, {
      sameSite: "None",
      secure: true,
    });
  } catch (refreshError: any) {
    console.error("Error refreshing token:", refreshError.message);
    Cookies.remove("adminAccessToken");
    Cookies.remove("adminRefreshToken");
    localStorage.removeItem("admin_role");
    window.location.href = "/";
    throw refreshError;
  }
};

export default refreshAdminToken;
