import React from "react";
import { useSessions } from "@/app/(screens)/dashboard/useDashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Loader2Icon,
  CalendarIcon,
  ClockIcon,
  StickyNoteIcon,
} from "lucide-react";
import dayjs from "dayjs";

const UpcomingSessions = () => {
  const { loading, sessions } = useSessions();

  return (
    <div className="bg-white rounded-[8px] p-4 shadow-sm col-span-3">
      <h1 className="md:text-xl text-lg font-semibold mb-4">
        Upcoming Sessions
      </h1>

      <ScrollArea className="w-full h-[230px] rounded-md">
        <div className="space-y-3">
          {loading ? (
            <span className="flex justify-center items-center text-gray-600">
              <Loader2Icon className="animate-spin mr-2" />
              Loading...
            </span>
          ) : sessions && sessions.length > 0 ? (
            sessions.slice(0, 4).map((session: any) => (
              <div
                key={session.id}
                className="p-3 border rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
              >
                <h2 className="font-semibold text-base text-gray-800">
                  {session.topic}
                </h2>
                <p className="text-sm text-gray-500 capitalize mb-2">
                  Status: <span className="font-medium">{session.status}</span>
                </p>

                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} />
                    <span>
                      Preferred:{" "}
                      {dayjs(session.preferred_date).format(
                        "MMM D, YYYY h:mm A"
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="opacity-70" />
                    <span>
                      Alternative:{" "}
                      {dayjs(session.alternative_date).format(
                        "MMM D, YYYY h:mm A"
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ClockIcon size={16} />
                    <span>{session.duration} mins</span>
                  </div>

                  {session.note && (
                    <div className="flex items-start gap-2">
                      <StickyNoteIcon size={16} />
                      <span>{session.note}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No Upcoming Sessions</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UpcomingSessions;
