import styles from '@/styles/modules/comment/comments.module.css'
import { useEffect, useState } from 'react'
import Comment from './comment';
import { getCommentIds } from '@/services/comment_service';

export default function Comments(props:any)
{
    const {parentId} = props;
    const [commentIds, setCommentIds] = useState<number[]>([])
    
    useEffect(() =>
    {
        const getComments = async () =>
        {
            const response = await getCommentIds(parentId)
            setCommentIds(response.data)
        }

        getComments();
    },[])


    return (
        <div className={styles.main}>
            {commentIds ? 
                commentIds.map(x => <Comment id={x} key={new Date().toLocaleDateString()}/>)
                :
                <div>
                    
                </div>
        }
        </div>
    )
}