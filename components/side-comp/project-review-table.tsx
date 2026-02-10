"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import PendingModal from "./modal/pending-modal";
import ReviewedModal from "./modal/reviewed-modal";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ProjectReview = ({
  reviewLoad,
  projectReview,
  page,
  setPage,
  previous,
  fetchProjectReview,
}: any) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = projectReview.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projectReview.length / itemsPerPage);

  const nextPage = async () => {
    // setCurrentPage((prevPage) => prevPage + 1);
    setPage((prev: number) => prev + 1);
    // if (next !== null) {
    // }
  };
  const prevPage = () => {
    // if (previous !== null) {
    //   setCurrentPage((prevPage) => prevPage - 1);
    // }
    setPage((prev: number) => prev - 1);
  };

  // const goToPage = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const router = useRouter();

  const [selectedPerson, setSelectedPerson] = useState(null);
  const handleModal = (person: any) => {
    setSelectedPerson(person);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
    setOpenModal(false);
  };

  //for approved modal
  const [openModal, setOpenModal] = useState(false);

  const [selectedPersonApproved, setSelectedPersonApproved] = useState(null);
  const handleModalApproved = (person: any) => {
    setSelectedPersonApproved(person);
    setOpenModalApproved(true);
  };

  const handleCloseModalApproved = () => {
    setSelectedPersonApproved(null);
    setOpenModalApproved(false);
  };

  const [openModalApproved, setOpenModalApproved] = useState(false);
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className="overflow-x-scroll md:overflow-x-auto">
      <table className="w-full mt-2 text-left">
        <thead className="text-main">
          <tr className="bg-[#F8F9FF]">
            {[
              "Course Title",
              "Project Title",
              "Deadline",
              "Date Submitted",
              "Status",
              "Link",
            ].map((header) => (
              <th
                key={header}
                className="md:py-4 py-2 px-2 md:text-base text-xs font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="relative">
          {reviewLoad ? (
            <tr>
              <td colSpan={6} className="py-6 text-center">
                <Skeleton />
              </td>
            </tr>
          ) : currentData?.length > 0 ? (
            currentData.map((person: any) => (
              <tr
                key={person.id}
                className="hover:bg-[#F8F9FF]/60 transition-colors duration-150"
              >
                <td className="md:py-4 py-2 px-2 text-xs md:text-base capitalize">
                  {person?.course?.title || "-"}
                </td>

                <td className="md:py-4 py-2 px-2 text-xs md:text-base capitalize">
                  {person?.project?.title || "-"}
                </td>

                <td className="md:py-4 py-2 px-2 text-xs md:text-base">
                  {person.deadline ? formatDate(person.deadline) : "-"}
                </td>

                <td className="md:py-4 py-2 px-2 text-xs md:text-base">
                  {person.date_submitted
                    ? formatDate(person.date_submitted)
                    : "-"}
                </td>

                <td className="md:py-4 py-2 px-2 text-xs md:text-base">
                  <div
                    className={`flex items-center gap-x-2 capitalize ${
                      !person.status
                        ? "text-gray-600"
                        : person.status === "Submitted"
                        ? "text-orange-500"
                        : person.status === "Reviewed"
                        ? "text-green-500"
                        : person.status === "Rejected"
                        ? "text-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        !person.status
                          ? "bg-gray-600"
                          : person.status === "Submitted"
                          ? "bg-orange-500"
                          : person.status === "Reviewed"
                          ? "bg-green-500"
                          : person.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-gray-600"
                      }`}
                    />
                    {!person.status ? "No Submission" : person.status}
                  </div>
                </td>

                <td className="md:py-4 py-2 px-2 text-xs md:text-base text-main text-center">
                  {!person.status ? (
                    "-"
                  ) : person.status === "Submitted" ||
                    person.status === "Rejected" ? (
                    <button
                      onClick={() => handleModal(person)}
                      className="bg-[#F8F9FF] rounded-[24px] text-center px-4 py-1 w-[107px] cursor-pointer hover:bg-[#f0f1ff]"
                    >
                      Review
                    </button>
                  ) : person.status === "Reviewed" ? (
                    <button
                      onClick={() => handleModalApproved(person)}
                      className="bg-white border border-[#EEEEFB] rounded-[24px] text-center px-4 py-1 w-[107px] cursor-pointer hover:bg-[#f8f9ff]"
                    >
                      View
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500">
                No project reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex  items-center justify-end gap-1 mt-2">
        <div>
          <Button
            className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent text-sm md:text-base hover:text-main"
            onClick={prevPage}
            disabled={page === 1}
          >
            <FaAngleLeft className="w-5 h-5" />
            Previous
          </Button>
        </div>
        <div>
          <Button
            onClick={nextPage}
            className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent text-sm md:text-base hover:text-main"
            // disabled={currentData.length < 10}
          >
            <FaAngleRight />
            Next
          </Button>
        </div>
      </div>

      <div>
        {openModal && selectedPerson && (
          <div className="bg-slate-200/50 top-0 left-0 absolute flex justify-center items-center w-full h-screen">
            <PendingModal
              projectReview={projectReview}
              person={selectedPerson}
              handleCloseModal={handleCloseModal}
              fetchProjectReview={fetchProjectReview}
            />
          </div>
        )}
      </div>
      <div>
        {openModalApproved && selectedPersonApproved && (
          <div className="bg-slate-200/50 top-0 left-0 absolute flex justify-center items-center w-full h-screen">
            <ReviewedModal
              projectReview={projectReview}
              person={selectedPersonApproved}
              handleCloseModalApproved={handleCloseModalApproved}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectReview;
