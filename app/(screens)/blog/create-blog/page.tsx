"use client";
import React, { useRef, useState } from "react";

import SideNav from "@/components/side-comp/side-nav";
import TopNav from "@/components/side-comp/topNav";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormItem } from "@/components/ui/form";
import { AiOutlineUpload } from "react-icons/ai";
import { showToast } from "@/lib/showToast";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/config";
import refreshAdminToken from "@/utils/refreshToken";
import { toast, ToastContainer } from "react-toastify";

type BlogState = {
  title: string;
  blogLink: string;
  blogImage: File | null;
  loading: boolean;
  errors: {
    title?: string;
    blogLink?: string;
    blogImage?: string;
  };
};

const CreateBlog = () => {
  const router = useRouter();
  const [blog, setBlog] = useState<BlogState>({
    title: "",
    blogLink: "",
    blogImage: null,
    loading: false,
    errors: {},
  });

  const validateBlog = () => {
    const errors: BlogState["errors"] = {};
    if (!blog.title.trim()) errors.title = "Please input a blog title";
    if (!blog.blogLink.trim()) errors.blogLink = "Please input a blog link";
    if (!blog.blogImage) errors.blogImage = "Please upload a blog image";
    setBlog((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please upload a valid image file", "error");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setBlog((prev) => ({ ...prev, blogImage: null }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size should not exceed 5MB", "error");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setBlog((prev) => ({ ...prev, blogImage: null }));
      return;
    }

    setBlog((prev) => ({ ...prev, blogImage: file }));
  };

  const createBlog = async () => {
    try {
      if (!validateBlog()) return;
      setBlog((prev) => ({ ...prev, loading: true }));
      const adminAccessToken = Cookies.get("adminAccessToken");
      const payload = new FormData();

      payload.append("title", blog.title);
      payload.append("blog_link", blog.blogLink);
      payload.append("blog_picture", blog.blogImage!);

      const response = await axios.post(`${urls.blog}`, payload, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success(`${response.data.title} blog created`);
        setBlog({
          title: "",
          blogLink: "",
          blogImage: null,
          loading: false,
          errors: {},
        });
        router.push("/blog");
        setBlog((prev) => ({ ...prev, loading: false }));
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        await refreshAdminToken();
        await createBlog();
      } else if (err?.message === "Network Error") {
        toast.error("Check your network!");
      } else if (err?.response?.status === 400) {
        toast.error("Check links and form fields properly!");
      } else {
        toast.error(err?.response?.data?.detail || "Upload failed");
      }
      setBlog((prev) => ({ ...prev, loading: false }));
    } finally {
      setBlog((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <main className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />
      <div className="ml-0 lg:ml-64 overflow-y-scroll h-screen">
        <div className="md:h-[96px] h-[60px] flex justify-between items-center p-4 w-full">
          <ChevronLeft
            onClick={() => {
              router.back();
            }}
            className="w-5 h-5 cursor-pointer text-main"
          />
          <TopNav />
        </div>

        <div className="p-4 text-sm space-y-4">
          <FormItem>
            <label className="py-2 text-sm text-[#666666]">Blog Title</label>
            <input
              type="text"
              value={blog.title}
              onChange={(e) =>
                setBlog((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Input blog title"
              className="w-full border border-[#D6DADE] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-sub text-sm"
            />
            {blog.errors.title && (
              <p className="text-red-500 text-xs">{blog.errors.title}</p>
            )}
          </FormItem>

          <FormItem>
            <label className="py-2 text-sm text-[#666666]">Blog Link</label>
            <input
              type="text"
              value={blog.blogLink}
              onChange={(e) =>
                setBlog((prev) => ({ ...prev, blogLink: e.target.value }))
              }
              placeholder="Input blog link"
              className="w-full border border-[#D6DADE] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-sub text-sm"
            />
            {blog.errors.blogLink && (
              <p className="text-red-500 text-xs">{blog.errors.blogLink}</p>
            )}
          </FormItem>

          <FormItem>
            <label className="py-2 text-sm text-[#666666]">Blog Cover</label>
            <div className="flex bg-[#FAFAFA] border py-3 relative border-[#D6DADE] rounded-md w-full items-center">
              <span
                className="bg-sub text-white flex items-center cursor-pointer text-sm gap-2 absolute right-1 px-2 py-2 font-semibold rounded-md"
                onClick={handleSelectImageClick}
              >
                <AiOutlineUpload className="w-6 h-6" /> Upload Image
              </span>
              <div className="flex items-center ml-2">
                {blog.blogImage ? (
                  <p className="text-black text-sm">{blog.blogImage.name}</p>
                ) : (
                  <p className="italic text-[#919BA7] text-sm">
                    Upload your blog cover here
                  </p>
                )}
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            {blog.errors.blogImage && (
              <p className="text-red-500 text-xs">{blog.errors.blogImage}</p>
            )}
          </FormItem>
          <Button
            type="button"
            onClick={createBlog}
            disabled={blog.loading}
            className="bg-main w-full text-white hover:bg-main/80"
          >
            {blog.loading ? (
              <span>
                <Loader2 className="animate-spin" />
              </span>
            ) : (
              "Create Blog"
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CreateBlog;
