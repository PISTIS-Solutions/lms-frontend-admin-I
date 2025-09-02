"use client";
import React, { useEffect, useRef, useState } from "react";

import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

import user from "@/src/assets/avatar.jpg";
import { EditIcon, Eye, EyeOff, KeyRound, Loader2, Mail } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import TopNav from "@/components/side-comp/topNav";
// import axios from "axios";
import { urls } from "@/utils/config";
import refreshToken from "@/utils/refreshToken";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshAdminToken from "@/utils/refreshToken";
import useStudentStore from "@/store/fetch-student";
import { useRouter } from "next/navigation";
import { createAxiosInstance } from "@/lib/axios";

const passwordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(8, "Password should have at least 8  characters")
    .refine(
      (value) =>
        /^(?=.*[!@#$%^&*()_+{}|:<>?~_-])[a-zA-Z\d!@#$%^&*()_+{}|:<>?~_-]+$/.test(
          value
        ),
      "Password should contain at least one special character"
    ),
  confirmPassword: z
    .string()
    .min(8, "Password should have at least 6 characters")
    .refine(
      (value) =>
        /^(?=.*[!@#$%^&*()_+{}|:<>?~_-])[a-zA-Z\d!@#$%^&*()_+{}|:<>?~_-]+$/.test(
          value
        ),
      "Password should contain at least one special character"
    ),
});

