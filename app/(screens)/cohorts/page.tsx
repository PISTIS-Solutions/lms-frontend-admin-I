"use client";
import SideNav from "@/components/side-comp/side-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import { GoPlus } from "react-icons/go";
import { useOutsideClick } from "@/utils/outsideClick";
import NewCohorts from "@/components/side-comp/cohorts/AddNewCohorts";

const Cohorts = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedMentor, setSelectedMentor] = useState(null);

  // const nextPage = async () => {
  //   if (next !== null) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (previous !== null && currentPage > 1) {
  //     setCurrentPage((prevPage) => prevPage - 1);
  //   }
  // };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  // const [options, setOptions] = useState(null);

  // const toggleOptions = (index: any) => {
  //   setOptions(options === index ? null : index);
  // };

  // const mentorsRef = useRef<HTMLDivElement>(null);

  // useOutsideClick(mentorsRef, () => setOptions(null));
  const [createCohorts, setCreateCohorts] = useState(false);
  const handleAddCohorts = () => {
    setCreateCohorts((prev) => !prev);
  };

  return (
    <main>
      <SideNav />
      <ToastContainer />

      <div className="lg:ml-64 ml-0 overflow-y-scroll h-[100vh] sm:h-screen p-4 bg-slate-50">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-main text-2xl md:text-3xl font-medium">
              Live Sessions
              {/* <span className="font-medium text-xl md:text-2xl text-[#666666]">
              (
              {loadMentors ? (
                <Loader2 className="animate-spin inline-block" />
              ) : (
                count
              )}
              )
            </span> */}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    className=" object-cover"
                    // src={studentData?.profile_photo}
                  />
                  {/* <AvatarFallback>{initials}</AvatarFallback> */}
                </Avatar>
                {/* <div>
                {loading ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <div>
                    <h1 className="text-base text-main font-semibold">
                      {userName}
                    </h1>
                    <p className="text-[#666666] font-normal text-xs">
                      {studentData?.email}
                    </p>
                  </div>
                )}
              </div> */}
              </div>
            </div>
          </div>
          <div className="sm:flex block items-center gap-x-4 justify-between py-6">
            <div className="relative sm:w-1/2 w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search by session title"
                className=" rounded-[6px] indent-4 bg-slate-50 placeholder:text-[#9F9F9F] text-[#9F9F9F] text-sm font-normal p-[10px_12px] border-[#9F9F9F] w-full"
                // value={searchQuery}
                // onChange={handleSearch}
              />
              <IoIosSearch className="text-[#9F9F9F] absolute top-3 left-2 h-[20px] w-[20px]" />
            </div>
            <button onClick={handleAddCohorts} className="flex items-center gap-2 bg-sub rounded-[6px] py-2 px-4 text-white">
              <GoPlus /> Create a new cohort
            </button>
          </div>
        </div>
        <div className="w-full shadow-[0_0_20px_0_rgba(0,0,0,0.1)] bg-white rounded-[10px] p-4">
          <div className="flex items-center justify-between pb-5">
            <p className="text-[#484848] font-medium text-base md:text-lg">
              Live Session
            </p>
          </div>
          <div className="w-full overflow-x-scroll">
            <table className="min-w-full  table-auto">
              <thead className="bg-[#E6F6FF]">
                <tr className="rounded-[6px]">
                  <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Title
                  </th>
                  <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Start - End date
                  </th>
                  <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Duration
                  </th>
                  <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Cohort Status
                  </th>
                  <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                    Registration Status
                  </th>
                  <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">{``}</th>
                </tr>
              </thead>
              {/* <tbody className="relative">
                {loadMentors ? (
                  <tr>
                    <td colSpan={5} className="py-4">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  </tr>
                ) : mentors && mentors?.length > 0 ? (
                  <>
                    {mentors.map((person: any) => (
                      <>
                        <tr key={person.id}>
                          <td className="p-[6px_12px] capitalize md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                            {person.first_name} {person.last_name}
                          </td>
                          <td className="p-[6px_12px] md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                            {person.email}
                          </td>
                          <td className="p-[6px_12px] md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                            {person.phone_number}
                          </td>
                          <td
                            className={`${
                              person?.role?.toLowerCase() === "basic"
                                ? "text-[#02A1FF]"
                                : person?.role?.toLowerCase() === "super_admin"
                                ? "text-[#2FBC8D]"
                                : person?.role?.toLowerCase() === "advanced"
                                ? "text-[#FF1053]"
                                : "text-[#666666]"
                            } p-[6px_12px] md:p-[10px_16px] capitalize font-medium text-xs md:text-base flex items-center gap-1`}
                          >
                            <GoDotFill className="w-[6px] h-[6px]" />
                            {person.role.toLowerCase() === "super_admin"
                              ? "super admin"
                              : person.role}
                          </td>
                          <td className="p-[6px_12px] capitalize md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                            {person?.position === "frontend_dev"
                              ? "Frontend Developer"
                              : person?.position === "backend_dev"
                              ? "Backend Developer"
                              : person?.position === "faculty_lead"
                              ? "Faculty Lead"
                              : person?.position}
                          </td>
                          <td className="p-[6px_12px] md:p-[10px_16px] text-[#666666] w-6 h-6">
                            <IoEllipsisHorizontal
                              onClick={() => {
                                toggleOptions(person?.id);
                              }}
                              className="cursor-pointer w-6 h-6"
                            />
                          </td>
                        </tr>
                        {options === person?.id && (
                          <div
                            ref={mentorsRef}
                            className="bg-[#FFFFFF] w-[180px] absolute right-0 h-[69px] rounded-[4px] shadow-[0_0_24px_0_rgba(0,0,0,0.1)] p-2 flex flex-col justify-center "
                          >
                            <div
                              onClick={() => handleInfoModal(person)}
                              className="flex items-center gap-1 cursor-pointer text-[#484848]"
                            >
                              <PiUserCircleFill className="w-4 h-4" />
                              <p className="text-sm font-normal">
                                View Mentors Profile
                              </p>
                            </div>
                            <div
                              onClick={() => handleRejectModal(person)}
                              className="flex items-center gap-1 cursor-pointer text-[#FF0000]"
                            >
                              <IoIosExit className="w-4 h-4" />
                              <p className="text-sm font-normal">
                                Revoke Access
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center">
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody> */}
            </table>
            {/* <div className="flex items-center justify-end gap-2 mt-2">
              <div>
                <button
                  className=" text-white disabled:text-white disabled:cursor-not-allowed cursor-pointer text-[14px] gap-1 hover:bg-transparent hover:text-main disabled:bg-[#D0D0D0] w-8 h-8 rounded-[4px] flex justify-center items-center"
                  onClick={prevPage}
                  disabled={previous === null}
                >
                  <ChevronLeft />
                </button>
              </div>
              <div>
                <button
                  onClick={nextPage}
                  className="text-white disabled:text-white disabled:cursor-not-allowed cursor-pointer text-[14px] gap-1 hover:bg-transparent hover:text-main disabled:bg-[#D0D0D0] w-8 h-8 rounded-[4px] flex justify-center items-center"
                  disabled={next === null}
                >
                  <ChevronRight />
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {createCohorts && (
        <div className="w-full flex items-center justify-center h-screen absolute top-0 bg-[225_225_225_0.1] backdrop-blur">
          <NewCohorts handleAddCohorts={handleAddCohorts} />
        </div>
      )}
    </main>
  );
};

export default Cohorts;
