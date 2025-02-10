import LoginOutButton from "@/components/login_btn";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "@/types/user";
import { getToken } from "next-auth/jwt";


export default function Home() 
{

  return (
    <>
      <LoginOutButton/>
    </>
  );
}