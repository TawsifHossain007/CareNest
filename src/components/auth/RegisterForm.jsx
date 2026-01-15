"use client";
import Link from "next/link";
import { SocialButtons } from "./SocialButton";
import Swal from "sweetalert2";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { PostUser } from "@/actions/server/Auth";

export const RegisterForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") || "/";
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
    
    console.log("Form data before submit:", form);
    
    try {
      const result = await PostUser(form);
      console.log("PostUser result:", result);
      
      if (result?.acknowledged) {
        const signInResult = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
          callbackUrl: callbackUrl,
        });
        if (signInResult.ok) {
          Swal.fire("success", "Registered successfully", "success");
          router.push(callbackUrl);
        }
      } else {
        Swal.fire("error", result?.message || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire("error", "Something went wrong", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

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
    </div>
  );
};
