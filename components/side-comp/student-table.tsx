"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import useStudentsStore from "@/store/fetch-students";
import useStudentInfoStore from "@/store/read-student";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentsTable = () => {
  const { students, loading, fetchStudents } = useStudentsStore();
  const { response } = useStudentInfoStore();
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (students.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (students.previous) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(students?.count / 10);

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

  const readStudent = (id: any) => {
    if (response === 200) {
      router.push(`/students/${id}`);
    } else {
      toast.error("Check your network!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    }
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
          ) : students && students.count > 0 ? (
            students.results.map((person: any) => (
              <React.Fragment key={person.id}>
                <tr
                  onClick={() => {
                    // fetchStudentInfo(person.id);
                    readStudent(person.id);
                  }}
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
            disabled={!students.previous}
          >
            <ArrowLeft />
            Previous
          </Button>
        </div>
        <div className="flex space-x-4">{renderPageNumbers()}</div>
        <div>
          <Button
            onClick={nextPage}
            className="bg-transparent text-main cursor-pointer text-[14px] flex items-center gap-1 hover:bg-transparent hover:text-main"
            disabled={!students.next}
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
