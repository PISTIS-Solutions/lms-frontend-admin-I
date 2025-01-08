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
import pat from "@/public/assets/patric.png";
import axios from "axios";
import { urls } from "@/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "Input first name",
    }),
    lastName: z.string().min(2, {
      message: "Input last name",
    }),
    phone: z.string().regex(/^[0-9]+$/, "Phone number must be numeric"),
    bio: z.string().min(2, {
      message: "Please include a bio",
    }),
    role: z.string({
      message: "Please select a your position.",
    }),
    password: z.string().min(2, "Input password"),
    confirmPassword: z.string().min(2, "Input confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const MentorInformation = () => {
  //fetch uid and token from url
  const params = useParams<{ uid: string; token: string }>();
  const uid = params.uid;
  const token = params.token;

  const router = useRouter();
  //select image
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
  // select country code
  const [selectedCode, setSelectedCode] = useState("+234");
  //select roles
  const roles = [
    {
      fe: "Executive",
      be: "executive",
    },
    {
      fe: "Faculty Lead",
      be: "faculty_lead",
    },
    {
      fe: "Mentor",
      be: "mentor",
    },
    {
      fe: "Frontend Developer",
      be: "frontend_dev",
    },
    {
      fe: "Backend Developer",
      be: "backend_dev",
    },
    {
      fe: "PR",
      be: "pr",
    },
    {
      fe: "Designer",
      be: "designer",
    },
    {
      fe: "Copywriter",
      be: "copywriter",
    },
  ];
  //show and hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //firstname, lastname, phonenumber

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      bio: "",
      role: "",
    },
  });

  const uploadMentorInfo = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("uid", uid);
      formData.append("token", token);
      formData.append("first_name", values.firstName);
      formData.append("bio", values.bio);
      formData.append("position", values.role);
      formData.append("last_name", values.lastName);
      formData.append("phone_number", `${selectedCode}${values.phone}`);
      formData.append("password", values.password);
      formData.append("confirm_password", values.confirmPassword);
      if (selectedFile) {
        formData.append("profile_photo", selectedFile);
      }
      const response = await axios.post(urls.uploadMentor, formData, {});

      if (response.status === 200) {
        toast.success("Mentor account activated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        router.replace("/");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await uploadMentorInfo(values);
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
      } else if (error?.response?.status === 404) {
        toast.error("Mentor not found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else if (error?.response?.status === 500) {
        toast.error("Error activating account!", {
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
    }
  };

  return (
    <div className="flex p-0 sm:p-4 justify-around gap-0 sm:gap-4">
      <ToastContainer />
      <div className="w-1/2  sm:block hidden relative h-screen">
        <Image
          src={mentorImg}
          alt="mentor-img"
          className="object-cover w-full h-screen"
        />
        <div className="text-white absolute bottom-4 border border-white rounded-[20px] backdrop-blur-lg bg-[#66666633] p-6 left-0 w-5/6 mx-2">
          <p className=" font-normal text-xs sm:text-sm md:text-base">
            You don’t need to be an expert to start with DevOps. The key is a
            willingness to learn, collaborate, and emDevOps is a journey, not a
            destination. The focus should always be on learning, experimenting,
            and improving with every iteration, no matter where you start.brace
            automation. Every small step you take towards improving your
            processes brings you closer to success.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Image
              className=" w-12 h-12 rounded-full"
              alt="patrick"
              src={pat}
            />
            <p className="text-white font-semibold text-2xl">Patrick Debois</p>
          </div>
        </div>
      </div>
      <div className="sm:w-1/2 relative w-full mx-2 overflow-y-scroll h-[100vh] pt-10 sm:pt-16">
        <div>
          <h1 className="text-center text-[#000066] font-semibold text-2xl md:text-3xl">
            Welcome, Mentor! <br /> Let’s Get You Set Up.
          </h1>
          <Image
            src={pLogo}
            alt="pistis-logo"
            className="absolute w-16 h-16 block sm:hidden top-0 right-0"
          />
          <p className="text-[#828282] font-normal text-xs sm:text-sm md:text-base text-center py-2">
            You're just a step away from empowering the next generation of
            DevOps professionals. Complete your profile to begin mentoring.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-full h-44 w-44 sm:w-50 sm:h-50 my-5 bg-white cursor-pointer"
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
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <p className="flex items-center gap-1 mb-2 text-xs text-red-500">
            <PiWarningCircle />
            You must add a profile image
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(uploadMentorInfo)}
            // className="sm:space-y-4 space-y-2"
          >
            <div className="sm:flex block gap-4 items-center">
              <div className="sm:py-0 py-2 w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-[#FAFAFA] border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
                          placeholder="Enter your first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-[#FAFAFA] border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
                          placeholder="Enter your last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full my-2">
              <div className="">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            className="bg-[#FAFAFA] pl-20 indent-2 sm:indent-5 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
                            placeholder="Enter your phone number"
                            {...field}
                          />
                          <select
                            value={selectedCode}
                            onChange={(e) => setSelectedCode(e.target.value)}
                            className=" border border-[#DADADA] rounded-tl-[6px] h-full rounded-bl-[6px] text-xs sm:text-sm md:text-base bg-[#FAFAFA] absolute left-0 top-0"
                          >
                            {countryCodes.map((country, index) => (
                              <option key={index} value={country.code}>
                                {country.code}
                              </option>
                            ))}
                          </select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="flex items-center gap-1 text-[10px] sm:text-xs py-1 text-[#9F9F9F]">
                  <PiWarningCircle />
                  This number should be active on WhatsApp
                </p>
              </div>
            </div>
            <div className="w-full my-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal">
                      Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#FAFAFA] indent-1 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal">
                        {roles.map((role, index) => {
                          return (
                            <SelectItem
                              key={index}
                              className="text-[#9F9F9F] capitalize text-xs sm:text-sm md:text-base font-normal"
                              value={role.be}
                            >
                              {role.fe}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full my-2">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#2E2E2E] text-xs sm:text-sm md:text-base font-normal">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-[#FAFAFA] indent-1 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
                        placeholder="Enter your bio"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full my-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm sm:text-base">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-[#FAFAFA] indent-8 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full my-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm sm:text-base">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-[#FAFAFA] indent-8 border w-full border-[#DADADA] rounded-[6px] text-xs sm:text-sm md:text-base font-normal"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <span className="border-r border-r-[#666666]  absolute left-3 mt-2 top-0">
                          <IoKeyOutline className="text-[#666666] h-4 w-4 sm:h-6  sm:w-6 mr-1" />
                        </span>
                        <span className="absolute right-2 top-0 mt-2">
                          {showConfirmPassword ? (
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <button
              disabled={form.formState.isSubmitting ? true : false}
              className="w-full disabled:bg-main/75 bg-main rounded-[8px] flex items-center justify-center py-4 cursor-pointer text-white text-xs sm:text-sm md:text-base font-medium my-4 text-center"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MentorInformation;
