"use client";
import Image from "next/image";
import React, { useState } from "react";

import user from "@/public/assets/avatar.png";

import { IoIosExit } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { TiStarburst } from "react-icons/ti";
import { FaAward } from "react-icons/fa6";
import { mentorAccess } from "@/utils/useMentorsAccess";
import { Loader2 } from "lucide-react";

const MentorsProfile = ({ handleInfoModal, selectedMentor }: any) => {
  const [loading, setLoading] = useState(false);
  //revoke access function
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

    await mentorAccess(requestBody, handleInfoModal, setLoading);
  };

  const [access, setAccess] = useState("");
  const [loadNewAccess, setLoadNewAcceess] = useState(false);
  const updateAdminAccess = async () => {
    const requestBody = {
      user_id: selectedMentor?.id,
      role: access,
      action: "assign",
    };

    await mentorAccess(requestBody, handleInfoModal, setLoadNewAcceess);
  };

  return (
    <div className="max-w-[768px] relative mx-auto h-[90vh] max-h-[830px] overflow-y-scroll bg-white shadow-[0_0_40px_0_rgba(0,0,0,0.3)] rounded-2xl p-6">
      <div className="sm:grid mx-auto block grid-cols-10 gap-2 items-center">
        <div className="relative w-40 mx-auto col-span-3">
          <div className=" w-4 h-4 bg-[#2FBC8D] border border-white rounded-full absolute top-8 right-0 " />
          <Image
            src={selectedMentor?.profile_photo}
            className="rounded-full w-40 object-fill h-40"
            alt="user"
            width="160"
            height="160"
          />
          <div
            onClick={revokeMentorAccess}
            className="border text-[#ff0000] flex items-center border-[#FF0000] bg-white mx-2 gap-1 -mt-5 z-10 relative hover:text-white hover:bg-[#ff0000] rounded-[40px] cursor-pointer p-[6px_16px]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <IoIosExit />}
            <p className=" text-xs font-normal">Revoke Access</p>
          </div>
        </div>
        <div className="col-span-7">
          <div className="">
            <div>
              <h1 className="text-main capitalize text-xl sm:text-2xl text-center sm:text-left font-medium">
                {selectedMentor?.first_name} {selectedMentor?.last_name}
              </h1>
              <div className="text-[#666666] text-xs md:text-sm font-normal flex sm:justify-normal justify-center items-center gap-4">
                <p>{selectedMentor?.email}</p>
                <GoDotFill />
                <p>{selectedMentor?.phone_number}</p>
              </div>
            </div>
            <IoClose
              onClick={() => handleInfoModal()}
              className="w-8 h-8 absolute top-3 right-3 cursor-pointer"
            />
          </div>
          <div className="rounded-[30px] flex justify-center bg-[#C2E8FF] py-2 px-3 my-3 sm:inline-block">
            <p className="text-[#014873] text-xs font-medium">
              Backend Engineer
            </p>
          </div>
          <p className="text-[#666666] font-normal text-center sm:text-left text-sm leading-5">
            Arrow shadow thumbnail list flatten edit vertical figjam. Share mask
            vector style reesizing create background underline variant. Auto pen
            pen boolean frame. Rotate horizontalackground underline variant.
            Auto pen pen boolean frame. Rotate horizontal p
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex sm:flex-row  flex-col items-center gap-x-1 justify-between py-2">
        <div>
          <div
            className={`${
              selectedMentor?.role?.toLowerCase() === "advanced"
                ? "text-[#2FBC8D]"
                : selectedMentor?.role?.toLowerCase() === "super_admin"
                ? "text-[#FF1053]"
                : selectedMentor?.role?.toLowerCase() === "basic"
                ? "text-[#02A1FF]"
                : "text-[#666666]"
            } flex items-center gap-1 text-sm capitalize sm:text-base font-medium`}
          >
            <TiStarburst className="w-5 h-5" />
            <p>{selectedMentor?.role} Mentor</p>
            <p className="text-[#666666]">Access</p>
          </div>
          <p className="text-[#828282] font-normal text-xs">
            These mentors have the highest level of access and can perform all
            platform-related actions.
          </p>
        </div>
        <button
          onClick={updateAdminAccess}
          className="text-white text-center font-medium text-xs sm:text-sm cursor-pointer py-2 px-4 rounded-[8px] bg-[#2FBC8D]"
        >
          {loadNewAccess ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={`border ${
            access === "basic" ? "border-[#02A1FF]" : "border-[#DADADA]"
          }  rounded-[10px] p-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#02A1FF]">
              <FaAward />
              <p className=" text-lg font-medium">Basic Mentor</p>
            </div>
            <input
              type="radio"
              name="access"
              id="access"
              onChange={(e) => setAccess(e.target.value)}
              value="basic"
            />
          </div>
          <p className="text-[#666666] font-normal text-xs py-2">
            These mentors are primarily focused on guiding students and
            providing feedback.
          </p>
          <ol className=" text-xs list-disc list-inside text-[#828282]">
            <li>
              <strong>Review, Approve, or Reject Students' Projects:</strong>{" "}
              Evaluate and provide feedback on student submissions.
            </li>
            <li>
              <strong>Assist in Projects:</strong> Can contribute or offer
              guidance on existing projects but cannot create, edit, or delete
              projects.
            </li>
          </ol>
        </div>
        <div
          className={`border ${
            access === "advanced" ? "border-[#2FBC8D]" : "border-[#DADADA]"
          }  rounded-[10px] p-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#2FBC8D]">
              <FaAward />
              <p className=" text-lg font-medium">Advanced Mentors</p>
            </div>
            <input
              type="radio"
              name="access"
              id="advanced"
              onChange={(e) => setAccess(e.target.value)}
              value="advanced"
            />
          </div>
          <p className="text-[#666666] font-normal text-xs py-2">
            These mentors have some administrative responsibilities related to
            course and project management.
          </p>
          <ol className=" text-xs list-disc list-inside text-[#828282]">
            <li>
              <strong>Review, Approve, or Reject Students' Projects:</strong>{" "}
              Same as Level 1.
            </li>
            <li>
              <strong>Create, Edit, and Delete Courses:</strong> Full control
              over courses, including adding new content, modifying existing
              materials, or removing outdated content.
            </li>
            <li>
              <strong>Create, Edit, and Delete Projects:</strong> Can create new
              projects, edit project details, or remove them as necessary.
            </li>
            <li>
              <strong>Update Students' Subscriptions:</strong> Can make
              adjustments or updates to students' subscription statuses (e.g.,
              renewals, upgrades).
            </li>
          </ol>
        </div>
        <div
          className={`border ${
            access === "super_admin" ? "border-[#FF1053]" : "border-[#DADADA]"
          }  rounded-[10px] p-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#FF1053]">
              <FaAward />
              <p className=" text-lg font-medium">Super Admin Mentors</p>
            </div>
            <input
              type="radio"
              name="access"
              id="admin-access"
              onChange={(e) => setAccess(e.target.value)}
              value="super_admin"
            />
          </div>
          <p className="text-[#666666] font-normal text-xs py-2">
            These mentors have the highest level of access and can perform all
            platform-related actions.
          </p>
          <ol className=" text-xs list-disc list-inside text-[#828282]">
            <li>
              <strong>Review, Approve, or Reject Students' Projects:</strong>{" "}
              Same as Level 1.
            </li>
            <li>
              <strong>Create, Edit, and Delete Courses:</strong> Full control
              over courses, including adding new content, modifying existing
              materials, or removing outdated content.
            </li>
            <li>
              <strong>Create, Edit, and Delete Projects:</strong> Can create new
              projects, edit project details, or remove them as necessary.
            </li>
            <li>
              <strong>Update Students' Subscriptions:</strong> Can make
              adjustments or updates to students' subscription statuses (e.g.,
              renewals, upgrades).
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MentorsProfile;
