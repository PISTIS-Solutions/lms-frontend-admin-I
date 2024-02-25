// adminRefreshToken.ts

import axios from "axios";
import { urls } from "./config";

export const adminRefreshToken = async (): Promise<string | null> => {
  try {
    const refresh_token = localStorage.getItem("adminRefreshToken");

    if (!refresh_token) {
      // Handle the case where refresh token is not available
      // return null;
      console.log("no refresh token!");
    }

    const refreshResponse: any = await axios.post(urls.adminRefreshToken, {
      refresh_token,
    });

    const newadminAccessToken = refreshResponse.data.access_token;

    // Update the existing access token in localStorage
    localStorage.setItem("adminAccessToken", newadminAccessToken);

    return newadminAccessToken;
  } catch (error: any) {
    console.error("Error refreshing token:", error.message);
    return null;
  }
};
