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
            Swal.fire("success","Welcome","success")
        }
        else{
             Swal.fire("error","Sorry","error")
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
