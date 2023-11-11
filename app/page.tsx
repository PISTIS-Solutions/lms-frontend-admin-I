import LandingCard from "@/components/side-comp/landing-card";
import NavigationBar from "@/components/side-comp/nav";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

import cap from "@/public/assets/svg/teacher.svg";
import user from "@/public/assets/svg/user.svg";
import book from "@/public/assets/svg/book.svg";
import girl from "@/public/assets/girl.png";
import boy from "@/public/assets/boy.png";
import cir from "@/public/assets/semi.png";
import cir2 from "@/public/assets/semi2.png";
import circle from "@/public/assets/circle.png";
import circle2 from "@/public/assets/circle2.png";
import TestimonialCard from "@/components/side-comp/testimony-card";

import avatar from "@/public/assets/avatar.png";
import Coursecard from "@/components/side-comp/course-card";

import ansible from "@/public/assets/course/ansible.png";
import cicd from "@/public/assets/course/cicd.png";
import dns from "@/public/assets/course/dns.png";
import docker from "@/public/assets/course/docker.png";
import git from "@/public/assets/course/git.png";
import gitops from "@/public/assets/course/gitops.png";

export default function Home() {
  return (
    <main className="">
      <div>
        <NavigationBar />
      </div>
      <section className="flex items-center bg-hero-back bg-no-repeat bg-cover h-screen px-10">
        <div className="">
          <h1 className="text-7xl text-white font-semibold mb-10">
            Empower Minds;
            <br />
            Ignite Futures
          </h1>
          <p className="text-2xl text-white">
            Comprehensive curriculum designed to equip students <br />
            with the latest technological skills
          </p>{" "}
          <Link href="/sign-in">
            <Button className="bg-sub hover:text-white text-xl font-medium py-[25px] px-[40px] mt-20">
              Start Learning
            </Button>
          </Link>
        </div>
      </section>
      <section className=" flex items-center px-10 justify-between bg-mid-back h-[117px] bg-no-repeat bg-cover">
        <div className="flex justify-between w-full">
          <p className="text-white text-2xl font-medium">30+ Students</p>
          <p className="text-white text-2xl font-medium">Expert Mentors</p>
          <p className="text-white text-2xl font-medium">20+ courses</p>
        </div>
      </section>
      <section className="flex items-center justify-around my-14">
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
      <section className="bg-[#FBFBFF] flex relative justify-between py-5 px-10 items-center">
        <Image
          src={cir}
          alt=""
          className="absolute bottom-0 left-16"
          priority
        />
        <Image src={cir2} alt="" className="absolute top-0 left-0" priority />
        <Image src={girl} alt="girl" priority className="z-10" />
        <div>
          <p className="text-2xl text-[#727272]">LEARNING EXPERIENCE</p>
          <p className="text-5xl font-semibold leading-snug py-4">
            A One-of-a-Kind <br />
            <span className="text-[#33CC99]">Experience</span> Customized <br />
            Just For You
          </p>
          <p className="text-2xl max-w-[639px]">
            Access to a mentor that provides individualized attention, tailoring
            their teaching style to your specific learning needs, strengths, and
            weaknesses.
          </p>
        </div>
      </section>
      <section className="bg-white relative flex justify-between py-5 px-10 items-center">
        <div>
          <p className="text-2xl text-[#727272]">EASY INTERFACE</p>
          <p className="text-5xl font-semibold leading-snug py-4">
            Easy To Use Online <br />
            Learning Platform To <br />
            <span className="text-main">Elevate</span> Your Skills
          </p>
          <p className="text-2xl max-w-[639px]">
            Access to a mentor that provides individualized attention, tailoring
            their teaching style to your specific learning needs, strengths, and
            weaknesses.
          </p>
        </div>
        <Image
          src={circle}
          alt=""
          className="absolute top-0 right-0"
          priority
        />
        <Image
          src={circle2}
          alt=""
          className="absolute bottom-0 right-16"
          priority
        />
        <Image src={boy} className="z-10" alt="girl" priority />
      </section>
      <section className="bg-[#FAFAFD] ">
        <div className="py-7">
          <p className="text-[#7d7d7d] text-2xl font-medium text-center">
            TESTIMONIALS
          </p>
          <h1 className="text-4xl text-center font-bold">
            What Our Students Say
          </h1>
        </div>
        <div className="flex justify-around py-16 items-center">
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
        <h1 className="mb-5 text-4xl text-center font-bold">
          Our Popular courses
        </h1>
        <div className="relative mx-40">
          <div className="grid grid-cols-3 gap-[16px]">
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
              header="Domain Namse System"
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
          <Button className="py-[18px] px-[20px] absolute right-10 mt-8 hover:text-white bg-sub text-black text-2xl">
            Find Out More
          </Button>
        </div>
      </section>
      <footer className="mt-5 px-10 py-20 flex justify-center items-center">
        <div className="bg-footer-back max-w-[1280px] flex flex-col justify-center items-center p-10 h-[571px]">
          <h1 className="text-5xl font-semibold text-white text-center">
            Sign Up Now To Start Learning
          </h1>
          <p className="text-2xl text-center text-white py-5">
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
