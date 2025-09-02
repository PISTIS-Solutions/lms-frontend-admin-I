"use client";
import SideNav from "@/components/side-comp/side-nav";
import TopNav from "@/components/side-comp/topNav";
import { Button } from "@/components/ui/button";
import { urls } from "@/utils/config";
// import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Cookies from "js-cookie";
import refreshAdminToken from "@/utils/refreshToken";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  CustomH2,
  code,
  customH3,
  customOL,
  customP,
  customTD,
  customTH,
  customUL,
  strong,
  customLink,
} from "@/utils/markdown";
import { createAxiosInstance } from "@/lib/axios";

interface blogT {
  id: string;
  title: string;
  blog_link: string;
  blog_picture: string | File;
  created_at: string;
  updated_at: string;
  description: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<blogT[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<blogT | null>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const axios = createAxiosInstance();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${urls.blog}`);
      // console.log(response.data, "blog res");
      if (response.status === 200) {
        setBlogs(response.data || []);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err: any) {
      toast.error(err.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const [delLoading, setDelLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const deleteBlog = async (id: string) => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");
      setDelLoading(true);
      const response = await axios.delete(`${urls.blog}${id}/`, {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });
      if (response.status === 204) {
        fetchBlogs();
        setShowDeleteModal(false);
      } else {
        toast.error("Delete blog: Something went wrong!");
      }
    } catch (error: any) {
     if (error?.message === "Network Error") {
        toast.error("Check your network!");
      } else if (error.response.data.detail === "Not found.") {
        toast.error("Course already deleted!");
      } else {
        toast.error(
          error?.response?.data?.detail || "Delete Failed: Something went wrong"
        );
      }
    } finally {
      setDelLoading(false);
    }
  };

  const editBlog = async () => {
    try {
      const adminAccessToken = Cookies.get("adminAccessToken");
      setEditLoading(true);
      const formData = new FormData();
      formData.append("title", editingBlog!.title);
      formData.append("blog_link", editingBlog!.blog_link);
      if (editingBlog!.blog_picture instanceof File) {
        formData.append("blog_picture", editingBlog!.blog_picture);
      }

      await axios.put(`${urls.blog}${editingBlog!.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminAccessToken}`,
        },
      });

      toast.success("Blog updated!");
      fetchBlogs();
      setShowEditModal(false);
    } catch (error: any) {
     if (error?.message === "Network Error") {
        toast.error("Check your network!");
      } else if (error.response.data.detail === "Not found.") {
        toast.error("Course already deleted!");
      } else {
        toast.error(
          error?.response?.data?.detail || "Edit Failed: Something went wrong"
        );
      }
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const getImageSrc = (img: string | File | null): string => {
    if (!img) return "/fallback.jpg";
    return img instanceof File ? URL.createObjectURL(img) : img;
  };

  return (
    <div className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />
      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[86px] h-[70px] flex md:justify-between justify-end px-3 items-center w-full md:px-7">
          <h2 className="font-medium text-[32px] text-[#484848] hidden md:inline">
            Blogs
          </h2>
          <TopNav />
        </div>

        <div>
          <div className="flex justify-end">
            <Link href="/blog/create-blog">
              <Button className="flex items-center mx-1 md:text-sm text-xs gap-x-1 cursor-pointer hover:border hover:border-sub bg-sub px-5 py-[13px] hover:bg-white hover:text-sub">
                <Plus size={20} />
                Create a new blog
              </Button>
            </Link>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-[300px] rounded-[16px]" />
              ))
            ) : blogs.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center text-center py-10">
                <p className="text-gray-500 text-sm md:text-base">
                  No blogs available yet. Create one to get started!
                </p>
              </div>
            ) : (
              blogs.map((blog: blogT) => (
                <div
                  onClick={() => router.push(`/blog/${blog.id}`)}
                  key={blog.id}
                  className="w-full relative cursor-pointer hover:shadow-md shadow-sm rounded-[16px]"
                >
                  <div className="absolute flex items-center gap-1 bg-white shadow-sm rounded-sm right-1 top-1">
                    <MdDelete
                      className="text-red-500 cursor-pointer w-5 h-5"
                      onClick={(e) => {
                        setBlogToDelete(blog.id);
                        setShowDeleteModal(true);
                        e.stopPropagation();
                      }}
                    />

                    <TbEdit
                      className="text-main cursor-pointer w-5 h-5"
                      onClick={(e) => {
                        setEditingBlog(blog);
                        setShowEditModal(true);
                        e.stopPropagation();
                      }}
                    />
                  </div>

                  <div className="rounded-[16px]">
                    <Image
                      width={100}
                      height={100}
                      alt={blog.title}
                      src={getImageSrc(blog.blog_picture)}
                      className="w-full h-[200px] rounded-[16px] object-cover"
                    />
                  </div>

                  <div className="p-3 flex flex-col gap-1.5">
                    <h2 className="text-main font-semibold text-lg">
                      {blog.title}
                    </h2>
                    <p className="text-[#666666] text-sm line-clamp-2">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h2: CustomH2,
                          h3: customH3,
                          ol: customOL,
                          p: customP,
                          ul: customUL,
                          th: customTH,
                          td: customTD,
                          strong: strong,
                          code: code,
                          a: customLink,
                        }}
                      >
                        {blog.description}
                      </ReactMarkdown>
                    </p>
                    <div>
                      <p className="text-main text-xs font-medium">
                        {new Date(blog.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Do you want to delete this blog?
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (blogToDelete) deleteBlog(blogToDelete);
                  // setShowDeleteModal(false);
                }}
                disabled={delLoading}
                className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {delLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && editingBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Blog
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={editingBlog.title}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blog Link
                </label>
                <input
                  type="text"
                  value={editingBlog.blog_link}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      blog_link: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const file = e.target.files[0];
                      setEditingBlog({
                        ...editingBlog,
                        blog_picture: file,
                      });
                    }
                  }}
                  className="w-full text-sm"
                />

                {editingBlog.blog_picture && (
                  <img
                    src={
                      editingBlog.blog_picture instanceof File
                        ? URL.createObjectURL(editingBlog.blog_picture)
                        : editingBlog.blog_picture
                    }
                    alt="Preview"
                    className="mt-2 h-24 w-full object-cover rounded-md"
                  />
                )}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={editBlog}
                  disabled={editLoading}
                  className="bg-main text-white hover:bg-main/80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
