import styles from '@/styles/modules/comment/comment.module.css'
import { CommentType } from "@/types/comment";
import { FileType } from '@/types/file';
import axios from "axios";
import { useEffect, useState } from "react";
import { APIResponse } from '@/types/api_response';
import { UserShortType } from '@/types/user';
import DownloadFile from '../file/download_file';

export default function Comment(props:any)
{
    const {id} = props;
    const [comment, setComment] = useState<CommentType>();
    const [user, setUser] = useState<UserShortType>();

    useEffect(() => 
    {
        const getComment = async () =>
        {
            const result = await axios.get<APIResponse>('http://localhost:3000/api/comment/'+id).then(x => x.data);
            
            if(!result.status) return;


             // User
            const resultUser = await axios.get<APIResponse>(`http://localhost:3000/api/user/short/${result.data.ownerId}`).then(x => x.data)
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
            
                <img className={styles.avatar} src={user?.avatar} alt="" />
                <div style={{width:'100%', paddingLeft:'8px'}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <p className={styles.username}>{user?.username}</p>
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