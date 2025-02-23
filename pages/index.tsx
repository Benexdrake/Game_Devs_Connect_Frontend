import LoginOutButton from "@/components/login_btn";
import RequestBlock from "@/components/request/request";
import { UserType } from "@/types/user";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";

export default function Home(props:any) 
{
  const {data:session} = useSession();

  const {requestIds} = props;

  return (
    <>
      {session ?
      (
        <div>
          <div style={{display:'grid', gap:'8px'}}>
          { requestIds && requestIds.map((r:string) => {return <RequestBlock key={crypto.randomUUID()} id={r} userId={(session.user as UserType).id}/>})}
          </div>
        </div>
      )
      :
      (
        <LoginOutButton/>
      )}
    </>
  );
}

export async function getStaticProps()
{
  const requestIds = await axios.get('http://localhost:3000/api/request').then(x => x.data);

  return {
    props: {
      requestIds
    }
  }
}