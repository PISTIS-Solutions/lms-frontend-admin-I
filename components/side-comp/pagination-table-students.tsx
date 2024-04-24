"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react";
import useStudentsStore from "@/store/fetch-students";
import useStudentInfoStore from "@/store/read-student";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PaginatedTable = () => {
  const { students, loading, fetchStudents } = useStudentsStore();
  const { fetchStudentInfo } = useStudentInfoStore();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const studentsPerPage = 4;

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(students?.results?.length / studentsPerPage);

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

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const readStudent = (id: any) => {
    // fetchStudentInfo(id);
    router.push(`/students/${id}`);
  };

  const renderStudents = () => {
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = Math.min(startIndex + studentsPerPage, students.count);
    return students.results
      .filter(
        (person: any) => person.is_student && person.has_complete_onboarding
      )
      .slice(startIndex, endIndex)
      .map((person: any) => (
        <tr
          onClick={() => readStudent(person.id)}
          key={person.id}
          className="cursor-pointer"
        >
          <td className="py-2 md:text-base text-sm px-2 md:px-0 md:py-4">
            {person.full_name}
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
            {person.plan}
          </td>
        </tr>
      ));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <p
          key={i}
          onClick={() => handlePageClick(i)}
          className={
            i === currentPage
              ? "cursor-pointer font-semibold text-main"
              : "text-slate-400 cursor-pointer"
          }
        >
          {i}
        </p>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="bg-white overflow-x-scroll p-2 h-auto rounded-[8px] shadow-md">
      <div className="flex w-full justify-between items-center">
        <h1 className="font-medium text-base md:text-xl">Students Database</h1>
        <Link href="/students">
          <p className="underline md:text-base text-sm text-main">View all</p>
        </Link>
      </div>

      <table className="w-full mt-2 text-center">
        <thead className="text-main">
          <tr className="bg-[#F8F9FF] py-2 w-full">
            <th className="md:py-4 md:text-base text-sm px-2 md:px-0 py-2">
              Name
            </th>
            <th className="md:py-4 md:text-base text-sm px-2 md:px-0 py-2">
              Email
            </th>
            <th className="md:py-4 md:text-base text-sm px-2 md:px-0 py-2">
              Current Course
            </th>
            <th className="md:py-4 md:text-base text-sm px-2 md:px-0 py-2">
              Location
            </th>
            <th className="md:py-4 md:text-base text-sm px-2 md:px-0 py-2">
              Plan
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="py-4">
                <Loader2Icon className="animate-spin" /> Loading...
              </td>
            </tr>
          ) : students.results &&
            // students.results.is_student === true &&
            students.count > 0 ? (
            renderStudents()
          ) : (
            <tr>
              <td colSpan={5} className="py-4">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-end gap-2 md:gap-5 mt-2">
        <div>
          <Button
            className="bg-transparent text-main cursor-pointer text-[12px] md:text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeft />
            Previous
          </Button>
        </div>
        <div className="flex space-x-4">{renderPageNumbers()}</div>
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

export default PaginatedTable;
