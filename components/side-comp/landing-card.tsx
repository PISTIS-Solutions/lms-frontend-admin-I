import Image from "next/image";
import React from "react";


interface Componentprops {
  image: any;
  headText: String;
  bodyText: String;
}

const LandingCard = ({ image, headText, bodyText }: Componentprops) => {
  return (
    <div className="w-[416px] h-[284px] flex flex-col justify-center p-5 bg-white shadow-md rounded-[16px]">
      <Image src={image} alt="img" />
      <div>
        <h1 className="text-2xl py-5 font-semibold">{headText}</h1>
        <p className="text-lg text-[#5E5E5E] font-medium">{bodyText}</p>
      </div>
    </div>
  );
};

export default LandingCard;
