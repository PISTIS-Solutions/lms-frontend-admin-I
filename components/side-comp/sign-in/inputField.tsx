import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  icon: React.ElementType;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleIcon?: React.ElementType;
  onToggle?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  icon: Icon,
  placeholder,
  value,
  onChange,
  toggleIcon: ToggleIcon,
  onToggle,
}) => {
  return (
    <div>
      <label className="text-[#3E3E3E] md:text-xl text-base sm:text-sm">
        {label}
      </label>
      <div className="relative">
        <Icon className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
        <input
          type={type}
          className="py-4 bg-[#FAFAFA] text-xs md:text-base  placeholder:text-[#4F5B67] rounded-[6px] indent-9 w-full"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {ToggleIcon && (
          <ToggleIcon
            onClick={onToggle}
            className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
