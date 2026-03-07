"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

export const SocialButtons = () => {
    const params = useSearchParams()
    const handleSignIn = async() => {
        const result = await signIn("google", {  callbackUrl: params.get("callbackUrl") || "/",})
        if(result.ok){
            Swal.fire({
              title: "Success",
              text: "Welcome",
              icon: "success",
              confirmButtonColor: "oklch(62% 0.14 230)"
            })
        }
        else{
             Swal.fire({
              title: "Error",
              text: "Sorry",
              icon: "error",
              confirmButtonColor: "oklch(62% 0.14 230)"
            })
        }
    }
  return (
    <div className="flex gap-3 mt-4">
      <button
       onClick={handleSignIn}
        className="btn btn-outline btn-primary flex-1">
        <FaGoogle className="text-lg" />
        Google
      </button>
    </div>
  );
};
