import LoginOutButton from "@/components/login_btn";
import axios from "axios";
import { GetServerSidePropsContext } from "next";


export default function Home() 
{

  return (
    <>
      <LoginOutButton/>
    </>
  );
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{

    return {
        props: {

        }
    }
}