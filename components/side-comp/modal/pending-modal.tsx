import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import axios from "axios";
import { baseURL, urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { createAxiosInstance } from "@/lib/axios";

const PendingModal = ({
  handleCloseModal,
  person,
  projectReview,
  fetchProjectReview,
}: any) => {
  const params = useParams<{ student: string }>();
  const id = params.student;
  const [submitDetails, setSubmitDetails] = useState<any | null>(null);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [rejectSubmit, setRejectSubmit] = useState(false);
  const axios = createAxiosInstance();
  const fetchSubDetails = async () => {
    try {
      setLoadSubmit(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.get(
        `${baseURL}/students/${person?.course?.id}/submissions/${person?.submission_id}/`,
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
    if (error?.message === "Network Error") {
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

  //submission funct
  const handleSubmit = async () => {
    if (comment !== "") {
      try {
        setLoading(true);
        const accessToken = Cookies.get("adminAccessToken");
        const response = await axios.patch(
          `${baseURL}/students/${person?.course?.id}/submissions/${person?.submission_id}/`,
          {
            project_id: person?.project?.id,
            submission_link: submitDetails?.submission_link,
            mentor_comments: comment,
            status: "Reviewed",
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
          fetchProjectReview(id, "");
          // window.location.reload();
        }
      } catch (error: any) {
       if (error?.message === "Network Error") {
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

  const rejectSubmitFunct = async () => {
    if (comment !== "") {
      try {
        setRejectSubmit(true);
        const accessToken = Cookies.get("adminAccessToken");
        const response = await axios.patch(
          `${baseURL}/students/${person?.course?.id}/submissions/${person?.submission_id}/`,
          {
            project_id: person?.project?.id,
            submission_link: submitDetails?.submission_link,
            mentor_comments: comment,
            // status: "Reviewed",
            status: "Rejected",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Project Rejected, Comment added successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          setRejectSubmit(false);
          handleCloseModal();
          // window.location.reload();
          fetchProjectReview(id, "");
        }
      } catch (error: any) {
     if (error?.message === "Network Error") {
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
        setRejectSubmit(false);
      }
    }
  };

  return (
    <div className="bg-white p-4 w-full mx-2 md:mx-0 md:w-1/3 h-5/6">
      <div>
        <ToastContainer />
        <div className="flex justify-between items-center">
          <h1 className="md:text-2xl text-lg font-medium">
            {person?.project?.title}
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
                className="cursor-pointer break-words"
                href={submitDetails?.submission_link}
              >
                {submitDetails?.submission_link}
              </a>
            ) : (
              <Skeleton />
            )}
          </span>
        </div>

        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Student’s comment
          </h1>
          <p className="text-[#3E3E3E] text-base md:text-lg">
            {!loadSubmit ? submitDetails?.student_comments : <Skeleton />}
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
          className="bg-sub disabled:bg-sub/25 w-full hover:text-white font-semibold text-black"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
        <Button
          onClick={() => {
            rejectSubmitFunct();
          }}
          disabled={loading && rejectSubmit}
          className="bg-red-700 disabled:bg-red-700/25 w-full hover:text-white  text-white mt-2 font-semibold"
        >
          {rejectSubmit ? <Loader2 className="animate-spin" /> : "Reject"}
        </Button>
      </div>
    </div>
  );
};

export default PendingModal;
