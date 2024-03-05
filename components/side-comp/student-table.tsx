"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react";
import { data } from "@/app/data/data";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStudentsStore from "@/store/fetch-students";

const StudentsTable = () => {
  const { students, loading, fetchStudents } = useStudentsStore()
  useEffect(() => {
    fetchStudents();
  }, []);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedStudent, setExpandedStudent] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = students?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(students?.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const router = useRouter();

  const handleCardClick = (id: any) => {
    router.push(`/students/${id}`);
  };

  const toggleStudentOptions = (index: any) => {
    setExpandedStudent(expandedStudent === index ? null : index);
  };

  return (
    <div className=" overflow-x-scroll md:overflow-x-auto">
      <ToastContainer />
      <table className="w-full mt-2 text-center">
        <thead className="text-main">
          <tr className="bg-[#F8F9FF] py-2 w-full">
            <th className="md:py-4 md:text-base text-xs py-2">Full name</th>
            <th className="md:py-4 md:text-base text-xs py-2">Email</th>
            <th className="md:py-4 md:text-base text-xs py-2">
              Courses Completed
            </th>
            <th className="md:py-4 md:text-base text-xs py-2">Phone Number</th>
            <th className="md:py-4 md:text-base text-xs py-2">Plan</th>
            <th className="md:py-4 md:text-base text-xs py-2">Access</th>
          </tr>
        </thead>
        <tbody className="relative">
          {loading ? (
            <span className="flex text-center justify-center items-center">
              <Loader2Icon className="animate-spin" />
              Loading...
            </span>
          ) : students && students.length > 0 ? (
            currentData.map((person: any) => (
              <React.Fragment key={person.id}>
                <tr
                  onClick={() => handleCardClick(person.id)}
                  className="md:py-4 md:text-base text-xs py-2 px-3 md:px-0 cursor-pointer"
                >
                  <td>{person.full_name}</td>
                  <td>{person.email}</td>
                  <td>{person.courses_completed}</td>
                  <td>{person.phone_number}</td>
                  <td>{person.plan}</td>
                  <td
                    onClick={() => toggleStudentOptions(person.id)}
                    className="md:py-4 md:text-base text-xs px-3 md:px-0 py-2 cursor-pointer text-[#00173A] underline"
                  >
                    Manage
                  </td>
                </tr>

                {expandedStudent === person.id && (
                  <div
                    className="bg-[#FFFFFF] p-2 w-30 md:w-60 rounded-[8px] shadow-md absolute right-0"
                    key={`options-${person.id}`}
                  >
                    <h1 className="md:text-xl text-sm font-medium text-center pb-2">
                      Manage Access
                    </h1>
                    <hr />
                    <div>
                      <p className="md:text-lg text-xs py-1 text-left cursor-pointer">
                        Paid
                      </p>
                      <p className="md:text-lg text-xs py-1 text-left cursor-pointer">
                        Free
                      </p>
                      <p className="md:text-lg text-xs py-1 text-left cursor-pointer">
                        Revoke
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <p>No students available</p>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-end gap-5 mt-2">
        <div>
          <Button
            className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeft />
            Previous
          </Button>
        </div>
        <div className="flex space-x-4">
          {pageNumbers.map((page) => (
            <p
              key={page}
              onClick={() => goToPage(page)}
              className={
                page === currentPage
                  ? "cursor-pointer font-semibold text-main"
                  : "text-slate-400 cursor-pointer"
              }
            >
              {page}
            </p>
          ))}
        </div>
        <div>
          <Button
            onClick={nextPage}
            className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
            disabled={currentPage === totalPages}
          >
            <ArrowRight />
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
