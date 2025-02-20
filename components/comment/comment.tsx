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
    const [file, setFile] = useState<FileType>();

    useEffect(() => 
    {
        const getComment = async () =>
        {
            const result = await axios.get<APIResponse>('http://localhost:3000/api/comment/'+id).then(x => x.data);
            
            if(!result.status) return;

            setComment(result.data);

            if(!result.data) return;

            const fileResult = await axios.get<APIResponse>(`http://localhost:3000/api/file/${result.data.fileId}`).then(x => x.data)
            
            console.log(fileResult.data);
            
            setFile(fileResult.data);
        }

        getComment();

    }, [])
    
    return (
        <div className={styles.main}>
            <p className={styles.message}>
                {comment?.message}
            </p>
            { file && ( <File file={file}/> )}
        </div>
    )
}