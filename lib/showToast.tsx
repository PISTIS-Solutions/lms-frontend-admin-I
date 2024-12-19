import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message: string, type: "error" | "success") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
  });
};
