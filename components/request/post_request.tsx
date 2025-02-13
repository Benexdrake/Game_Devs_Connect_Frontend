import styles from '@/styles/modules/request/post_request.module.css'
import { User } from '@/types/user';
import { useSession } from 'next-auth/react'

export default function PostRequest()
{
    const {data:session} = useSession();

    return (
        <div>
        {session && (

            <div className={styles.main}>
            {(session.user as User).username }
            </div>
        )}
        </div>
    )
}