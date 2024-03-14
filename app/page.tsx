// import Image from "next/image";
// import Link from "next/link";
// import {
//   cap,
//   user,
//   book,
//   girl,
//   boy,
//   cir,
//   cir2,
//   circle,
//   circle2,
//   cicd,
//   dns,
//   docker,
//   git,
//   gitops,
//   TestimonialCard,
//   avatar,
//   ansible,
//   Coursecard,
//   LandingCard,
//   NavigationBar,
// } from "./index";

// import { Button } from "@/components/ui/button";

// export default function Home() {
//   return (
//     <main className="relative">
//       <div>
//         <NavigationBar />
//       </div>
//       <section className="flex items-center bg-hero-back bg-no-repeat bg-cover md:py-0 py-10 h-screen px-5 md:px-10">
//         <div className="">
//           <h1 className="text-6xl text-white md:block hidden font-semibold mb-10">
//             Empower Minds;
//             <br />
//             Ignite Futures
//           </h1>
//           <h1 className="text-5xl text-center md:hidden block text-white font-semibold mb-10">
//             Empower Minds; Ignite Futures
//           </h1>
//           <p className="text-2xl md:hidden block text-center md:text-left text-white">
//             Comprehensive curriculum designed to equip students with the latest
//             technological skills
//           </p>
//           <p className="md:text-2xl text-sm md:block hidden text-center md:text-left text-white">
//             Comprehensive curriculum designed to equip students <br />
//             with the latest technological skills
//           </p>
//           <Link href="/sign-in">
//             <Button className="bg-sub w-full md:w-auto hover:text-white text-black text-[20px] md:text-xl font-medium py-[25px] px-[40px] mt-20">
//               Start Learning
//             </Button>
//           </Link>
//         </div>
//       </section>
//       <section className=" flex items-center px-5 md:px-10 justify-between bg-mid-back h-[117px] bg-no-repeat bg-cover">
//         <div className="flex w-full md:justify-evenly justify-center divide-x-[4px]">
//           <p className="text-white text-xs md:text-2xl font-medium pr-4 md:pr-36">
//             30+ Students
//           </p>
//           <p className="text-white text-xs md:text-2xl font-medium px-4 md:px-36">
//             Expert Mentors
//           </p>
//           <p className="text-white text-xs md:text-2xl font-medium pl-4 md:pl-36">
//             20+ courses
//           </p>
//         </div>
//       </section>
//       <section className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 md:px-0 mx-2 items-center justify-around my-14">
//         <LandingCard
//           image={cap}
//           headText="Smooth learning experience"
//           bodyText="Leveraging on technology to optimize the learning process  for students"
//         />
//         <LandingCard
//           image={user}
//           headText="Experienced mentors"
//           bodyText="Bridging the gap between theory and practical application, providing real-world insights to learners"
//         />
//         <LandingCard
//           image={book}
//           headText="Relevant course content"
//           bodyText="To ensure maximum benefit, we curated course content that is both relevant and engaging"
//         />
//       </section>
//       <section className="bg-[#FBFBFF] flex lg:flex-row flex-col-reverse relative justify-center lg:justify-between py-5 px-5 md:px-10 items-center">
//         <Image
//           src={cir}
//           alt=""
//           className="absolute hidden md:block bottom-0 left-16"
//           priority
//         />
//         <Image
//           src={cir2}
//           alt=""
//           className="absolute hidden md:block top-0 left-0"
//           priority
//         />
//         <Image
//           src={girl}
//           alt="girl"
//           priority
//           className="z-10 md:w-auto w-1/2 max-w-[568px] h-auto"
//         />
//         <div>
//           <p className="md:text-2xl sm:text-xl text-sm text-[#727272] text-center md:text-left relative">
//             LEARNING EXPERIENCE
//           </p>
//           <p className="md:text-5xl text-xl sm:text-2xl text-center font-semibold leading-snug py-4 relative md:text-left">
//             A One-of-a-Kind <br />
//             <span className="text-[#33CC99]">Experience</span> Customized <br />
//             Just For You
//           </p>
//           <p className="md:text-2xl text-sm sm:text-lg max-w-[639px] relative text-center md:text-left">
//             Access to a mentor that provides individualized attention, tailoring
//             their teaching style to your specific learning needs, strengths, and
//             weaknesses.
//           </p>
//         </div>
//       </section>
//       <section className="bg-white relative lg:flex-row flex-col flex justify-center lg:justify-between py-5 px-5 md:px-10 items-center">
//         <div>
//           <p className="md:text-2xl sm:text-xl text-sm text-[#727272] text-center md:text-left relative">
//             EASY INTERFACE
//           </p>
//           <p className="md:text-5xl text-xl z-10 sm:text-2xl text-center font-semibold leading-snug py-4 relative md:text-left">
//             Easy To Use Online <br />
//             Learning Platform To <br />
//             <span className="text-main">Elevate</span> Your Skills
//           </p>
//           <p className="md:text-2xl z-10 text-sm sm:text-lg max-w-[639px] relative text-center md:text-left">
//             Access to a mentor that provides individualized attention, tailoring
//             their teaching style to your specific learning needs, strengths, and
//             weaknesses.
//           </p>
//         </div>
//         <Image
//           src={circle}
//           alt=""
//           className="absolute hidden md:block top-0 right-0"
//           priority
//         />
//         <Image
//           src={circle2}
//           alt=""
//           className="absolute hidden md:block bottom-0 right-16"
//           priority
//         />
//         <Image
//           src={boy}
//           className="z-10 md:w-auto w-1/2 max-w-[568px] h-auto"
//           alt="boy"
//           priority
//         />
//       </section>
//       <section className="bg-[#FAFAFD] ">
//         <div className="py-7">
//           <p className="text-[#7d7d7d] z-10 text-xs sm:text-lg md:text-2xl font-medium text-center">
//             TESTIMONIALS
//           </p>
//           <h1 className="md:text-4xl z-20 sm:text-xl text-lg  text-center font-bold">
//             What Our Students Say
//           </h1>
//         </div>
//         <div className="flex flex-wrap gap-5 justify-around py-16 px-2 items-center">
//           <TestimonialCard
//             avatar={avatar}
//             name="Sylvia Okoro"
//             quote="I can access my courses at any time, which means I can fit learning into my busy schedule"
//           />
//           <TestimonialCard
//             avatar={avatar}
//             name="Bayo Adegboyega"
//             quote="I've been using Pistis LMS for the past six months, and I can confidently say that it has transformed my learning experience"
//           />
//           <TestimonialCard
//             avatar={avatar}
//             name="David Gilbert"
//             quote="I've been using Pistis LMS for the past six months, and I can confidently say that it has transformed my learning experience."
//           />
//         </div>
//       </section>
//       <section className="py-20 bg-[#FDFBFB]">
//         <h1 className="mb-5 text-xl sm:text-2xl md:text-4xl text-center font-bold">
//           Our Popular courses
//         </h1>
//         <div className="relative mx-5 lg:mx-40">
//           <div className="grid px-2 grid-cols-1 md:grid-cols-2 place-items-center xl:grid-cols-3 gap-[16px]">
//             <Coursecard
//               image={ansible}
//               header="Ansible"
//               title="Simplifying automation"
//               modules={2}
//             />
//             <Coursecard
//               image={cicd}
//               header="CI/CD"
//               title="Continous Intergration and Development"
//               modules={2}
//             />
//             <Coursecard
//               image={dns}
//               header="Domain Name System"
//               title=""
//               modules={2}
//             />
//             <Coursecard image={docker} header="Docker" title="" modules={2} />
//             <Coursecard
//               image={git}
//               header="GIT"
//               title="Distributed version control system"
//               modules={2}
//             />
//             <Coursecard
//               image={gitops}
//               header="GITOPS"
//               title="Building a strong operational framework"
//               modules={2}
//             />
//           </div>
//           <Button className="py-[18px] px-[20px] md:absolute static right-10 mt-8 hover:text-white bg-sub text-black text-lg md:text-2xl">
//             Find Out More
//           </Button>
//         </div>
//       </section>
//       <footer className="mt-5 px-5 md:px-10 py-20 flex justify-center items-center">
//         <div className="bg-footer-back max-w-[1280px] flex flex-col justify-center items-center p-10 h-[571px]">
//           <h1 className="md:text-5xl text-xl sm:text-2xl font-semibold text-white text-center">
//             Sign Up Now To Start Learning
//           </h1>
//           <p className="md:text-2xl text-xs sm:text-base text-center text-white py-5">
//             Embark on a voyage of discovery, expand your horizons, and enrich
//             your mind by joining our community of eager learners. The doors to a
//             world of knowledge are swinging wide open, and it's time for you to
//             step through
//           </p>
//           <Button className="bg-sub text-black px-16 hover:text-white font-semibold">
//             Get Started
//           </Button>
//         </div>
//       </footer>
//     </main>
//   );
// }

