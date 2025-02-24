import { UserType } from "@/types/user";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

export default function Notifications(props:any)
{
 const {notificationIds} = props
    return (
        <div>
            { notificationIds && notificationIds.map((id:string) => <p>{id}</p>)}
        </div>
    )
}

export async function getServerSideProps(context:any)
{
    const session = await getSession(context)

    const user = (session?.user as UserType)

    const response = await axios.get('http://localhost:3000/api/notification/user/?id='+user.id).then(x => x.data);
    
    return {
      props: {
        notificationIds: response.data
      }
    }
}