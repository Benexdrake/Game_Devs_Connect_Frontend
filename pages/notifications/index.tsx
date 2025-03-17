import { UserType } from "@/types/user";
import Notification from "@/components/notification/notification";
import { getSession, useSession} from "next-auth/react";

import styles from '@/styles/modules/notification/notification_page.module.css'
import { getNotificationIds } from "@/services/notification_service";

export default function Notifications(props:any)
{

  const {data:session} = useSession();

 const {notificationIds} = props
    return (
        <article>
          {session ? (
            <div>
            <div className={styles.header}>
              Notification
            </div>
            <div className={styles.notifications}>
            { notificationIds ? 
              notificationIds.map((id:string) => <Notification key={id} notificationId={id}/>)
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
                destination: '/',
                permanent: false
            }
        }
    }

    const user = (session?.user as UserType)
      
    const response = await getNotificationIds(user.id, false)
    
    return {
      props: {
        notificationIds: response.data
      }
    }
}