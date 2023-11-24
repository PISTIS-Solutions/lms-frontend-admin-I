import Image from "next/image";
import React from "react";

import { AiFillStar } from "react-icons/ai";

interface Componentprops {
  image: any;
  header: String;
  title: String;
  modules: number;
}

const Coursecard = ({ image, header, title, modules }: Componentprops) => {
  return (
    <div className="md:w-[357px] w-[340px] cursor-pointer hover:scale-100 md:hover:scale-105 duration-75 ease-in-out shadow-md h-[351px] rounded-[16px] bg-white">
      <div>
        <Image
          src={image}
          alt="img"
          priority
          className=" rounded-tl-[16px] rounded-tr-[16px]"
        />
      </div>
      <div className="p-3 flex flex-col justify-between h-[160px]">
        <div>
          <h3 className="text-xl font-semibold">{header}</h3>
          <p className="md:text-lg text-base font-medium text-[#3E3E3E]">{title}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-main flex gap-x-1">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <p className="text-lg text-[#3E3E3E]">{modules} modules</p>
        </div>
      </div>
    </div>
  );
};

export default Coursecard;
