"use client";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { SocialButtons } from "./SocialButton";

const LoginForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callback = params.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: params.get("callbackUrl") || "/",
      });

      if (result.ok) {
        Swal.fire("Success", "Welcome back!", "success");
        // router.push(callback);
        window.location.href = callback;
      } else {
        Swal.fire("Error", "Invalid email or password", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const handleAutoFill = () => {
    const form = document.querySelector("form");
    form.email.value = "kevin@gmail.com";
    form.password.value = "T@wsif";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <SocialButtons />

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link
              href={`/register?callbackUrl=${callback}`}
              className="link link-primary"
            >
              Register
            </Link>
          </p>

          <button onClick={handleAutoFill} type="submit" className="btn btn-primary w-full mt-5">
            Auto-Fill User Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
