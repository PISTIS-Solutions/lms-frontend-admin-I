import { Plus } from "lucide-react";
import React from "react";

const SideModules = ({
  courseRead,
  selectedModuleId,
  handleItemClick,
  handleModal,
  noEdit,
}: any) => {
  return (
    <div className="bg-white rounded-[8px] my-2 md:my-0 p-2 lg:col-span-3 col-span-10 shadow-sm">
      <div className="flex justify-between mb-4 items-center">
        <p className="text-main text-base md:text-lg font-semibold">Modules</p>
        {noEdit ? (
          <span
            onClick={handleModal}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <p className="text-main underline">Add</p>
            <Plus />
          </span>
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
