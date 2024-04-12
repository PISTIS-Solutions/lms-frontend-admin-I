import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";



interface Componentprops {
  avatar: any;
  name: String;
  quote: String;
}

const TestimonialCard = ({ avatar, name, quote }: Componentprops) => {
  return (
    <main className="md:w-[409px] w-[345px] md:h-[276px] shadow-md relative rounded-[16px] p-4 bg-white">
      <Image
        src={avatar}
        alt="avatar"
        priority
        className="md:w-[108px] w-[80px] h-[80px] md:h-[108px] absolute right-5 -top-5"
      />
      <div>
        <h3 className="md:text-xl sm:text-lg text-sm font-semibold">{name}</h3>
        <div className="flex gap-x-1 text-main">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
      </div>
      <div>
        <p className="md:text-lg text-xs sm:text-base mt-10 text-[#3E3E3E]">“{quote}”</p>
      </div>
    </main>
  );
};

export default TestimonialCard;
