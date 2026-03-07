"use client";
import Link from "next/link";
import { SocialButtons } from "./SocialButton";
import Swal from "sweetalert2";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { PostUser } from "@/actions/server/Auth";
import loginImg from "../../../public/assets/login-banner.png";
import Image from "next/image";

export const RegisterForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const HomeUrl = "/";
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm({ ...form, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const [form, setForm] = useState({
    NID: "",
    name: "",
    email: "",
    Number: "",
    image: "",
    password: "",

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await PostUser(form);
      
      if (result?.acknowledged) {
        const signInResult = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
          HomeUrl: HomeUrl,
        });
        if (signInResult.ok) {
          Swal.fire({
            title: "Success",
            text: "Registered successfully",
            icon: "success",
            confirmButtonColor: "oklch(62% 0.14 230)"
          });
          window.location.href = HomeUrl;
        }
      } else {
        Swal.fire({
          title: "Error",
          text: result?.message || "Registration failed",
          icon: "error",
          confirmButtonColor: "oklch(62% 0.14 230)"
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        confirmButtonColor: "oklch(62% 0.14 230)"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-0 md:gap-20 bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary">Create Account</h2>

          <form
               onSubmit={handleSubmit}
            className="space-y-3"
          >
            <input
              type="tel"
              name="NID"
              placeholder="NID no."
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="file"
              name="image"
              className="file-input"
              placeholder="Your Photo"
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="Number"
              placeholder="Contact No."
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>

          <SocialButtons />

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div>
        <Image src={loginImg} alt="Login Banner" width={500} height={500} className="hidden lg:block" />
      </div>
    </div>
  );
};
