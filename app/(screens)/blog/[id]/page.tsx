"use client";
import SideNav from "@/components/side-comp/side-nav";
import TopNav from "@/components/side-comp/topNav";
import { urls } from "@/utils/config";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { Loader2 } from "lucide-react";
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

interface blogT {
  id: string;
  title: string;
  blog_link: string;
  blog_picture: string;
  created_at: string;
  updated_at: string;
  description: string;
}

const GetBlogbyId = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [readBlog, setReadBlog] = useState<blogT>();

  const readBlogs = async () => {
    try {
      const response = await axios.get(`${urls.blog}${params?.id}/`);
      if (response.status === 200) {
        setReadBlog(response.data || {});
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    readBlogs();
  }, []);

  return (
    <div className="relative h-screen bg-[#FBFBFB]">
      <SideNav />
      <ToastContainer />

      <div className="lg:ml-64 ml-0 overflow-y-scroll h-screen">
        <div className="md:h-[86px] h-[70px] flex md:justify-between justify-end px-3 items-center w-full md:px-7 border-b bg-white sticky top-0 z-20">
          <h2 className="font-medium text-[24px] md:text-[32px] text-[#484848] hidden md:inline">
            {readBlog?.title || "Blog"}
          </h2>
          <TopNav />
        </div>
        <div className="max-w-4xl mx-auto p-5 md:p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p>Loading blog...</p>
            </div>
          ) : readBlog ? (
            <div className="space-y-6">
              <div className="w-full h-[250px] md:h-[400px] overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src={readBlog.blog_picture}
                  alt={readBlog.title}
                  width={1200}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                  {readBlog.title}
                </h1>
                <p className="text-main text-sm font-medium">
                  {new Date(readBlog.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="prose prose-gray max-w-none text-[15px] leading-relaxed text-gray-700">
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
                  {readBlog?.description}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <p>No blog found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetBlogbyId;
