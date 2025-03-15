import { getNotificationById, updateSeenNotification } from '@/services/notification_service';
import { getUserById } from '@/services/user_services';
import styles from '@/styles/modules/notification/notification.module.css'
import { NotificationType } from '@/types/notification';
import { UserType } from '@/types/user';
import { useEffect, useState } from 'react';

export default function Notification(props:any)
{
    const {notificationId} = props;
    const [notification, setNotification] = useState<NotificationType>()
    const [user, setUser] = useState<UserType>();

    const getNotification = async () =>
    {
        const response = await getNotificationById(notificationId, true)
        console.log(response);
        if(!response.status) return;
        const userResponse = await getUserById(response.data.ownerId ,true)
        
        setNotification(response.data);
        setUser(userResponse.data);
    }

    const seenNotification = async () =>
    {   
        if(notification && notification.seen === "")
        {
            await updateSeenNotification(notificationId, true)
        }
    }

    useEffect(() =>
    {
        getNotification();
    },[])

    seenNotification();

    return (
        <article className={styles.main} style={{border:notification?.seen === ""?'2px solid var(--color3)':'2px solid var(--color4)'}}>
            {notification && user && (
                <div className={styles.notification}>
                    <img className={styles.avatar} src={user.avatar} alt="" />
                    {notification.type === 1 && (
                        <p>{user.username} liked your Request</p>
                    )}
                    {notification.type === 2 && (
                        <p>{user.username} commented on your Request</p>
                    )}
                    {notification.type === 1 && (
                        <i className={`fa-solid fa-heart`}></i>
                    )}
                    {notification.type === 2 && (
                        <i className={`fa-solid fa-comment`}></i>
                    )}
                </div>
            )}
        </article>
    )
}