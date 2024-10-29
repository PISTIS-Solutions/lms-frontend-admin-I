import Image, { StaticImageData } from "next/image";
import React from "react";

interface AuthImageContainerProps {
  bgImg: StaticImageData;
  quote: string;
  avatarName: string;
  avatarImage: StaticImageData;
}

const AuthImageContainer = ({
  avatarImage,
  avatarName,
  bgImg,
  quote,
}: AuthImageContainerProps) => {
  return (
    <div className=" w-[100%] lg:w-[50%] p-10  sticky top-0  pr-0 hidden lg:block">
      <div className="relative h-full">
        <Image
          src={bgImg}
          alt="auth image"
          className="w-full h-full object-fill "
        />

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-[20px]  text-white w-[78.8%] ml-[24px] mb-[24px] ">
          <div className="auth-border_gradient ">
            <blockquote className="mb-4 leading-relaxed font-sfProDisplay ">
              {quote}
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={avatarImage}
                  alt="avatar image"
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm"
                />
              </div>

              <p className="font-semibold text-2xl">{avatarName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImageContainer;
