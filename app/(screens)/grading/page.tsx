"use client";
import React, { useState } from "react";

import SideNav from "@/components/side-comp/side-nav";
// import { projectData } from "@/app/data/projectData";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PendingModal from "@/components/side-comp/modal/pending-modal";
import ReviewedModal from "@/components/side-comp/modal/reviewed-modal";
import TopNav from "@/components/side-comp/topNav";

const Grading = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  //for pending modal
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

  return (
    <main className="relative">
      <SideNav />
      <div className="ml-64  bg-[#F8F9FF] overflow-y-scroll h-screen">
        <div className="h-[96px] flex justify-between items-center bg-white shadow-md p-4 w-full">
          <h1 className="text-2xl font-medium">Grading</h1>
          <TopNav />
        </div>
        <div className="py-5 px-7">
          <div className="flex justify-between items-center">
            <div className="relative w-1/2">
              <Input
                type="text"
                placeholder="Search Course"
                className="placeholder:text-[#A2A2A2] text-black text-sm italic rounded-[8px] border border-main"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Search className="absolute top-2 right-1" />
            </div>
            <div className="">
              <select
                name="Sort by"
                className="py-3 rounded-[8px] cursor-pointer px-2 w-[180px]"
                id="sort"
                onChange={handleStatusChange}
                value={selectedStatus}
              >
                <option value="all" onClick={() => setSelectedStatus("")}>
                  Sort by
                </option>
                <option value="Submitted">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="No Submission">No Submission</option>
              </select>
            </div>
          </div>
          <div className="p-2 my-5">
            <table className="w-full mt-2 text-left">
              <thead className="text-main">
                <tr className="bg-[#F8F9FF] py-2 w-full">
                  <th className="py-4">Student name</th>
                  <th className="py-4">Course Title</th>
                  <th className="py-4">Deadline</th>
                  <th className="py-4">Date Submitted</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Link</th>
                </tr>
              </thead>
              {/* <tbody className="relative alternating-row-bg">
                {projectData
                  .filter((person) => {
                    const isMatchingSearch = person.name
                      .toLowerCase()
                      .includes(searchInput.toLowerCase());
                    const isMatchingStatus =
                      (selectedStatus === "Submitted" &&
                        person.status === "Submitted") ||
                      (selectedStatus === "reviewed" &&
                        person.status === "reviewed") ||
                      (selectedStatus === "No Submission" &&
                        (!person.status || !person.DateSubmitted)) ||
                      selectedStatus === "all";

                    return isMatchingSearch && isMatchingStatus;
                  })
                  .map((person, index) => (
                    <>
                      <tr key={index}>
                        <td
                          //   onClick={() => handleCardClick(person.id)}
                          className="py-4 capitalize cursor-pointer"
                        >
                          {person.name}
                        </td>
                        <td className="py-4 capitalize cursor-pointer">
                          {person.courseTitle}
                        </td>
                        <td className="py-4">{person.deadLine}</td>
                        <td className="py-4">
                          {!person.DateSubmitted ? "-" : person.DateSubmitted}
                        </td>
                        <td
                          className={`py-4 capitalize ${
                            !person.status
                              ? "text-gray-600"
                              : person.status === "Submitted"
                              ? "text-orange-500"
                              : person.status === "reviewed"
                              ? "text-green-500"
                              : "text-gray-600"
                          }`}
                        >
                          {!person.status ? "No Submission" : person.status}
                        </td>
                        <td className="py-4 text-main">
                          {!person.status ? (
                            "-"
                          ) : person.status === "Submitted" ? (
                            <p
                              onClick={() => handleModal(person)}
                              className="bg-[#F8F9FF] rounded-[24px] text-center p-1 w-[107px] cursor-pointer"
                            >
                              Review
                            </p>
                          ) : person.status === "reviewed" ? (
                            <p
                              onClick={() => handleModalApproved(person)}
                              className="bg-white border border-[#EEEEFB] rounded-[24px] text-center p-1 w-[107px] cursor-pointer"
                            >
                              View
                            </p>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody> */}
            </table>
          </div>
        </div>
      </div>
      <div>
        {openModal && selectedPerson && (
          <div className="bg-slate-200/50 top-0 absolute flex justify-center items-center w-full h-screen">
            <PendingModal
              person={selectedPerson}
              handleCloseModal={handleCloseModal}
            />
          </div>
        )}
      </div>
      <div>
        {openModalApproved && selectedPersonApproved && (
          <div className="bg-slate-200/50 top-0 absolute flex justify-center items-center w-full h-screen">
            <ReviewedModal
              person={selectedPersonApproved}
              handleCloseModalApproved={handleCloseModalApproved}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Grading;
