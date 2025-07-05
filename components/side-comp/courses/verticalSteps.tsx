"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  path: string;
}

interface VerticalStepperProps {
  steps: Step[];
  activeColor?: string;
  inactiveColor?: string;
}

const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps,
  activeColor = "bg-sub",
  inactiveColor = "bg-[#BDBDBD]",
}) => {
  const pathname = usePathname();

  return (
    <div className="max-w-xs flex flex-col gap-10 relative">
      {steps.map((step, i) => {
        // ✅ Make active if current path starts with the step's path
        const isActive = pathname.startsWith(step.path);

        return (
          <div className="relative z-10" key={step.path}>
            <div className="flex items-center gap-5">
              <p
                className={cn(
                  "w-10 h-10 text-white rounded-full flex items-center justify-center flex-none",
                  isActive ? activeColor : inactiveColor
                )}
              >
                {i + 1}
              </p>
              <p
                className={cn(
                  "text-base font-medium whitespace-nowrap",
                  isActive ? "text-sub" : "text-[#BDBDBD]"
                )}
              >
                {step.label}
              </p>
            </div>

            {i < steps.length - 1 && (
              <div className="absolute left-5 top-[42px] h-10 w-px border-l border-dashed border-[#BDBDBD] z-0"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VerticalStepper;
