import axios from "axios";
import Cookies from "js-cookie";
import { urls, baseURL } from "@/utils/config";
import { toast } from "react-toastify";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token as string);
  });
  failedQueue = [];
}; 

export const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL,
    headers: Cookies.get("adminAccessToken")
      ? { Authorization: `Bearer ${Cookies.get("adminAccessToken")}` }
      : {},
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                resolve(instance(originalRequest));
              },
              reject,
            });
          });
        }

        isRefreshing = true;

        try {
          const refresh = Cookies.get("adminRefreshToken");

        //   if (!refresh) {
        //     toast.error("Session expired, Login again!", {
        //       position: "top-right",
        //       autoClose: 5000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: false,
        //       draggable: false,
        //       theme: "dark",
        //     });
        //     window.location.href = "/";
        //     return Promise.reject(error);
        //   }
          const refreshRes = await axios.post(
            urls.adminRefresh,
            { refresh },
          );

          const { access } = refreshRes.data;

          Cookies.set("adminAccessToken", access, {
            sameSite: "Lax",
            secure: true,
            path: "/",
          });

          processQueue(null, access);

          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return instance(originalRequest);
        } catch (err) {
          processQueue(err, null);
          toast.error("Session expired. Logging out...!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });

          ["adminAccessToken", "adminRefreshToken"].forEach((key) => Cookies.remove(key));
          window.location.href = "/";
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      switch (status) {
        case 400:
          toast.error("Bad Request, Invalid Input!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          break;
        case 403:
          toast.error("Forbidden: You don’t have permission!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          break;
        case 404:
          toast.error("Not found: Resource doesn’t exist!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          break;
        default:
          if (status >= 500) {
            toast.error("Server error. Please try again later!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              theme: "dark",
            });
          } else {
            toast.error(`${message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              theme: "dark",
            });
          }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
