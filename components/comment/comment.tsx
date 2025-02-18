import styles from '@/styles/modules/comment/comment.module.css'
import { CommentType } from "@/types/comment";
import { FileType } from '@/types/file';
import axios from "axios";
import { useEffect, useState } from "react";

export default function Comment(props:any)
{
    const {id} = props;
    const [comment, setComment] = useState<CommentType>();
    const [file, setFile] = useState<FileType>();
    

    useEffect(() => 
    {
        const getComment = async () =>
        {
            const result = await axios.get('http://localhost:3000/api/comment/'+id).then(x => x.data);
            
            if(result.status)
                {
                setComment(result.data);
                const fileResult = await axios.get(`http://localhost:3000/api/file/${result.data.request.fileId}`).then(x => x.data)
                if(fileResult === 0) return;
                
                setFile(fileResult.data);
            }
            
        }

        getComment();

    }, [])

    console.log(comment?.ownerId);
    

    return (
        <div className={styles.main}>
            <p className={styles.message}>
                {comment?.message}
            </p>
            { file && (
                <>
                    <a href={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${file.id}/${file.name}`}>
                        <div className={styles.download}>{file.name} - {(file.size / 1024 / 1024).toFixed(2)}MB</div>
                    </a>
                </>
            )}
        </div>
    )
}