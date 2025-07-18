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
  count,
  next,
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
    if (next !== null) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const prevPage = () => {
    if (previous !== null) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
          <tr className="bg-[#F8F9FF] py-2 w-full">
            <th className="md:py-4 px-2 md:px-2 md:text-base text-xs py-2">
              Course Title
            </th>
            <th className="md:py-4 px-2 md:px-2 md:text-base text-xs py-2">
              Project Title
            </th>
            <th className="md:py-4 px-2 md:px-2 md:text-base text-xs py-2">
              Deadline
            </th>
            <th className="md:py-4 px-2 md:px-2 md:text-base text-xs py-2">
              Date Submitted
            </th>
            <th className="md:py-4 px-2 md:px-2 md:text-base text-xs py-2">
              Status
            </th>
            <th className="md:py-4 px-2 md:px-2 md:text-base text-xs py-2">
              Link
            </th>
          </tr>
        </thead>
        <tbody className="relative">
          {reviewLoad ? (
            <tr>
              <td colSpan={6} className="py-4">
                {/* <span className="flex items-center justify-center">
                  <Loader2Icon className="animate-spin" />
                  <p>Loading</p>
                </span> */}
                <Skeleton />
              </td>
            </tr>
          ) : currentData && currentData.length > 0 ? (
            currentData?.map((person: any, index: number) => (
              <>
                <tr key={index}>
                  <td className="md:py-4 px-2 md:px-2 md:text-base text-xs py-1 capitalize cursor-pointer">
                    {person?.course?.title}
                  </td>
                  <td className="md:py-4 px-2 md:px-2 md:text-base text-xs py-1 capitalize cursor-pointer">
                    {person?.project?.title}
                  </td>
                  <td className="md:py-4 md:text-base text-xs py-1">
                    {formatDate(person.deadline)}
                  </td>

                  <td className="md:py-4 text-left md:text-base text-xs py-1">
                    {!person.date_submitted
                      ? "-"
                      : formatDate(person.date_submitted)}
                  </td>
                  <td
                    className={`md:py-4 md:text-base text-left text-xs py-1 capitalize flex gap-x-2 items-center md:whitespace-nowrap ${
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
                    ></div>
                    {!person.status ? "No Submission" : person.status}
                  </td>
                  <td className="md:py-4 md:text-base px-2 text-xs py-1 text-main text-center">
                    {!person.status ? (
                      "-"
                    ) : person.status === "Submitted" ||
                      person.status === "Rejected" ? (
                      <p
                        onClick={() => handleModal(person)}
                        className="bg-[#F8F9FF] rounded-[24px]  text-center p-1 w-[107px] cursor-pointer"
                      >
                        Review
                      </p>
                    ) : person.status === "Reviewed" ? (
                      <p
                        onClick={() => handleModalApproved(person)}
                        className="bg-white border border-[#EEEEFB] rounded-[24px]  text-center p-1 w-[107px] cursor-pointer"
                      >
                        View
                      </p>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-4">
                No data available yet.
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
            disabled={previous === null}
          >
            <FaAngleLeft className="w-5 h-5" />
            Previous
          </Button>
        </div>
        <div>
          <Button
            onClick={nextPage}
            className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent text-sm md:text-base hover:text-main"
            disabled={next === null}
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
