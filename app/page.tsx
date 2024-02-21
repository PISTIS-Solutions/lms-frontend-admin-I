import Image from "next/image";
import Link from "next/link";

import {
  cap,
  user,
  book,
  girl,
  boy,
  cir,
  cir2,
  circle,
  circle2,
  cicd,
  dns,
  docker,
  git,
  gitops,
  TestimonialCard,
  avatar,
  ansible,
  Coursecard,
  LandingCard,
  NavigationBar,
} from "./index";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative">
      <div>
        <NavigationBar />
      </div>
      <section className="flex items-center bg-hero-back bg-no-repeat bg-cover md:py-0 py-10 h-screen px-5 md:px-10">
        <div className="">
          <h1 className="text-6xl text-white md:block hidden font-semibold mb-10">
            Empower Minds;
            <br />
            Ignite Futures
          </h1>
          <h1 className="text-5xl text-center md:hidden block text-white font-semibold mb-10">
            Empower Minds; Ignite Futures
          </h1>
          <p className="text-2xl md:hidden block text-center md:text-left text-white">
            Comprehensive curriculum designed to equip students with the latest
            technological skills
          </p>
          <p className="md:text-2xl text-sm md:block hidden text-center md:text-left text-white">
            Comprehensive curriculum designed to equip students <br />
            with the latest technological skills
          </p>
          <Link href="/sign-in">
            <Button className="bg-sub w-full md:w-auto hover:text-white text-black text-[20px] md:text-xl font-medium py-[25px] px-[40px] mt-20">
              Start Learning
            </Button>
          </Link>
        </div>
      </section>
      <section className=" flex items-center px-5 md:px-10 justify-between bg-mid-back h-[117px] bg-no-repeat bg-cover">
        <div className="flex justify-evenly w-full divide-x-[4px]">
          <p className="text-white text-sm md:text-2xl font-medium">
            30+ Students
          </p>
          <p className="text-white text-sm md:text-2xl font-medium pl-10">
            Expert Mentors
          </p>
          <p className="text-white text-sm md:text-2xl font-medium pl-10">
            20+ courses
          </p>
        </div>
      </section>
      <section className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 md:px-0 mx-2 items-center justify-around my-14">
        <LandingCard
          image={cap}
          headText="Smooth learning experience"
          bodyText="Leveraging on technology to optimize the learning process  for students"
        />
        <LandingCard
          image={user}
          headText="Experienced mentors"
          bodyText="Bridging the gap between theory and practical application, providing real-world insights to learners"
        />
        <LandingCard
          image={book}
          headText="Relevant course content"
          bodyText="To ensure maximum benefit, we curated course content that is both relevant and engaging"
        />
      </section>
      <section className="bg-[#FBFBFF] flex lg:flex-row flex-col-reverse relative justify-center lg:justify-between py-5 px-5 md:px-10 items-center">
        <Image
          src={cir}
          alt=""
          className="absolute hidden md:block bottom-0 left-16"
          priority
        />
        <Image
          src={cir2}
          alt=""
          className="absolute hidden md:block top-0 left-0"
          priority
        />
        <Image
          src={girl}
          alt="girl"
          priority
          className="z-10 md:w-auto w-1/2 max-w-[568px] h-auto"
        />
        <div>
          <p className="md:text-2xl sm:text-xl text-sm text-[#727272] text-center md:text-left relative">
            LEARNING EXPERIENCE
          </p>
          <p className="md:text-5xl text-xl sm:text-2xl text-center font-semibold leading-snug py-4 relative md:text-left">
            A One-of-a-Kind <br />
            <span className="text-[#33CC99]">Experience</span> Customized <br />
            Just For You
          </p>
          <p className="md:text-2xl text-sm sm:text-lg max-w-[639px] relative text-center md:text-left">
            Access to a mentor that provides individualized attention, tailoring
            their teaching style to your specific learning needs, strengths, and
            weaknesses.
          </p>
        </div>
      </section>
      <section className="bg-white relative lg:flex-row flex-col flex justify-center lg:justify-between py-5 px-5 md:px-10 items-center">
        <div>
          <p className="md:text-2xl sm:text-xl text-sm text-[#727272] text-center md:text-left relative">
            EASY INTERFACE
          </p>
          <p className="md:text-5xl text-xl z-10 sm:text-2xl text-center font-semibold leading-snug py-4 relative md:text-left">
            Easy To Use Online <br />
            Learning Platform To <br />
            <span className="text-main">Elevate</span> Your Skills
          </p>
          <p className="md:text-2xl z-10 text-sm sm:text-lg max-w-[639px] relative text-center md:text-left">
            Access to a mentor that provides individualized attention, tailoring
            their teaching style to your specific learning needs, strengths, and
            weaknesses.
          </p>
        </div>
        <Image
          src={circle}
          alt=""
          className="absolute hidden md:block top-0 right-0"
          priority
        />
        <Image
          src={circle2}
          alt=""
          className="absolute hidden md:block bottom-0 right-16"
          priority
        />
        <Image
          src={boy}
          className="z-10 md:w-auto w-1/2 max-w-[568px] h-auto"
          alt="boy"
          priority
        />
      </section>
      <section className="bg-[#FAFAFD] ">
        <div className="py-7">
          <p className="text-[#7d7d7d] z-10 text-xs sm:text-lg md:text-2xl font-medium text-center">
            TESTIMONIALS
          </p>
          <h1 className="md:text-4xl z-20 sm:text-xl text-lg  text-center font-bold">
            What Our Students Say
          </h1>
        </div>
        <div className="flex flex-wrap gap-5 justify-around py-16 px-2 items-center">
          <TestimonialCard
            avatar={avatar}
            name="Sylvia Okoro"
            quote="I can access my courses at any time, which means I can fit learning into my busy schedule"
          />
          <TestimonialCard
            avatar={avatar}
            name="Bayo Adegboyega"
            quote="I've been using Pistis LMS for the past six months, and I can confidently say that it has transformed my learning experience"
          />
          <TestimonialCard
            avatar={avatar}
            name="David Gilbert"
            quote="I've been using Pistis LMS for the past six months, and I can confidently say that it has transformed my learning experience."
          />
        </div>
      </section>
      <section className="py-20 bg-[#FDFBFB]">
        <h1 className="mb-5 text-xl sm:text-2xl md:text-4xl text-center font-bold">
          Our Popular courses
        </h1>
        <div className="relative mx-5 lg:mx-40">
          <div className="grid px-2 grid-cols-1 md:grid-cols-2 place-items-center xl:grid-cols-3 gap-[16px]">
            <Coursecard
              image={ansible}
              header="Ansible"
              title="Simplifying automation"
              modules={2}
            />
            <Coursecard
              image={cicd}
              header="CI/CD"
              title="Continous Intergration and Development"
              modules={2}
            />
            <Coursecard
              image={dns}
              header="Domain Name System"
              title=""
              modules={2}
            />
            <Coursecard image={docker} header="Docker" title="" modules={2} />
            <Coursecard
              image={git}
              header="GIT"
              title="Distributed version control system"
              modules={2}
            />
            <Coursecard
              image={gitops}
              header="GITOPS"
              title="Building a strong operational framework"
              modules={2}
            />
          </div>
          <Button className="py-[18px] px-[20px] md:absolute static right-10 mt-8 hover:text-white bg-sub text-black text-lg md:text-2xl">
            Find Out More
          </Button>
        </div>
      </section>
      <footer className="mt-5 px-5 md:px-10 py-20 flex justify-center items-center">
        <div className="bg-footer-back max-w-[1280px] flex flex-col justify-center items-center p-10 h-[571px]">
          <h1 className="md:text-5xl text-xl sm:text-2xl font-semibold text-white text-center">
            Sign Up Now To Start Learning
          </h1>
          <p className="md:text-2xl text-xs sm:text-base text-center text-white py-5">
            Embark on a voyage of discovery, expand your horizons, and enrich
            your mind by joining our community of eager learners. The doors to a
            world of knowledge are swinging wide open, and it's time for you to
            step through
          </p>
          <Button className="bg-sub text-black px-16 hover:text-white font-semibold">
            Get Started
          </Button>
        </div>
      </footer>
    </main>
  );
}
