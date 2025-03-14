import { UserType } from "@/types/user";
import Notification from "@/components/notification/notification";
import { getSession} from "next-auth/react";

import styles from '@/styles/modules/notification/notification_page.module.css'
import { getNotificationIds } from "@/services/notification_service";

export default function Notifications(props:any)
{
 const {notificationIds} = props
    return (
        <article>
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
        </article>
    )
}

export async function getServerSideProps(context:any)
{
    const session = await getSession(context)

    const user = (session?.user as UserType)
      
    const response = await getNotificationIds(user.id, true)
    
    return {
      props: {
        notificationIds: response.data
      }
    }
}