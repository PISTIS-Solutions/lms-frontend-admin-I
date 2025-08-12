"use client"
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import useCourseFormStore from "@/store/course-module-project";
import { MdArrowRightAlt } from "react-icons/md";

interface BtnTypes {
  loading: boolean;
  onContinue: any;
  upload: any;
  test: any;
}

const PublishBtn = ({ loading, onContinue, upload, test }: BtnTypes) => {
  const {
    filteredProjectDataStore,
    courseTitle,
    description,
    courseLink,
    filteredModuleDataStore,
  } = useCourseFormStore();

  useEffect(() => {
    handleConditionalLogging(); 
  }, [filteredProjectDataStore]);

  const handleConditionalLogging = () => {
    if (
      courseTitle &&
      courseLink &&
      filteredModuleDataStore.length > 0 &&
      filteredProjectDataStore.length > 0
    ) {
      upload();
    }
  };

  return (
    <div>
      <Button
        disabled={loading}
        onClick={(e) => {
          onContinue(e);
        }}
        className="bg-sub  text-white hover:bg-sub/90 w-full"
      >
        {loading ? <Loader2Icon className="animate-spin" /> : <div className="flex items-center gap-1">
          Publish Course
          <MdArrowRightAlt className="w-[16px] h-[12px]" />
          </div>}
      </Button>
    </div>
  );
};

export default PublishBtn;
