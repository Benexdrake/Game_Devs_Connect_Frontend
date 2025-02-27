import { UserType } from "@/types/user";
import Notification from "@/components/notification/notification";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

import styles from '@/styles/modules/notification/notification_page.module.css'

export default function Notifications(props:any)
{
 const {notificationIds} = props
    return (
        <article>
          <div className={styles.header}>
            Notification
          </div>
          <div className={styles.notifications}>
            { notificationIds && notificationIds.map((id:string) => <Notification notificationId={id}/>)}
          </div>
        </article>
    )
}

export async function getServerSideProps(context:any)
{
    const session = await getSession(context)

    const user = (session?.user as UserType)

    const response = await axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notification/user/?id=${user.id}`).then(x => x.data);
    console.log(user);
    
    
    return {
      props: {
        notificationIds: response.data
      }
    }
}