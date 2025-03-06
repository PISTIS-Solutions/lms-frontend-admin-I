import Image from "next/image";
import logo from "@/src/assets/full-logo.png";
export default function Loading() {
  return (
    <div className=" bg-slate-50 flex justify-center items-center flex-col h-screen w-full">
      <Image src={logo} alt="loader image" className=" animate-pulse" />
      <p className="text-xl font-semibold text-main">Loading...</p>
    </div>
  );
}
