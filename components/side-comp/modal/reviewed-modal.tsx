import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewedModal = ({ handleCloseModalApproved, person }: any) => {
  const [submitDetails, setSubmitDetails] = useState<any | null>(null);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const fetchSubDetails = async () => {
    try {
      setLoadSubmit(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(
        `${urls.uploadCourses}${person?.course}/submissions/${person?.submission_id}`,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setSubmitDetails(response.data);
        setLoadSubmit(false);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await fetchSubDetails();
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
      setLoadSubmit(false);
    }
  };
  useEffect(() => {
    fetchSubDetails();
  }, []);
  return (
    <div className="bg-white p-4 w-full mx-2 md:mx-0 md:w-1/3 h-5/6">
      <div>
        <ToastContainer />
        <div className="flex justify-between items-center">
          <h1 className="md:text-2xl text-lg font-medium">
            {person?.course?.title}
          </h1>
          <span
            onClick={handleCloseModalApproved}
            className="border-2 cursor-pointer border-main p-2 rounded-sm w-[32px] h-[32px] flex justify-center items-center"
          >
            <X className="text-main" />
          </span>
        </div>
        <div className="px-2.5 py-1 my-2 bg-[#E5FAF2] text-[#01A06B] rounded-[16px] w-[110px] text-center">
          <p>Reviewed</p>
        </div>
      </div>
      <div>
        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Submission link
          </h1>
          <p className="text-[#3E3E3E] text-base md:text-lg">
            {" "}
            {!loadSubmit ? submitDetails?.submission_link : "Please wait..."}
          </p>
        </div>

        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Student’s comment
          </h1>
          <p className="text-[#3E3E3E] text-base md:text-lg">
            {!loadSubmit ? submitDetails?.student_comments : "Please wait..."}
          </p>
        </div>
        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Your comment
          </h1>
          <p className="text-[#3E3E3E] text-base md:text-lg">
            {!loadSubmit ? submitDetails?.mentor_comments : "Please wait..."}
          </p>
        </div>
      </div>
      {/* <div className="flex justify-end">
        <Button className="bg-sub hover:text-white text-black">Submit</Button>
      </div> */}
    </div>
  );
};

export default ReviewedModal;
