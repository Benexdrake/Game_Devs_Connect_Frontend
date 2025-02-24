import styles from '@/styles/modules/comment/comments.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Comment from './comment';

export default function Comments(props:any)
{
    const {parentId} = props;
    const [commentIds, setCommentIds] = useState<number[]>([])
    
    useEffect(() =>
    {
        const getComments = async () =>
        {
            const result = await axios.get('http://localhost:3000/api/comment/?id='+parentId).then(x => x.data)
            setCommentIds(result.data)
        }

        getComments();
    },[])


    return (
        <div className={styles.main}>
            {commentIds && commentIds.map(x => <Comment id={x}/>)}
        </div>
    )
}