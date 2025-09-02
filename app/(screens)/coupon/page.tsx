"use client";
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoPlus } from "react-icons/go";
import { Loader2, X } from "lucide-react";
import useStudentStore from "@/store/fetch-student";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiCoupon2Fill, RiDeleteBin6Line } from "react-icons/ri";
// import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";
import useStudentsStore from "@/store/fetch-students";
import { createAxiosInstance } from "@/lib/axios";

const Coupon = () => {
  const { studentData, fetchStudentData } = useStudentStore();
  //   const { students, loading: loadStudent, fetchStudents } = useStudentsStore();
  const [students, setStudents] = useState<any[]>([]);
  const [loadStudent, setLoadStudent] = useState(true);
  const axios = createAxiosInstance();
  const fetchStudents = async () => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");

      const response = await axios.get(`${urls.coupon}coupon_student_list/`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      if (response.status === 200) {
        setStudents(response.data);
      }
    } catch (error: any) {
      if (error.message === "Network Error") {
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
        toast.error(error.response?.data?.detail, {
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
      setLoadStudent(false);
    }
  };

  const [coupons, setCoupons] = useState<any[]>([]);
  const [loadCoupons, setLoadCoupons] = useState(true);

  const [data, setData] = useState({
    discount_percentage: "",
    usage_limit: "",
    expires_at: "",
    user_email: "",
  });
  const { discount_percentage, usage_limit, expires_at, user_email } = data;

  const listCoupon = async () => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");

      const response = await axios.get(`${urls.coupon}`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      if (response.status === 200) {
        setCoupons(response.data);
      }
    } catch (error: any) {
     if (error.message === "Network Error") {
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
        toast.error(error.response?.data?.detail, {
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
      setLoadCoupons(false);
    }
  };

  const [selectedCoupon, setSelectedCoupon] = useState<number | null>(null);
  const [loadDelCoupon, setLoadDelCoupon] = useState(false);
  const deleteCoupon = async (id: number) => {
    try {
      setLoadDelCoupon(true);
      const adminAccessToken = Cookies.get("adminAccessToken");

      const res = await axios.delete(`${urls.coupon}${id}/`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      if (res.status === 204 || res.status === 200) {
        toast.success("Coupon deleted successfully!");
        // setCoupons((prev) => prev.filter((c) => c.id !== id));
        listCoupon();
        setSelectedCoupon(null);
      }
    } catch (error: any) {
     if (error.message === "Network Error") {
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
        toast.error(error.response?.data?.detail, {
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
      setLoadDelCoupon(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
    listCoupon();
    fetchStudents();
  }, []);

  useEffect(() => {
    if (user_email) {
      setIsGeneral(false);
    } else {
      setIsGeneral(true);
    }
  }, [user_email]);

  const userName = studentData?.full_name;
  const initials = userName ? userName.charAt(0).toUpperCase() : "";

  const [openModal, setOpenModal] = useState(false);
  const [isGeneral, setIsGeneral] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCouponData, setSelectedCouponData] = useState<any>(null);

  const handleEdit = (coupon: any) => {
    const matchedStudent = students.find(
      (student) => student.email === coupon.user_email
    );

    setData({
      discount_percentage: coupon.discount_percentage.toString(),
      usage_limit: coupon.usage_limit.toString(),
      expires_at: new Date(coupon.expires_at).toISOString().split("T")[0],
      user_email: matchedStudent?.id || "",
    });
  };

  const saveCoupon = async () => {
    const payload: any = {
      discount_percentage: Number(discount_percentage),
      usage_limit: Number(usage_limit),
      expires_at: new Date(expires_at + "T00:00:00Z").toISOString(),
      active: true,
    };

    if (!isGeneral) {
      payload["user"] = user_email;
    }

    // console.log(payload, "pay");

    // return;

    try {
      setLoading(true);
      const adminAccessToken = Cookies.get("adminAccessToken");

      const response = editMode
        ? await axios.put(`${urls.coupon}${selectedCouponData.id}/`, payload, {
            headers: {
              Authorization: `Bearer ${adminAccessToken}`,
            },
          })
        : await axios.post(`${urls.coupon}`, payload, {
            headers: {
              Authorization: `Bearer ${adminAccessToken}`,
            },
          });

      toast.success(`Coupon ${editMode ? "updated" : "created"} successfully!`);
      setData({
        discount_percentage: "",
        usage_limit: "",
        expires_at: "",
        user_email: "",
      });
      setEditMode(false);
      setSelectedCoupon(null);
      setSelectedCouponData(null);
      listCoupon();
      setOpenModal(false);
    } catch (error: any) {
    if (error.message === "Network Error") {
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
        toast.error(error.response?.data?.detail, {
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

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCouponDel, setSelectedCouponDel] = useState<any>(null);

  const handleDeleteClick = (coupon: any) => {
    setSelectedCouponDel(coupon);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedCouponDel) {
      deleteCoupon(selectedCouponDel?.id);
    }
    setShowConfirm(false);
    setSelectedCouponDel(null);
  };
  return (
    <main>
      <SideNav />
      <ToastContainer />

      <div className="lg:ml-64 ml-0 overflow-y-scroll h-[100vh] sm:h-screen p-4 bg-slate-50">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-main text-lg sm:text-2xl md:text-3xl font-medium">
              Coupons
              <span className="font-medium text-base sm:text-xl md:text-2xl text-[#666666]">
                (
                {loadCoupons ? (
                  <Loader2 className="animate-spin inline-block" />
                ) : (
                  coupons?.length
                )}
                )
              </span>
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex flex-row-reverse sm:flex-row items-center gap-2">
                <Avatar>
                  <AvatarImage
                    className=" object-cover"
                    src={studentData?.profile_photo}
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  {loadCoupons ? (
                    <Skeleton className="h-4 w-[250px]" />
                  ) : (
                    <div>
                      <h1 className="text-sm text-right sm:text-left sm:text-base text-main font-semibold">
                        {userName}
                      </h1>
                      <p className="text-[#666666] font-normal text-xs">
                        {studentData?.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end py-6">
            <button
              onClick={() => setOpenModal(true)}
              className="flex text-sm items-center w-full justify-center sm:my-0 my-2 sm:justify-normal sm:w-auto gap-2 bg-sub rounded-[6px] py-2 px-4 text-white"
            >
              <GoPlus /> Create a new coupon
            </button>
          </div>
        </div>
        <div className="w-full shadow-[0_0_20px_0_rgba(0,0,0,0.1)] bg-white rounded-[10px] p-4">
          <div className="w-full overflow-x-scroll">
            <table className="w-full  table-auto">
              <thead className="bg-[#E6F6FF]">
                <tr className="rounded-[6px]">
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Coupon Code
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    User Email
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Percentage
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Cohort Status
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Usage Limit
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Usage Count
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Expiry Date
                  </th>
                  <th className="text-[#00173A] font-medium text-xs whitespace-nowrap sm:text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]"></th>
                </tr>
              </thead>
              <tbody className="relative">
                {loadCoupons ? (
                  <tr>
                    <td colSpan={8} className="py-4">
                      <Skeleton className="h-4 w-full" />
                      <p className="text-center">Loading Coupons</p>
                    </td>
                  </tr>
                ) : coupons && coupons?.length > 0 ? (
                  <>
                    {coupons.map((coupon: any, index) => {
                      const isActive = coupon.active === true;
                      //   const isSelected = selectedCoupon === index;
                      return (
                        <tr className="" key={index}>
                          <td className="p-[6px_12px] cursor-pointer hover:bg-slate-100 capitalize md:p-[10px_16px] text-[#666666] font-medium text-xs whitespace-nowrap md:text-base">
                            {coupon?.code}
                          </td>
                          <td className="p-[6px_12px] md:p-[10px_16px] text-[#666666] font-medium text-xs whitespace-nowrap md:text-base">
                            {coupon.user_email
                              ? coupon.user_email
                              : "All users"}
                          </td>
                          <td className="p-[6px_12px] md:p-[10px_16px] text-[#666666] font-medium text-xs whitespace-nowrap md:text-base">
                            {coupon.discount_percentage}%
                          </td>
                          <td
                            className={`p-[6px_12px] md:p-[10px_16px] capitalize font-medium text-xs whitespace-nowrap md:text-base flex items-center gap-1 
                          ${isActive ? "text-[#2FBC8D]" : "text-[#FF7F11]"}`}
                          >
                            {!isActive ? "Expired" : "Active"}
                          </td>

                          <td
                            className={`p-[6px_12px] md:p-[10px_16px] capitalize font-medium text-xs whitespace-nowrap md:text-base `}
                          >
                            {coupon.usage_limit}
                          </td>
                          <td
                            className={`p-[6px_12px] md:p-[10px_16px] capitalize font-medium text-xs whitespace-nowrap md:text-base `}
                          >
                            {coupon.used_count ?? 0}
                          </td>
                          <td
                            className={`p-[6px_12px] md:p-[10px_16px] capitalize font-medium text-xs whitespace-nowrap md:text-base `}
                          >
                            {new Date(coupon.expires_at).toLocaleDateString()}
                          </td>
                          <td className="flex items-center gap-1">
                            <button
                              onClick={() => handleDeleteClick(coupon)}
                              className="text-red-500 text-sm cursor-pointer"
                            >
                              Delete
                            </button>
                            |{" "}
                            <button
                              onClick={(e) => {
                                setEditMode(true);
                                setOpenModal(true);
                                setSelectedCouponData(coupon);
                                handleEdit(coupon);
                              }}
                              className="text-green-500 cursor-pointer text-sm"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center">
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="absolute animate-in top-0 left-0 bg-black/30 w-full h-screen overflow-scroll flex justify-center items-center z-50">
          <div
            className={`bg-white rounded-sm shadow-sm p-4 h-auto overflow-scroll relative w-11/12 xl:w-1/3`}
          >
            <X
              onClick={() => {
                setOpenModal(false);
                setData({
                  discount_percentage: "",
                  usage_limit: "",
                  expires_at: "",
                  user_email: "",
                });
                setIsGeneral(false);
                setEditMode(false);
              }}
              className="text-red-500 cursor-pointer absolute right-2 top-2"
            />
            <h1
              className={`text-center text-base font-semibold mb-4 flex items-center gap-1 justify-center w-full text-black`}
            >
              Create Coupon
              <RiCoupon2Fill className="text-main" />
            </h1>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="discount_percentage"
                className="text-sm text-main"
              >
                Discount Percentage (%)
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={discount_percentage}
                onChange={(e) =>
                  setData({
                    ...data,
                    discount_percentage: e.target.value,
                  })
                }
                placeholder="Discount Percentage (%)"
                className="border text-sm border-gray-300 rounded p-2"
              />
              <label htmlFor="usage_limit" className="text-sm text-main">
                Usage Limit
              </label>
              <input
                type="number"
                min={1}
                value={usage_limit}
                onChange={(e) =>
                  setData({
                    ...data,
                    usage_limit: e.target.value,
                  })
                }
                placeholder="Usage Limit"
                className="border text-sm border-gray-300 rounded p-2"
              />
              <label htmlFor="expires_at" className="text-sm text-main">
                Expiry Date
              </label>
              <input
                type="date"
                value={expires_at}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setData({
                    ...data,
                    expires_at: e.target.value,
                  })
                }
                placeholder="Expiry Date"
                className="border text-sm ring-main border-gray-300 rounded p-2"
              />
              <label htmlFor="studeents" className="text-sm text-main">
                Students
              </label>
              {/* <br /> */}
              <select
                className="border text-sm border-gray-300 rounded p-2 w-full"
                name="students"
                id="students"
                value={user_email || ""}
                onChange={(e) => {
                  setData({
                    ...data,
                    user_email: e.target.value,
                  });
                }}
              >
                <option value="">Select student</option>

                {students.map((std: any, idx) => (
                  <option key={idx} value={std.id}>
                    {`${std.first_name || ""} ${std.last_name || ""}`.trim()}
                  </option>
                ))}
              </select>
            </div>
            <>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-700">General Coupon?</span>
                <input
                  type="checkbox"
                  checked={isGeneral}
                  onChange={() => setIsGeneral(!isGeneral)}
                  className="w-4 h-4 accent-main"
                />
              </div>

              <button
                disabled={loading || loadStudent}
                onClick={saveCoupon}
                className="mt-4 w-full py-2 bg-main text-white text-sm rounded-sm disabled:bg-main/70 flex justify-center items-center"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : editMode ? (
                  "Update Coupon"
                ) : (
                  "Create Coupon"
                )}
              </button>
            </>
          </div>
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-sm font-medium mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete coupon{" "}
              <strong>{selectedCouponDel?.code}</strong> for{" "}
              <strong>{selectedCouponDel?.user_email}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                disabled={loadDelCoupon}
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                {loadDelCoupon ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Coupon;