const SettingsPage = () => {
  const { studentData, fetchStudentData } = useStudentStore();
  useEffect(() => {
    fetchStudentData();
  }, []);
  // console.log(studentData?.email, "sd");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const axios = createAxiosInstance();
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [notSame, setNotSame] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const showDeleteModal = () => {
    setDeleteModal((prev) => !prev);
  };

  const [passwordLoading, setPasswordLoading] = useState(false);
  const onSubmitPassword = async (
    values: z.infer<typeof passwordSchema>,
    e: any
  ) => {
    e.preventDefault();
    if (values.confirmPassword === values.newPassword) {
      setNotSame("");
      try {
        setPasswordLoading(true);
        const adminAccessToken = Cookies.get("adminAccessToken");
        const response = await axios.post(
          urls.setStudentPassword,
          {
            new_password: values.newPassword,
            re_new_password: values.confirmPassword,
            current_password: values.currentPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + adminAccessToken,
            },
          }
        );

        if (response.status === 204) {
          setPasswordLoading(false);
          toast.success("Password changed successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });

          Cookies.remove("adminAccessToken");
          router.replace("/");
        }
      } catch (error: any) {
        // console.log(error);
        if (error.response && error.response.status === 401) {
          try {
            await refreshToken();
            await onSubmitPassword(values, e);
          } catch (refreshError: any) {
            // console.error("Error refreshing token:", refreshError.message);
          }
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
        } else if (
          error.response.data.new_password[0] ===
            "The password is too similar to the First Name." ||
          error.response.data.new_password[0] ===
            "The password is too similar to the Last Name."
        ) {
          toast.error("Password is too similar to name", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        } else if (
          error.response.data.current_password[0] === "Invalid password."
        ) {
          toast.error("Invalid current password!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        } else {
          // console.log("Password change failed:", error);
        }
      } finally {
        setPasswordLoading(false);
      }
    } else {
      setNotSame("New password and confirm new Password must be the same");
    }
  };

  // pfp state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSelectImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [generalLoading, setGeneralLoading] = useState(false);
  const onSubmitGeneral = async (e: any) => {
    e.preventDefault();
    if (fullName) {
      try {
        // console.log(email, "em");
        setGeneralLoading(true);
        const adminAccessToken = Cookies.get("adminAccessToken");

        const formData = new FormData();
        formData.append("full_name", fullName);
        formData.append("email", studentData?.email);
        if (selectedFile) {
          formData.append("profile_photo", selectedFile);
        }
        const response = await axios.patch(
          urls.updateStudentProfile,
          formData,
          {
            headers: {
              Authorization: "Bearer " + adminAccessToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          setGeneralLoading(false);
          toast.success("General details changed successfully!", {
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
        // Handle errors
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error
          try {
            await refreshToken();
            await onSubmitGeneral(e);
          } catch (refreshError: any) {}
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
          // Handle other errors
          // console.log("Password change failed:", error);
        }
      } finally {
        // Reset loading state
        setGeneralLoading(false);
      }
    } else {
      toast.error("Ensure fields are filled correctly!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(true);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [showNewPassword, setShowNewPassword] = useState(true);
  const toggleNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const [loading, setLoading] = useState(false);
  const DeactivateStudent = async () => {
    try {
      setLoading(true);
      const adminAccessToken = Cookies.get("adminAccessToken");
      const response = await axios.post(
        urls.deleteStudent,
        {
          confirm_deactivation: true,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Account Deactivated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        Cookies.remove("adminAccessToken");
        router.replace("/");
      }
    } catch (error: any) {
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-end items-center bg-white shadow-md p-4 w-full">
          <TopNav />
        </div>
        <div className="md:p-5 p-2">
          <div>
            <div className=" flex justify-center items-center">
              <div className="relative">
                <span>
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="selected"
                      className="w-[159px] h-[159px] rounded-full object-contain"
                    />
                  ) : (
                    <Image
                      src={user}
                      className="w-[159px] h-[159px] rounded-full object-contain"
                      alt="user"
                      priority
                    />
                  )}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <span
                  onClick={handleSelectImageClick}
                  className="bg-white rounded-full cursor-pointer absolute bottom-0 right-0 p-2"
                >
                  <EditIcon />
                </span>
              </div>
            </div>
            <div>
              <div className="md:px-5 px-2">
                {/* general form fields */}

                <form className="space-y-3">
                  <div className="block md:grid grid-cols-6 py-5">
                    <h1 className="text-lg md:text-[22px] col-span-2 font-medium ">
                      General
                    </h1>
                    <div className="col-span-4">
                      <div>
                        <div>
                          <label className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                            Full name
                          </label>
                          <div>
                            <div className="">
                              <Input
                                className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] w-full rounded-[6px]"
                                placeholder={studentData?.full_name}
                                value={fullName}
                                onChange={(e) => {
                                  setFullName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <label className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                            Email Address
                          </label>
                          <div>
                            <div className="relative">
                              <Mail className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                              <Input
                                type="email"
                                className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                // placeholder={}
                                value={studentData?.email}
                                // onChange={(e) => {
                                //   setEmail(e.target.value);
                                // }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div>
                        <div>
                          <label className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                            Phone Number
                          </label>
                          <div>
                            <div className="relative">
                              <Mail className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                              <Input
                                type="phoneNumber"
                                className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                placeholder="445-892-5312"
                                value={phoneNumber}
                                onChange={(e) => {
                                  setPhoneNumber(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="lg:flex block justify-end">
                    <Button
                      onClick={(e) => onSubmitGeneral(e)}
                      disabled={generalLoading}
                      type="submit"
                      className="w-full lg:w-1/3 bg-[#33CC99] disabled:bg-[#33CC99]/25 disabled:cursor-none py-6 font-medium text-base md:text-2xl text-black hover:text-white"
                    >
                      {generalLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </form>

                {/* change password form field */}
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
                    className="space-y-3"
                  >
                    <div className="block md:grid grid-cols-6 py-5">
                      <h1 className="text-lg md:text-[22px] col-span-2 font-medium ">
                        Password
                      </h1>
                      <div className="col-span-4">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                                Current password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                                  {showPassword ? (
                                    <Eye
                                      onClick={togglePassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  ) : (
                                    <EyeOff
                                      onClick={togglePassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  )}
                                  <Input
                                    type={showPassword ? "password" : "text"}
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                    placeholder="Password"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                                New password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                                  {showNewPassword ? (
                                    <Eye
                                      onClick={toggleNewPassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  ) : (
                                    <EyeOff
                                      onClick={toggleNewPassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  )}
                                  <Input
                                    type={showNewPassword ? "password" : "text"}
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                    placeholder="Password"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="md:text-xl text-sm my-3 text-[#3E3E3E]">
                                Confirm password
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                                  {showConfirmPassword ? (
                                    <Eye
                                      onClick={toggleConfirmPassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  ) : (
                                    <EyeOff
                                      onClick={toggleConfirmPassword}
                                      className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                                    />
                                  )}
                                  <Input
                                    type={
                                      showConfirmPassword ? "password" : "text"
                                    }
                                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] rounded-[6px] indent-6"
                                    placeholder="Password"
                                    {...field}
                                  />
                                  <p className="text-xl text-red-500 text-center">
                                    {notSame}
                                  </p>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="lg:flex block justify-end">
                      <Button
                        disabled={passwordLoading}
                        type="submit"
                        className="w-full lg:w-1/3 bg-[#33CC99] py-6 font-medium text-base md:text-2xl text-black hover:text-white"
                      >
                        {passwordLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
              <div className="lg:flex block justify-between items-center p-2 md:p-5">
                <h2 className="md:text-[22px] text-lg font-medium ">
                  Delete Account
                </h2>
                <p className="md:text-xl text-sm font-normal w-full lg:w-96">
                  All data associated with this account will be deleted if you
                  deactivate this account
                </p>
                <h2
                  onClick={showDeleteModal}
                  className="text-red-500 cursor-pointer text-base text-center lg:text-left my-4 lg:my-0 md:text-xl font-medium "
                >
                  Deactivate
                </h2>
              </div>
              {deleteModal && (
                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-slate-200/50">
                  <div className="bg-white rounded-[8px] py-10 px-5 md:w-auto w-[605px] h-auto md:h-[189px] max-h-auto">
                    <h1 className="text-black font-semibold text-2xl ">
                      Deactivate account
                    </h1>
                    <p className="text-[#3E3E3E] text-lg py-2">
                      Are you sure you want to deactivate your account? By doing
                      this, you will lose all your saved data
                    </p>
                    <div className="flex justify-end gap-x-5 items-center">
                      <Button
                        onClick={() => {
                          DeactivateStudent();
                        }}
                        disabled={loading}
                        className="bg-[#F10F2A] text-white"
                      >
                        {loading ? (
                          <Loader2 className=" animate-spin" />
                        ) : (
                          <p>Deactivate</p>
                        )}
                      </Button>
                      <p className="cursor-pointer" onClick={showDeleteModal}>
                        Cancel
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
