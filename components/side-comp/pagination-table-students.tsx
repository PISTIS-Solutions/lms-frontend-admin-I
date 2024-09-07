"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react";
import useStudentsStore from "@/store/fetch-students";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PaginatedTable = () => {
  const { students, loading, fetchStudents, next, previous } =
    useStudentsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const nextPage = async () => {
    const nextPageStudents = await fetchStudents(currentPage + 1);
    if (nextPageStudents?.length > 0) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const readStudent = (id: any) => {
    router.push(`/students/${id}`);
  };
  const renderStudents = () => {
    console.log(students);
    return students
      ?.filter((person: any) => person?.is_student)
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
            {person.location}
          </td>
          <td className="py-2 md:text-base text-sm px-2 md:px-0 md:py-4">
            {person.status}
          </td>
        </tr>
      ));
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
          ) : students && students.length > 0 ? (
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
        <Button
          className="bg-transparent text-main cursor-pointer text-[12px] md:text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
          onClick={prevPage}
          disabled={previous == null}
          // disabled={currentPage === 1}
        >
          <ArrowLeft />
          Previous
        </Button>
        <Button
          onClick={nextPage}
          className="bg-transparent text-main cursor-pointer text-[12px] md:text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
          disabled={next == null}
        >
          <ArrowRight />
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginatedTable;
