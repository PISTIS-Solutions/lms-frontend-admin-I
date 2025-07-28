import { urls } from "@/utils/config";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RiCoupon2Fill } from "react-icons/ri";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import refreshAdminToken from "@/utils/refreshToken";

interface CouponState {
  create: boolean;
  list: boolean;
  selectedStudentId: string;
}

interface CouponModalProps {
  coupon: CouponState;
  setCoupon: (state: CouponState) => void;
}

const CouponModal = ({ coupon, setCoupon }: CouponModalProps) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    discount_percentage: "",
    usage_limit: "",
    expires_at: "",
  });
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loadCoupons, setLoadCoupons] = useState(true);

  const listCoupon = async () => {
    try {
      //   setLoading(true);
      const adminAccessToken = Cookies.get("adminAccessToken");

      const response = await axios.get(`${urls.coupon}`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      console.log(response, "rez coups");
      if (response.status === 200) {
        setCoupons(response.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await listCoupon();
      } else if (error.message === "Network Error") {
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

  useEffect(() => {
    if (coupon.list) {
      listCoupon();
    }
  }, [coupon.list]);

  const { discount_percentage, usage_limit, expires_at } = data;
  const saveCoupon = async () => {
    const payload: {
      discount_percentage: number;
      usage_limit: number;
      expires_at: string;
      active: boolean;
      user?: string;
    } = {
      discount_percentage: Number(discount_percentage),
      usage_limit: Number(usage_limit),
      expires_at: new Date(expires_at + "T00:00:00Z").toISOString(),
      active: true,
    };

    if (!isGeneral) {
      payload["user"] = coupon.selectedStudentId;
    }

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
      setCoupon({ list: false, create: false, selectedStudentId: "" });
      setData({ discount_percentage: "", usage_limit: "", expires_at: "" });
      setEditMode(false);
      setSelectedCoupon(null);
      setSelectedCouponData(null);
      listCoupon();
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await saveCoupon();
      } else if (error.message === "Network Error") {
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
      if (error.response && error.response.status === 401) {
        await refreshAdminToken();
        await deleteCoupon(id);
      } else if (error.message === "Network Error") {
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

  const [editMode, setEditMode] = useState(false);
  const [selectedCouponData, setSelectedCouponData] = useState<any>(null);
  const [isGeneral, setIsGeneral] = useState(false);

  return (
    <div className="absolute animate-in top-0 left-0 bg-black/30 w-full h-screen overflow-scroll flex justify-center items-center z-50">
      <ToastContainer />
      <div className="bg-white rounded-sm shadow-sm p-4 h-[70vh] overflow-scroll relative w-11/12 xl:w-1/3">
        <X
          onClick={() =>
            setCoupon({
              create: false,
              list: false,
              selectedStudentId: "",
            })
          }
          className="text-red-500 cursor-pointer absolute right-2 top-2"
        />
        <h1
          className={`text-center text-base font-semibold mb-4 flex items-center gap-1 justify-center w-full text-black
          `}
        >
          {coupon.create ? "Create" : ""} Coupon{" "}
          <RiCoupon2Fill className="text-main" />
        </h1>

        {coupon.create && (
          <div className="flex flex-col gap-2">
            <label htmlFor="discount_percentage" className="text-sm text-main">
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
          </div>
        )}

        {coupon.create && (
          <>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-700">General Coupon?</span>
              <input
                type="checkbox"
                checked={isGeneral}
                onChange={() => setIsGeneral(!isGeneral)}
                className="w-4 h-4"
              />
            </div>
            <button
              disabled={loading}
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
        )}

        {coupon.list && (
          <div className="mt-4 space-y-3 ">
            {loadCoupons ? (
              <div className="text-center w-full h-full flex justify-center items-center">
                <Loader2 className="animate-spin text-main" />
              </div>
            ) : coupons?.length === 0 ? (
              <div className="text-center text-sm text-gray-500">
                No coupons found
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-3">
                {coupons.map((coupon: any, index) => {
                  const isActive = coupon.active === true;
                  const isSelected = selectedCoupon === index;

                  return (
                    <li
                      key={coupon.id}
                      onClick={() => setSelectedCoupon(index)} 
                      className={`transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-main ring-2 ring-main/20 bg-main/5"
                          : "border-gray-200 hover:shadow-md"
                      } border rounded-md shadow-sm p-4`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            !isActive
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {!isActive ? "Expired" : "Active"}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditMode(true);
                            setSelectedCouponData(coupon);
                            setData({
                              discount_percentage:
                                coupon.discount_percentage.toString(),
                              usage_limit: coupon.usage_limit.toString(),
                              expires_at: new Date(coupon.expires_at)
                                .toISOString()
                                .split("T")[0],
                            });
                            setCoupon({
                              ...coupon,
                              create: true,
                            });
                          }}
                          className="text-xs px-2 py-1 border border-main text-main rounded hover:bg-main/10 transition"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong className="text-gray-700">Discount:</strong>{" "}
                          {coupon.discount_percentage}%
                        </p>
                        <p>
                          <strong className="text-gray-700">
                            Usage Limit:
                          </strong>{" "}
                          {coupon.usage_limit}
                        </p>
                        <p>
                          <strong className="text-gray-700">Used:</strong>{" "}
                          {coupon.used_count ?? 0}
                        </p>
                        <p>
                          <strong className="text-gray-700">
                            Coupon Code:
                          </strong>{" "}
                          <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-black">
                            {coupon.code}
                          </span>
                        </p>
                        <p>
                          <strong className="text-gray-700">Expires:</strong>{" "}
                          {new Date(coupon.expires_at).toLocaleDateString()}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="flex justify-end mt-4">
                          <button
                            disabled={loadDelCoupon}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCoupon(coupon.id);
                            }}
                            className="text-xs px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white disabled:opacity-70"
                          >
                            {loadDelCoupon ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponModal;
