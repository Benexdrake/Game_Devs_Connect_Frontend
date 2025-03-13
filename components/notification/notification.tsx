import styles from '@/styles/modules/notification/notification.module.css'
import { APIResponse } from '@/types/api_response';
import { NotificationType } from '@/types/notification';
import { UserType } from '@/types/user';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Notification(props:any)
{
    const {notificationId} = props;
    const [notification, setNotification] = useState<NotificationType>()
    const [user, setUser] = useState<UserType>();

    const getNotification = async () =>
    {
        const response = await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notification/${notificationId}`).then(x => x.data);
        console.log(response);
        if(!response.status) return;
        const userResponse = await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/short/${response.data.ownerId}`).then(x => x.data)
        
        setNotification(response.data);
        setUser(userResponse.data);
    }

    const seenNotification = async () =>
    {   
        if(notification && notification.seen === "")
        {
            const response = await axios.put<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notification/seen/${notificationId}`).then(x => x.data);
            console.log('sssssssssss',response);
            
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