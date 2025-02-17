import styles from '@/styles/modules/comment/comment.module.css'
import { CommentType } from "@/types/comment";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Comment(props:any)
{
    const {id} = props;
    const [comment, setComment] = useState<CommentType>();
    

    useEffect(() => 
    {
        const getComment = async () =>
        {
            const result = await axios.get('http://localhost:3000/api/comment/'+id).then(x => x.data);
            setComment(result.data);
        }

        getComment();

    }, [])

    console.log(comment?.ownerId);
    

    return (
        <div className={styles.main}>
            <p className={styles.message}>
                {comment?.message}
            </p>
            <p>{comment?.filename}</p>
            {comment?.filename && (
                <a href={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/`}>
                    <div className={styles.download}><i className="fa-solid fa-cloud-arrow-down"></i></div>
                </a>
            )}
        </div>
    )
}