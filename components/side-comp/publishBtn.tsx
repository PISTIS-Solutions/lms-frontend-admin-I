"use client"
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import useCourseFormStore from "@/store/course-module-project";

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
    handleConditionalLogging(); // Call handleConditionalLogging on component mount or when filteredProjectDataStore changes
  }, [filteredProjectDataStore]);

  const handleConditionalLogging = () => {
    if (
      courseTitle &&
      description &&
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
        className="py-6 text-black w-full hover:text-white px-28 bg-sub mx-auto font-semibold"
      >
        {loading ? <Loader2Icon className="animate-spin" /> : "Publish"}
      </Button>
    </div>
  );
};

export default PublishBtn;
