import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

const ReviewedModal = ({ handleCloseModalApproved, person }: any) => {
  return (
    <div className="bg-white p-4 w-full mx-2 md:mx-0 md:w-1/3 h-5/6">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="md:text-2xl text-lg font-medium">Terraform</h1>
          <span
            onClick={handleCloseModalApproved}
            className="border-2 cursor-pointer border-main p-2 rounded-sm w-[32px] h-[32px] flex justify-center items-center"
          >
            <X className="text-main" />
          </span>
        </div>
        <div className="px-2.5 py-1 my-2 bg-[#E5FAF2] text-[#01A06B] rounded-[16px] w-[110px] text-center">
          <p>Reviewed</p>
        </div>
      </div>
      <div>
        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Submission link
          </h1>
          <p className="text-[#3E3E3E] text-base md:text-lg">{person.link}</p>
        </div>
        <div className="my-4">
          <h1 className="text-[#000066] text-xl font-medium">Files</h1>
          <p className="text-[#3E3E3E] text-base md:text-lg">
            No files attached
          </p>
        </div>
        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Student’s comment
          </h1>
          <p className="text-[#3E3E3E] text-base md:text-lg">
            In this course, I found it difficult to complete the project because
            I didn't understand this module well enough
          </p>
        </div>
        <div className="my-4">
          <h1 className="text-[#000066] text-base md:text-xl font-medium">
            Your comment
          </h1>
          <p className="text-[#3E3E3E] text-base md:text-lg">
            Checking the submission, you have done quite well in this module.
            Kindly pay closer attention while executing the projects moving
            forward
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="bg-sub hover:text-white text-black">Submit</Button>
      </div>
    </div>
  );
};

export default ReviewedModal;
