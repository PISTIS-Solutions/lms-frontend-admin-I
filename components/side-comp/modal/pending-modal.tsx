import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";

const PendingModal = ({ handleCloseModal, person, projectReview }: any) => {
  const params = useParams<{ student: string }>();
  const id = params.student;
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
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (comment !== "") {
      try {
        setLoading(true);
        const accessToken = Cookies.get("adminAccessToken");
        const response = await axios.patch(
          `${urls.getCourses}${person?.course?.id}/submissions/${person?.submission_id}/`,
          {
            project_id: person?.project?.id,
            submission_link: submitDetails?.submission_link,
            mentor_comments: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Admin commented successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          setLoading(false);
          handleCloseModal();
          window.location.reload();
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          await refreshAdminToken();
          await handleSubmit();
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
        } else if (error?.response?.status === 400) {
          toast.error(error?.response?.data[0], {
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
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white p-4 w-full mx-2 md:mx-0 md:w-1/3 h-5/6">
      <div>
        <ToastContainer />
        <div className="flex justify-between items-center">
          <h1 className="md:text-2xl text-lg font-medium">
            {person?.course?.title}
          </h1>
          <span
            onClick={handleCloseModal}
            className="border-2 cursor-pointer border-main p-2 rounded-sm w-[32px] h-[32px] flex justify-center items-center"
          >
            <X className="text-main" />
          </span>
        </div>
        <div className="md:px-2.5 px-1 py-1 my-2 bg-[#FFF3E5] text-[#EE7E00] rounded-[16px] w-[110px] text-center">
          <p>Pending</p>
        </div>
      </div>
      <div>
        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Submission link
          </h1>
          <span className="text-[#3E3E3E] text-base md:text-lg">
            {!loadSubmit ? (
              <a
                target="_blank"
                className="cursor-pointer"
                href={submitDetails?.submission_link}
              >
                {submitDetails?.submission_link}
              </a>
            ) : (
              <p>Please wait...</p>
            )}
          </span>
          {/* <p className="text-[#3E3E3E] text-base md:text-lg">
            {!loadSubmit ? submitDetails?.submission_link : "Please wait..."}
          </p> */}
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
          <Textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="bg-[#EEEEFB] text-[#3E3E3E] text-base md:text-sm"
          />
        </div>
      </div>
      <div className="w-full">
        <Button
          onClick={() => {
            handleSubmit();
          }}
          disabled={loading && loadSubmit}
          className="bg-sub disabled:bg-sub/25 w-full hover:text-white  text-black"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default PendingModal;
