"use client";
import React, { useEffect, useState } from "react";
import SideNav from "@/components/side-comp/side-nav";
import { ToastContainer } from "react-toastify";
import useSessionsList from "@/store/useSessionsList";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import dayjs from "dayjs";

const Sessions = () => {
  const { sessions, loading, fetchSessions, next, previous, count } =
    useSessionsList();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSessions(page);
  }, [page, fetchSessions]);

  return (
    <main>
      <SideNav />
      <ToastContainer />
      <div className="lg:ml-64 ml-0 p-4 bg-slate-50 h-screen overflow-y-auto">
        <h1 className="text-[#484848] text-2xl md:text-3xl font-medium">
          Sessions{" "}
          <span className="font-medium text-xl md:text-2xl text-[#666666]">
            (
            {loading ? (
              <Loader2 className="animate-spin inline-block" />
            ) : (
              count
            )}
            )
          </span>
        </h1>

        {loading ? (
          <p>Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p>No sessions available.</p>
        ) : (
          <table className="w-full whitespace-nowrap">
            <thead className="bg-[#E6F6FF]">
              <tr className="rounded-[6px]">
                <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                  Topic
                </th>
                <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                  Preferred Date
                </th>
                <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                  Alternative Date
                </th>
                <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                  Duration
                </th>
                <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                  Status
                </th>
                <th className="text-[#00173A] font-medium text-sm md:text-base text-left p-[6px_12px] md:p-[10px_16px]">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="p-[6px_12px] capitalize md:p-[10px_16px] text-[#666666] font-medium te xt-xs md:text-base">
                    {session.topic}
                  </td>
                  <td className="p-[6px_12px] capitalize md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                    {dayjs(session.preferred_date).format(
                      "D, MMMM, YYYY; hh:mma"
                    )}
                  </td>
                  <td className="p-[6px_12px] capitalize md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                    {dayjs(session.alternative_date).format(
                      "D, MMMM, YYYY; hh:mma"
                    )}
                  </td>

                  <td className="p-[6px_12px] capitalize md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                    {session.duration} mins
                  </td>
                  <td className="p-3 border-b capitalize">{session.status}</td>
                  <td className="p-[6px_12px] capitalize md:p-[10px_16px] text-[#666666] font-medium text-xs md:text-base">
                    {session.note || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            disabled={!previous}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className=" text-white disabled:text-white disabled:cursor-not-allowed cursor-pointer text-[14px] gap-1 hover:bg-transparent hover:text-main disabled:bg-[#D0D0D0] w-8 h-8 rounded-[4px] flex justify-center items-center"
          >
            <ChevronLeft />
          </button>
          <button
            disabled={!next}
            onClick={() => setPage((prev) => prev + 1)}
            className="text-white disabled:text-white disabled:cursor-not-allowed cursor-pointer text-[14px] gap-1 hover:bg-transparent hover:text-main disabled:bg-[#D0D0D0] w-8 h-8 rounded-[4px] flex justify-center items-center"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Sessions;
