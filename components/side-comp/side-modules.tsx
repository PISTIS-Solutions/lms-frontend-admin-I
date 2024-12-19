import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

const SideModules = ({
  courseRead,
  selectedModuleId,
  handleItemClick,
  handleModal,
  noEdit,
}: any) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("admin_role");
    setRole(userRole);
  }, []);

  return (
    <div className="bg-white rounded-[8px] my-2 md:my-0 p-2 lg:col-span-3 col-span-10 shadow-sm">
      <div className="flex justify-between mb-4 gap-2 items-center">
        <p className="text-main text-base md:text-lg font-semibold">Modules</p>
        {noEdit ? (
          (role === "advanced" || role === "super_admin") && (
            <span
              onClick={handleModal}
              className="flex items-center gap-1 bg-sub py-3 hover:bg-white hover:border hover:border-sub hover:text-sub cursor-pointer px-3 text-white rounded-[8px] font-medium"
            >
              <Plus />
              <p className="hidden text-base md:block">Add a new module</p>
            </span>
          )
        ) : (
          <></>
        )}
      </div>
      {courseRead?.modules?.map((module: any, index: number) => (
        <div
          key={module.id}
          className={`py-3 px-4 cursor-pointer ${
            module.id === selectedModuleId ? "bg-main text-white" : ""
          }`}
          onClick={() => handleItemClick(module.id)}
        >
          <div className="flex items-center">
            <span className="mr-2 font-bold">{index + 1}.</span>
            <h2 className="md:text-lg text-sm font-medium">
              {module.module_title}
            </h2>
          </div>
          {/* <p
            className={`md:text-sm text-xs font-normal ${
              module.id === selectedModuleId ? "block" : "hidden"
            }`}
          >
            {module.module_sub_title}
          </p> */}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SideModules;
