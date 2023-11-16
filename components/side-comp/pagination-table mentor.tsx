"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PaginatedTableMentor = ({ handleMentors, handleStudent }: any) => {
  const data = [
    {
      name: "Jonny Wilson",
      email: "oliviawilson@gmail.com",
      course: "Basics of DevOps",
      location: "Abuja",
      monitor: "Segun Bankole",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@gmail.com",
      course: "Basics of DevOps",
      location: "Abuja",
      monitor: "Segun Bankole",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@gmail.com",
      course: "Basics of DevOps",
      location: "Abuja",
      monitor: "Segun Bankole",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@gmail.com",
      course: "Basics of DevOps",
      location: "Abuja",
      monitor: "Segun Bankole",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@gmail.com",
      course: "Basics of DevOps",
      location: "Abuja",
      monitor: "Segun Bankole",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@gmail.com",
      course: "Basics of DevOps",
      location: "Abuja",
      monitor: "Segun Bankole",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@gmail.com",
      course: "Basics of DevOps",
      location: "Abuja",
      monitor: "Segun Bankole",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@gmail.com",
      course: "Basics of DevOps",
      location: "Abuja",
      monitor: "Segun Bankole",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@gmail.com",
      course: "Basics of DevOps",
      location: "Abuja",
      monitor: "Segun Bankole",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@gmail.com",
      course: "Basics of DevOps",
      location: "Abuja",
      monitor: "Segun Bankole",
    },
  ];

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="bg-white p-2 overflow-x-scroll h-auto rounded-[8px] shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-lg md:text-xl">Database</h1>
        <div>
          <Button
            onClick={handleStudent}
            className="mr-2 bg-white border border-main text-main hover:text-white hover:bg-main hover:border-0"
          >
            Student
          </Button>
          <Button
            onClick={handleMentors}
            className="bg-main border border-main text-white hover:text-white hover:bg-main hover:border-0"
          >
            Mentor
          </Button>
        </div>
      </div>

      <table className="w-full overflow-x-scroll mt-2 text-center">
        <thead className="text-main">
          <tr className="bg-[#F8F9FF] py-2 w-full">
            <th className="md:py-4 md:text-base text-xs py-2">Name</th>
            <th className="md:py-4 md:text-base text-xs py-2">Email</th>
            <th className="md:py-4 md:text-base text-xs py-2">
              Current Course
            </th>
            <th className="md:py-4 md:text-base text-xs py-2">Location</th>
            <th className="md:py-4 md:text-base text-xs py-2">
              Assigned Monitor
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((person, index) => (
            <tr key={index}>
              <td className="py-2 md:text-base text-sm px-2 md:px-0 md:py-4">
                {person.name}
              </td>
              <td className="py-2 md:text-base text-sm px-2 md:px-0 md:py-4">
                {person.email}
              </td>
              <td className="py-2 md:text-base text-sm px-2 md:px-0 md:py-4">
                {person.course}
              </td>
              <td className="py-2 md:text-base text-sm px-2 md:px-0 md:py-4">
                {person.location}
              </td>
              <td className="py-2 md:text-base text-sm px-2 md:px-0 md:py-4">
                {person.monitor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-end gap-2 md:gap-5 mt-2">
        <div>
          <Button
            className="bg-transparent text-main cursor-pointer text-[10px] md:text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeft />
            Previous
          </Button>
        </div>
        <div className="flex space-x-2 md:space-x-4">
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
            className="bg-transparent text-main cursor-pointer text-[12px] md:text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
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

export default PaginatedTableMentor;
