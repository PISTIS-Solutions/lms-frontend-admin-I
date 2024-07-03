// // import { create } from "zustand";
// // import axios from "axios";
// // import Cookies from "js-cookie";
// // import { urls } from "@/utils/config";
// // import { toast } from "react-toastify";
// // import refreshAdminToken from "@/utils/refreshToken";

// // interface StudentsStore {
// //   students: any;
// //   loading: boolean;
// //   fetchStudents: () => Promise<void>;
// // }

// // const useStudentsStore = create<StudentsStore>((set, get) => ({
// //   students: {},
// //   loading: false,

// //   fetchStudents: async () => {
// //     try {
// //       set({ loading: true });
// //       const adminAccessToken = Cookies.get("adminAccessToken");
// //       const response = await axios.get(urls.getStudents, {
// //         params: {
// //           page: 1,
// //         },
// //         headers: {
// //           Authorization: `Bearer ${adminAccessToken}`,
// //         },
// //       });
// //       set({ students: response.data });
// //     } catch (error: any) {
// //       console.error("Error fetching courses:", error.message);
// //       if (error.response && error.response.status === 401) {
// //         await refreshAdminToken();
// //         await get().fetchStudents();
// //       } else if (error?.message === "Network Error") {
// //         toast.error("Check your network!", {
// //           position: "top-right",
// //           autoClose: 5000,
// //           hideProgressBar: true,
// //           closeOnClick: true,
// //           pauseOnHover: false,
// //           draggable: false,
// //           theme: "dark",
// //         });
// //       } else {
// //         toast.error(error?.response?.data?.detail, {
// //           position: "top-right",
// //           autoClose: 5000,
// //           hideProgressBar: true,
// //           closeOnClick: true,
// //           pauseOnHover: false,
// //           draggable: false,
// //           theme: "dark",
// //         });
// //       }
// //     } finally {
// //       set({ loading: false });
// //     }
// //   },
// // }));

// // export default useStudentsStore;

// import { create } from "zustand";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { urls } from "@/utils/config";
// import { toast } from "react-toastify";
// import refreshAdminToken from "@/utils/refreshToken";

// interface StudentsStore {
//   students: any;
//   loading: boolean;
//   count: number
//   fetchStudents: (page: number) => Promise<void>;
// }

// const useStudentsStore = create<StudentsStore>((set, get) => ({
//   students: [],
//   count: 0,
//   loading: false,

//   fetchStudents: async (page) => {
//     try {
//       set({ loading: true });
//       const adminAccessToken = Cookies.get("adminAccessToken");
//       const response = await axios.get(
//         `https://s3tq3grix3.us-east-1.awsapprunner.com/api/v1/auth/users/student/?page=${page}`,
//         {
//           headers: {
//             Authorization: `Bearer ${adminAccessToken}`,
//           },
//         }
//       );
//       set({
//         students: response.data.results,
//         count: response.data.count
//       });
//       console.log(response.data, "rd")
//     } catch (error: any) {
//       console.error("Error fetching students:", error.message);
//       if (error.response && error.response.status === 401) {
//         await refreshAdminToken();
//         await get().fetchStudents(page);
//       } else if (error?.message === "Network Error") {
//         toast.error("Check your network!", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: false,
//           theme: "dark",
//         });
//       } else {
//         toast.error(error?.response?.data?.detail, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: false,
//           theme: "dark",
//         });
//       }
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default useStudentsStore;

import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/config";
import { toast } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";

interface StudentsStore {
  students: any;
  loading: boolean;
  count: number;
  fetchStudents: (page: number) => Promise<any>;
}

const useStudentsStore = create<StudentsStore>((set, get) => ({
  students: [],
  count: 0,
  loading: false,

  fetchStudents: async (page) => {
    try {
      set({ loading: true });
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(
        `https://s3tq3grix3.us-east-1.awsapprunner.com/api/v1/auth/users/student/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (page === 1) {
        set({
          students: response.data.results,
          count: response.data.count,
        });
      }
      return response.data.results;
    } catch (error: any) {
      console.error("Error fetching students:", error.message);
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await get().fetchStudents(page);
      } else if (error?.message === "Network Error") {
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
      set({ loading: false });
    }
  },
}));

export default useStudentsStore;
