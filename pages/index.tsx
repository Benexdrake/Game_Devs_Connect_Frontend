import LoginOutButton from "@/components/login_btn";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() 
{
  return (
    <>
      <LoginOutButton/>
    </>
  );
}