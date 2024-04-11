import { Plus } from "lucide-react";
import React from "react";

const SideModules = ({ courseRead, selectedIndex, handleItemClick }: any) => {
  return (
    <div className="bg-white rounded-[8px] my-2 md:my-0 p-2 col-span-3 shadow-sm">
      <div className="flex justify-between mb-4 items-center">
        <p className="text-main text-lg font-semibold">Modules</p>
        <span className="flex items-center gap-x-2 cursor-pointer">
          <p className="text-main underline">Add</p>
          <Plus />
        </span>
      </div>
      {courseRead?.modules?.map((module: any, index: any) => (
        <>
          <div
            key={module.id}
            className={`py-3 px-4 cursor-pointer ${
              index === selectedIndex ? "bg-main text-white" : ""
            }`}
            onClick={() => handleItemClick(index, module.id)}
          >
            <h2 className="md:text-lg text-sm font-medium">
              {index + 1}. {module.module_title}
            </h2>
            <p
              className={`md:text-sm text-xs font-normal ${
                index === selectedIndex ? "block" : "hidden"
              }`}
            >
              {module.module_sub_title}
            </p>
          </div>

          <hr />
        </>
      ))}
    </div>
  );
};

export default SideModules;
