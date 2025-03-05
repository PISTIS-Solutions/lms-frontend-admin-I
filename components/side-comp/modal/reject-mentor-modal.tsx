import Image from "next/image";
import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import mentorImg from "@/src/assets/avatar.png";
import { GoDotFill } from "react-icons/go";
import { Loader2 } from "lucide-react";
import { mentorAccess } from "@/utils/useMentorsAccess";
import { ToastContainer } from "react-toastify";

const RejectMentorModal = ({ handleRejectModal, selectedMentor }: any) => {
  const [confirmReject, setConfirmReject] = useState(false);

  const handleConfirmReject = () => {
    setConfirmReject(true);
    
  };

  const [loading, setLoading] = useState(false);
  const revokeMentorAccess = async () => {
    const requestBody = {
      user_id: selectedMentor?.id,
      role: selectedMentor?.role
        ? selectedMentor.role.toLowerCase() === "basic"
          ? "basic"
          : selectedMentor.role.toLowerCase() === "advanced"
          ? "advanced"
          : selectedMentor.role.toLowerCase() === "admin" ||
            selectedMentor.role.toLowerCase() === "super_admin"
          ? "super_admin"
          : null
        : null,
      action: "revoke",
    };

    await mentorAccess(requestBody, handleConfirmReject, setLoading);
  };

  return (
    <div className="p-3">
      <ToastContainer/>
      {confirmReject ? (
        <div className="w-[1/3] max-w-[600px] flex flex-col items-center justify-between h-[345px] p-7 bg-white rounded-[10px] shadow-[0_0_80px_0_rgba(0,0,0,0.4)]">
          <h1 className="text-[#2E2E2E] sm:text-left text-center font-medium text-xl sm:text-2xl">
            Access Revoked Successfully
          </h1>
          <Image
            src={selectedMentor?.profile_photo}
            alt="mentor-image"
            className=" w-[120px] h-[120px] rounded-full object-fill"
            width="120"
            height="120"
          />
          <p className="text-[#666666] sm:text-left text-center font-normal text-sm sm:text-base">
            This user will loose all access to this platform till they are
            re-invited.
          </p>
          <button
            onClick={() => handleRejectModal()}
            className="text-[#C4C4C4] font-medium text-sm sm:text-base bg-[#2FBC8D] rounded-[8px] w-1/2 cursor-pointer p-[16px_10px]"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="w-[1/3] max-w-[600px] flex flex-col justify-between h-[430px] p-7 bg-white rounded-[10px] shadow-[0_0_80px_0_rgba(0,0,0,0.4)]">
          <h1 className="text-[#2E2E2E] font-medium text-xl sm:text-2xl text-center leading-6">
            Are you sure you want to revoke this mentors access?
          </h1>
          <div className="p-4 flex sm:flex-row flex-col items-center gap-4 bg-[#FFE5E5] rounded-[16px] ">
            <Image
              src={selectedMentor?.profile_photo}
              alt="mentor-image"
              className="w-20 h-20 rounded-full object-fill"
              width="80"
              height="80"
            />
            <div>
              <h1 className="text-[#FF0000] text-xl text-center sm:text-left sm:text-2xl font-medium capitalize">
                {selectedMentor?.last_name} {selectedMentor?.first_name}
              </h1>
              <div className="text-[#FF0000] text-sm font-normal flex sm:flex-row flex-col justify-center sm:justify-normal items-center gap-1 sm:gap-4">
                <p className="">{selectedMentor?.email}</p>
                <GoDotFill className="sm:block hidden" />
                <p>{selectedMentor?.phone_number}</p>
              </div>
            </div>
          </div>
          <p className="text-[#666666] font-normal text-sm sm:text-base text-center">
            This user will loose all access to this platform till they are
            re-invited or added back on.
          </p>
          <div className="flex items-center justify-between gap-4">
            <button
              disabled={loading}
              onClick={() => handleRejectModal()}
              className="bg-white border border-[#9F9F9F] py-4 px-5 w-full rounded-[8px] text-[#2E2E2E] text-sm sm:text-base font-medium"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={revokeMentorAccess}
              className="bg-[#FF0000] text-center flex items-center justify-center disabled:cursor-not-allowed cursor-pointer disabled:bg-[#ff0000]/50 rounded-[8px] text-[#C4C4C4] py-4 px-5 w-full text-sm sm:text-base font-medium"
            >
              {loading ? (
                <Loader2 className=" animate-spin" />
              ) : (
                "Revoke Access"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RejectMentorModal;
