import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

const PendingGrading = ({overviewLoad, projectOverview}:any) => {
  return (
    <div className="bg-white h-[370px] md:h-[650px] rounded-[8px] p-2 shadow-sm col-span-4">
      <h1 className="md:text-xl text-lg font-semibold mb-4">Pending Grading</h1>
      <div>
        <ScrollArea className="w-full h-[300px] md:h-[400px] rounded-md">
          <div>
            {overviewLoad ? (
              <span className="flex text-center justify-center items-center">
                <Loader2Icon className="animate-spin" />
                Loading...
              </span>
            ) : projectOverview && projectOverview.length > 0 ? (
              projectOverview.map((project: any, index: any) => {
                const userName = project?.student?.full_name;
                const initials = userName
                  ? userName.charAt(0).toUpperCase()
                  : "";
                return (
                  <Link
                    key={index}
                    href={`/students/${project?.student?.student_id}`}
                  >
                    <div className="flex items-center gap-3 md:gap-4 py-2 md:py-3 px-1 md:px-2 cursor-pointer hover:bg-main hover:text-white duration-150 ease-in-out bg-[#FBFBFB] my-2 rounded-[8px]">
                      <Avatar className="md:w-[55px] w-[40px] md:h-[55px] h-[40px] hover:bg-transparent hover:text-current">
                        <AvatarImage src={project?.student?.profile_photo} />
                        <AvatarFallback className="bg-white hover:bg-transparent hover:text-current">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <p className="md:text-base text-sm">
                        Project {project?.project?.title} submitted by{" "}
                        {project?.student?.full_name}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="text-center">No Pending Grading.</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PendingGrading;
