import Image from "next/image";
import React from "react";


interface Componentprops {
  image: any;
  headText: String;
  bodyText: String;
}

const LandingCard = ({ image, headText, bodyText }: Componentprops) => {
  return (
    <div className="md:w-[416px] w-auto h-[200px] md:h-[284px] flex flex-col justify-center p-5 bg-white shadow-md rounded-[16px]">
      <Image src={image} alt="img" className="md:w-10 w-5 h-5 md:h-10" />
      <div>
        <h1 className="md:text-lg text-lg py-5 font-semibold">{headText}</h1>
        <p className="md:text-lg text-sm text-[#5E5E5E] font-medium">{bodyText}</p>
      </div>
    </div>
  );
};

export default LandingCard;
