import LoginOutButton from "@/components/login_btn";
import RequestBlock from "@/components/request/request";
import { getRequests } from "@/services/request_services";
import { UserType } from "@/types/user";
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
        <LoginOutButton/>
      )}
    </>
  );
}

export async function getServerSideProps()
{
  const response = await getRequests();
  
  return {
    props: {
      requestIds: response.data
    }
  }
}