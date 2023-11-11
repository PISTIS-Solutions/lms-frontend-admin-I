"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { data } from "@/app/data/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

const StudentsTable = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedStudent, setExpandedStudent] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

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
    <div>
      <table className="w-full mt-2 text-center">
        <thead className="text-main">
          <tr className="bg-[#F8F9FF] py-2 w-full">
            <th className="py-4">Full name</th>
            <th className="py-4">Email</th>
            <th className="py-4">Courses Completed</th>
            <th className="py-4">Phone Number</th>
            <th className="py-4">Plan</th>
            <th className="py-4">Access</th>
          </tr>
        </thead>
        <tbody className="relative">
          {currentData.map((person, index) => (
            <>
              <tr key={index}>
                <td
                  onClick={() => handleCardClick(person.id)}
                  className="py-4 cursor-pointer"
                >
                  {person.name}
                </td>
                <td className="py-4">{person.email}</td>
                <td className="py-4">{person.courseCompleted}</td>
                <td className="py-4">{person.phoneNumber}</td>
                <td className="py-4">{person.plan}</td>
                <td
                  className="py-4 cursor-pointer text-[#00173A] underline"
                  onClick={() => toggleStudentOptions(index)}
                >
                  Manage
                </td>
              </tr>

              {expandedStudent === index && (
                <div
                  className="bg-[#FFFFFF] p-2 w-60 rounded-[8px] shadow-md absolute right-0"
                  key={`options-${index}`}
                >
                  <h1 className="text-xl font-medium text-center pb-2">
                    Manage Access
                  </h1>
                  <hr />
                  <div>
                    <p className="text-lg py-1 text-left cursor-pointer">
                      Paid
                    </p>
                    <p className="text-lg py-1 text-left cursor-pointer">
                      Free
                    </p>
                    <p className="text-lg py-1 text-left cursor-pointer">
                      Revoke
                    </p>
                  </div>
                </div>
              )}
            </>
          ))}
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
