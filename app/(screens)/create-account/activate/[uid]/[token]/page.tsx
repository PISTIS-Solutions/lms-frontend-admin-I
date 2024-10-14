"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import mentorImg from "@/public/assets/mentorImg.png";

import { PiWarningCircle } from "react-icons/pi";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import pLogo from "@/public/assets/pistis_logo.png";
import countryCodes from "@/utils/countryCode";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import { Loader2 } from "lucide-react";

const MentorInformation = () => {
  const params = useParams<{ uid: string; token: string }>();
  const uid = params.uid;
  const token = params.token;
  const router = useRouter();

  //add mentor image
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedFile(file);
    }
  };
  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  //country codes
  const [selectedCode, setSelectedCode] = useState("+234");

  //select roles option
  const [selectRole, setSelectRole] = useState("");
  const roles = ["frontend", "backend", "devops"];

  //password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //firstname, lastname, phonenumber
  const [mentorData, setMentorData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    // email: "",
    role: "",
    bio: "",
    password: "",
    confirm_password: "",
  });

  //upload mentor information
  const [loading, setLoading] = useState(false);
  const uploadMentorInfo = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("uid", uid);
      formData.append("token", token);
      formData.append("first_name", mentorData.first_name);
      formData.append("last_name", mentorData.last_name);
      formData.append(
        "phone_number",
        `(${selectedCode})${mentorData.phone_number}`
      );
      formData.append("password", mentorData.password);
      formData.append("confirm_password", mentorData.confirm_password);

      if (selectedFile) {
        formData.append("profile_photo", selectedFile);
      }
      const response = await axios.post(urls.uploadMentor, formData, {});

      if (response.status === 200) {
        setLoading(false);
        toast.success("Mentor account activated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        // router.replace("/");
      } else if (response.status === 404) {
        toast.error("Mentor not found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else if (response.status === 500) {
        toast.error("Error activating account!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await uploadMentorInfo();
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
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-around gap-4">
      <div className="w-1/2 sm:block hidden relative h-screen">
        <Image
          src={mentorImg}
          alt="mentor-img"
          className="object-cover h-screen"
        />

        <div className="text-white border-l-2 border-white absolute bottom-6 left-0 w-5/6 px-6 mx-4">
          <h2 className=" font-semibold text-2xl md:text-3xl pb-3">
            Ipsum list layout align italic component project thumb
          </h2>
          <p className=" font-normal text-xs sm:text-sm md:text-base">
            Outline share italic underline clip. Frame invite export vertical
            select device. Underline ellipse outline figma follower. Undo
            selection select arrow share prototype component list. Arrow undo
            scale prototype boolean.Outline share italic underline clip. Frame
            invite export vertical select device.{" "}
          </p>
        </div>
      </div>
      <div className="sm:w-1/2 relative w-full mx-2 overflow-y-scroll h-[100vh] pt-10 sm:pt-16">
        <div>
          <h1 className="text-center text-[#000066] font-semibold text-2xl md:text-3xl">
            Welcome, Mentor! <br /> Let’s Get You Set Up.
          </h1>
          <Image src={pLogo} alt="pistis-logo" className="absolute w-16 h-16 block sm:hidden top-0 right-0" />
          <p className="text-[#828282] font-normal text-xs sm:text-sm md:text-base text-center py-2">
            You're just a step away from empowering the next generation of
            DevOps professionals. Complete your profile to begin mentoring.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-full h-44 w-44 sm:w-60  sm:h-60 my-5 bg-white cursor-pointer"
            onClick={handleClick}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <>
                <svg
                  className="w-20 h-20 text-gray-400"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"
                  />
                </svg>
                <p className="mt-2 text-gray-500 text-xs sm:text-sm font-medium">
                  Upload Profile Image
                </p>
              </>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <div className="sm:flex block gap-4 items-center">
          <div className="flex gap-1 sm:py-0 py-2 flex-col w-full">
            <label
              className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              type="text"
              value={mentorData.first_name}
              onChange={(e) =>
                setMentorData({ ...mentorData, first_name: e.target.value })
              }
              className="bg-[#FAFAFA] border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex gap-1 flex-col w-full">
            <label
              className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              type="text"
              value={mentorData.last_name}
              onChange={(e) =>
                setMentorData({ ...mentorData, last_name: e.target.value })
              }
              className="bg-[#FAFAFA] border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        {/* <div className="flex flex-col gap-1 w-full my-2">
          <label
            className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              type="text"
              className="bg-[#FAFAFA] indent-8 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
              placeholder="example@gmail.com"
              value={mentorData.email}
              onChange={(e) =>
                setMentorData({ ...mentorData, email: e.target.value })
              }
            />
            <span className="border-r border-r-[#666666]  absolute left-3 mt-2 top-0">
              <CiMail className="text-[#666666] h-6 w-6 mr-1" />
            </span>
          </div>
        </div> */}
        <div className="flex flex-col gap-1 w-full my-2">
          <label
            className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal"
            htmlFor="phone_no"
          >
            Phone Number
          </label>
          <div className="relative">
            <input
              type="number"
              className="bg-[#FAFAFA] pl-20 indent-2 sm:indent-5 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
              placeholder="123 456 7890"
              value={mentorData.phone_number}
              onChange={(e) =>
                setMentorData({ ...mentorData, phone_number: e.target.value })
              }
            />

            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className=" border border-[#DADADA] rounded-tl-[6px] rounded-bl-[6px] text-xs sm:text-sm md:text-base bg-[#FAFAFA] absolute left-0"
            >
              {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.code}
                </option>
              ))}
            </select>
            <p className="flex items-center gap-1 text-[10px] sm:text-xs py-1 text-[#9F9F9F]">
              <PiWarningCircle />
              This number should be active on WhatsApp
            </p>
          </div>
        </div>
        <div className="flex gap-1 flex-col w-full my-2">
          <label
            className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal"
            htmlFor="position"
          >
            Position
          </label>
          <select
            className="bg-[#FAFAFA] indent-1 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
            name="position"
            id="position"
            value={mentorData.role}
            onChange={(e) => {
              setMentorData({
                ...mentorData,
                role: e.target.value,
              });
            }}
          >
            <option
              className="text-[#9F9F9F] text-xs sm:text-sm md:text-base font-normal"
              value=""
            >
              Select your Position
            </option>
            {roles.map((role: any) => {
              return (
                <option
                  className="text-[#9F9F9F] capitalize text-xs sm:text-sm md:text-base font-normal"
                  value={role}
                >
                  {role}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex gap-1 flex-col w-full my-2">
          <label
            className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal"
            htmlFor="bio"
          >
            Bio
          </label>
          <div>
            <textarea
              className="bg-[#FAFAFA] indent-1 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
              name="bio"
              id="bio"
              value={mentorData.bio}
              onChange={(e) =>
                setMentorData({ ...mentorData, bio: e.target.value })
              }
              placeholder="Enter your bio here"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full my-2">
          <label
            className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={!showPassword ? "password" : "text"}
              className="bg-[#FAFAFA] indent-8 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
              placeholder="Password"
              value={mentorData.password}
              onChange={(e) =>
                setMentorData({ ...mentorData, password: e.target.value })
              }
            />
            <span className="border-r border-r-[#666666]  absolute left-3 mt-2 top-0">
              <IoKeyOutline className="text-[#666666] h-4 w-4 sm:h-6  sm:w-6 mr-1" />
            </span>
            <span className="absolute right-2 top-0 mt-2">
              {showPassword ? (
                <FaRegEye
                  className="sm:h-6 h-4 w-4 sm:w-6 text-[#666666]"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <FaRegEyeSlash
                  className="sm:h-6 h-4 w-4 sm:w-6  text-[#666666]"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full my-2">
          <label
            className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal"
            htmlFor="confirm_password"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={!showConfirmPassword ? "password" : "text"}
              className="bg-[#FAFAFA] indent-8 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
              placeholder="Confirm Password"
              value={mentorData.confirm_password}
              onChange={(e) =>
                setMentorData({
                  ...mentorData,
                  confirm_password: e.target.value,
                })
              }
            />
            <span className="border-r border-r-[#666666]  absolute left-3 mt-2 top-0">
              <IoKeyOutline className="text-[#666666] h-4 w-4 sm:h-6 sm:w-6 mr-1" />
            </span>
            <span className="absolute right-2 top-0 mt-2">
              {showConfirmPassword ? (
                <FaRegEye
                  className="sm:h-6 h-4 w-4 sm:w-6 text-[#666666]"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              ) : (
                <FaRegEyeSlash
                  className="sm:h-6 h-4 w-4 sm:w-6 text-[#666666]"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              )}
            </span>
            <p className="flex items-center gap-1 text-[10px] sm:text-xs py-1 text-[#9F9F9F]">
              <PiWarningCircle />
              Password must contain special character
            </p>
          </div>
        </div>
        <button
          onClick={uploadMentorInfo}
          disabled={loading}
          className="w-full disabled:bg-main/75 bg-main rounded-[8px] flex items-center justify-center py-4 cursor-pointer text-white text-xs sm:text-sm md:text-base font-medium my-4 text-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MentorInformation;
