import styles from '@/styles/modules/comment/comment.module.css'
import { CommentType } from "@/types/comment";
import { FileType } from '@/types/file';
import axios from "axios";
import { useEffect, useState } from "react";
import File from '../file/file';
import { APIResponse } from '@/types/api_response';

export default function Comment(props:any)
{
    const {id} = props;
    const [comment, setComment] = useState<CommentType>();

    useEffect(() => 
    {
        const getComment = async () =>
        {
            const result = await axios.get<APIResponse>('http://localhost:3000/api/comment/'+id).then(x => x.data);
            
            if(!result.status) return;

            setComment(result.data);
        }

        getComment();

    }, [])
    
    return (
        <div className={styles.main}>
            <p className={styles.message}>
                {comment?.message}
            </p>
            {comment && comment?.fileId !== 0 && (
                <File fileId={comment?.fileId}/>
            )}
        </div>
    )
}