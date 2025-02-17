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

    return (
        <div className={styles.main}>
            {comment?.message}
        </div>
    )
}