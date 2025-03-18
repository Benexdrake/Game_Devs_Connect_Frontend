import Head from 'next/head'
import LoginOutButton from "@/components/login_btn";
import RequestBlock from "@/components/request/request";
import { getRequests } from "@/services/request_services";
import { UserType } from "@/types/user";
import { getSession, useSession } from "next-auth/react";

export default function Home(props:any) 
{
  const {data:session} = useSession();

  const {requestIds} = props;

  return (
    <>
      {session ?
      (
        <div>
          <Head>
            <title>GDC - Home</title>
          </Head>
          <div style={{display:'grid', gap:'16px'}}>
            { 
              requestIds ? requestIds.map((r:string) => 
                {
                  return <RequestBlock key={'request-'+requestIds} id={r} userId={(session.user as UserType).id}/>
                }) 
                :
                <div>
                  <h1>NO REQUESTS!!!</h1>
                </div>
            }
          </div>
        </div>
      )
      :
      (
        <div>Loading...</div>
      )}
    </>
  );
}

export async function getServerSideProps(context:any)
{

  const session = await getSession(context)
  
      if(!session)
      {
          return {
              redirect: {
                  destination: '/login',
                  permanent: false
              }
          }
      }

  const response = await getRequests();
  
  return {
    props: {
      requestIds: response.data
    }
  }
}