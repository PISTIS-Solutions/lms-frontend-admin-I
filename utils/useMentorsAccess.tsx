import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";
import { baseURL, urls } from "@/utils/config";
import { createAxiosInstance } from "@/lib/axios";

const axios = createAxiosInstance();
export const mentorAccess = async (
  requestBody: any,
  callback: () => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,

) => {
  try {
    setLoading(true);
    const adminAccessToken = Cookies.get("adminAccessToken");
    const response = await axios.post(`${urls.manageRole}`,
       requestBody, 
       {
      headers: {
        Authorization: `Bearer ${adminAccessToken}`,
      },
    });

    if (response.status === 200) {
      setLoading(false);
      callback();
    }
  } catch (error: any) {
   if (error.message === "Network Error") {
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
    setLoading(false);
  }
};
