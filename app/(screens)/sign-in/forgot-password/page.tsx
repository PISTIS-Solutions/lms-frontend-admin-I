"use client";
import React, { useState } from "react";
import Image from "next/image";

import logo from "../../../../public/assets/pistis_logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  Email: z.string().min(2, {
    message: "Input correct email address",
  }),
});

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
    },
  });

  const [Unsuccess, setUnsuccess] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const email = values.Email;
    try {
      const url =
        "https://pistis-lms-backend.onrender.com/api/v1/auth/users/student/reset_password/";
      await axios.post(url, { email });
      router.push("/sign-in/forgot-password/verify");
    } catch (error) {
      console.error("Error:", error);
      setUnsuccess(true);
    }

    //
  };

  return (
    <main className="bg-form-back h-screen w-full bg-no-repeat bg-cover relative">
      <div className="bg-white w-[50%] h-screen rounded-tl-[40px] rounded-bl-[40px] absolute right-0 flex flex-col gap-28 px-10">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="text-4xl font-semibold">Forgot Password?</h1>
          <h3 className="text-2xl">
            Please provide your registered email address
          </h3>
        </div>
        <div className="flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                        <Input
                          type="email"
                          className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] mb-10 rounded-[6px] indent-6"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                        {Unsuccess && <p className="text-red-500 font-bold">Unsuccessful</p>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-10 bg-[#33CC99] py-6 font-medium text-2xl text-black hover:text-white"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
