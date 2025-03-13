import styles from '@/styles/modules/comment/comment.module.css'
import { CommentType } from "@/types/comment";
import axios from "axios";
import { useEffect, useState } from "react";
import { APIResponse } from '@/types/api_response';
import DownloadFile from '../file/download_file';
import Link from 'next/link';
import { UserType } from '@/types/user';

export default function Comment(props:any)
{
    const {id} = props;
    const [comment, setComment] = useState<CommentType>();
    const [user, setUser] = useState<UserType>();

    useEffect(() => 
    {
        const getComment = async () =>
        {
            const result = await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/comment/${id}`).then(x => x.data);
            
            if(!result.status) return;


             // User
            const resultUser = await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/${result.data.ownerId}`).then(x => x.data)
            if(!resultUser.status) return;

            setComment(result.data);
            setUser(resultUser.data)
        }

        getComment();

    }, [])
    
    return (
        <article>
        <div className={styles.main}>
            <div style={{display:'flex', padding:'16px 16px 8px 16px'}}>
            <Link href={`/profile/${user?.id}`}>
                <img className={styles.avatar} src={user?.avatar} alt="" />
            </Link>
                <div style={{width:'100%', paddingLeft:'8px'}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <Link href={`/profile/${user?.id}`}>
                    <p className={styles.username}>{user?.username}</p>
                </Link>
                    <p className={styles.date}>{new Date(comment?.created as string).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</p>
                </div>    
                <div className={styles.content}><p>{comment?.message}</p></div>
                </div>
            </div>
        </div>
        <div className={styles.navbar}>
                {comment && comment?.fileId !== 0 && ( <div className={styles.download}> <DownloadFile fileId={comment?.fileId} /> </div> )}
            </div>
        </article>
    )
}