"use client";

import React, { useState } from "react";
import Image from "next/image";

import logo from "@/public/assets/pistis_logo.png";
import { Eye, EyeOff, KeyRound, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLoginFormStore from "@/store/sign-in-store";
import axios from "axios";
import { urls } from "@/utils/config";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";

const SignIn = () => {
  const formStore = useLoginFormStore();
  const route = useRouter();
  const [loading, setLoading] = useState<boolean>();

  const onsubmitLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!containsSpecialCharacters(formStore.password)) {
        throw new Error("Password must contain special characters");
      }
      const url = urls.signin;

      // Make the API request
      const response = await axios.post(url, {
        email: formStore.email,
        password: formStore.password,
      });

      if (response.status === 200) {
        toast.success("Successfully Logged in!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        Cookies.set("adminAccessToken", response.data.access);
        Cookies.set("adminRefreshToken", response.data.refresh);
        Cookies.set("fullName", response.data.user.full_name);
        route.replace("/dashboard");
        setLoading(false);
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("Check your network!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      } else {
        toast.error(error?.response?.data?.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  function containsSpecialCharacters(str: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
    return specialCharacters.test(str);
  }

  return (
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <NextNProgress />
      <div className="bg-white w-[100%] sm:w-[50%] h-screen rounded-none md:rounded-tl-[40px] md:rounded-bl-[40px] absolute right-0 flex flex-col justify-around px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
            Sign In
          </h1>
          <h3 className="md:text-2xl sm:text-lg text-base">
            Glad to have you back!
          </h3>
        </div>
        <ToastContainer />
        <div>
          <form onSubmit={onsubmitLogin} className="space-y-2">
            <div>
              <label className="text-[#3E3E3E] md:text-xl text-base sm:text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
                <input
                  type="email"
                  className="py-4 bg-[#FAFAFA] w-full text-xs md:text-base placeholder:text-[#4F5B67] rounded-[6px] indent-7"
                  placeholder="example@gmail.com"
                  value={formStore.email}
                  onChange={(e) => formStore.setField("email", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-[#3E3E3E] md:text-xl text-base sm:text-sm">
                Password
              </label>
              <div className="relative">
                <KeyRound className="mr-2 absolute md:top-5 top-4 text-[#4F5B67] left-3 h-5 w-5" />
                {formStore.showPassword ? (
                  <Eye
                    onClick={formStore.togglePassword}
                    className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                  />
                ) : (
                  <EyeOff
                    onClick={formStore.togglePassword}
                    className="ml-2 absolute cursor-pointer top-4 text-[#4F5B67] right-3 h-5 w-5"
                  />
                )}
                <input
                  type={formStore.showPassword ? "text" : "password"}
                  className="py-4 bg-[#FAFAFA] text-xs md:text-base  placeholder:text-[#4F5B67] rounded-[6px] indent-7 w-full"
                  placeholder="Password"
                  value={formStore.password}
                  onChange={(e) =>
                    formStore.setField("password", e.target.value)
                  }
                />
              </div>
            </div>
            <p className="text-[#3E3E3E] text-sm md:text-base text-right">
              <Link href="/sign-in/forgot-password">Forgot Password?</Link>
            </p>
            {!containsSpecialCharacters(formStore.password) && (
              <p className="text-red-500 text-sm text-center">
                Password must contain special characters
              </p>
            )}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#33CC99] py-4 flex justify-center items-center rounded-[8px] font-medium text-lg md:text-2xl text-black hover:text-white"
            >
              {loading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <>Sign In</>
              )}
            </button>
          </form>
        </div>
        {/* <div>
      <p className="text-center text-base md:text-lg font-normal ">
        Don't have an account?{" "}
        <Link className="text-main font-semibold" href="/create-account">
          Create Account
        </Link>
      </p>
    </div> */}
      </div>
    </main>
  );
};

export default SignIn;
