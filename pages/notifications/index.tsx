import { UserType } from "@/types/user";
import Notification from "@/components/notification/notification";
import { getSession, useSession} from "next-auth/react";

import styles from '@/styles/modules/notification/notification_page.module.css'
import { getNotificationIds } from "@/services/notification_service";
import Head from "next/head";
import { SessionType } from "@/types/session";

export default function Notifications(props:any)
{

  const {data:session} = useSession();

 const {notificationIds} = props
    return (
        <article>
          <Head>
            <title>GDC - Notification</title>
          </Head>
          {session ? (
            <div>
            <div className={styles.header}>
              Notification
            </div>
            <div className={styles.notifications}>
            { notificationIds ? 
              notificationIds.map((id:string) => <Notification key={id} notificationId={id} token={(session as SessionType).accessToken}/>)
              :
              <div></div>
            }
        </div>
          </div>
          )
          :
          <div>
            
          </div>
        }
        </article>
    )
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

    const user = (session?.user as UserType)
      
    const response = await getNotificationIds(user.id)
    
    return {
      props: {
        notificationIds: response.data
      }
    }
}