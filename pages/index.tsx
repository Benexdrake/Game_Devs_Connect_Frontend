import LoginOutButton from "@/components/login_btn";
import axios from "axios";

export default function Home() 
{

  return (
    <>
      <LoginOutButton/>
    </>
  );
}

export async function getServerSideProps(context:any)
{
    return {
        props: {

        }
    }
}