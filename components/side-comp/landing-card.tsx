import Image from "next/image";
import React from "react";

interface Componentprops {
  image: any;
  headText: String;
  bodyText: String;
}

const LandingCard = ({ image, headText, bodyText }: Componentprops) => {
  return (
    <div className="md:max-w-[416px] md:w-full w-auto h-[200px] md:min-h-[284px] flex flex-col justify-center p-5 bg-white shadow-md rounded-[16px]">
      <Image src={image} alt="img" className="w-10 h-10" />
      <div>
        <h1 className="md:text-2xl sm:text-xl text-lg py-5 font-semibold">{headText}</h1>
        <p className="md:text-lg sm:text-sm text-xs text-[#5E5E5E] font-medium">
          {bodyText}
        </p>
      </div>
    </div>
  );
};

export default LandingCard;
