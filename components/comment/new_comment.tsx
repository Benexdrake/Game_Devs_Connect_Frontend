import styles from '@/styles/modules/comment/new_comment.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CommentType } from '@/types/comment';
import { useSession } from 'next-auth/react';
import { UserType } from '@/types/user';
import { APIResponse } from '@/types/api_response';
import { validateFileSize, validateText, validateTextAreaLines, validateTextLength } from '@/lib/validate';

export default function NewComment(props:any)
{
    const { requestId } = props

    const [textHeight, setTextHeight] = useState(35);

    const router = useRouter();

    const {data:session} = useSession();
    

    const onSubmitHandler = async (e:any) =>
    {
        e.preventDefault();

        if(!session) return;


        if(!validateText(e.target[0].value))
        {
            alert('Message is to short or missing!')
            return;
        }

        const comment:CommentType = {
            id:0,
            message:e.target[0].value,
            fileId:0, 
            ownerId:(session.user as UserType).id,
            parentId:requestId, 
            created: new Date().toUTCString(),
            deleted:false
        } 

        if(e.target[1].files.length > 0)
        {
            const formData = new FormData();
            formData.append('file', e.target[1].files[0])
            formData.append('ownerId', (session.user as UserType).id)
            
            const response = await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/file/add`, formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(x => x.data)
            comment.fileId = response.data;
        }
        
        // // Senden des Comments an die API
        await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/comment/add`, comment).then(x => x.data)

        // Send ne Notification after comment send and sending notification event
        
        router.reload();
    }

    const onChangeTextHandler = (e:any) =>
    {
        const lines = e.target.value.split('\n').length

        if(!validateTextLength(e.target.value, 2000))
        {
            e.target.value = e.target.value.slice(0, e.target.value.length - 1);
            return;
        }

        if(!validateTextAreaLines(lines, 20))
        {
            e.target.value = e.target.value.slice(0, e.target.value.length - 1);
            return;
        }

        if(lines == 1)
            setTextHeight(35);   
        else
            setTextHeight(lines * 20 + 8);   
    }

    const onFileChangeSize = (e:any) =>
    {
        if(!validateFileSize(e.target.files[0], 100*1024*1024))
        {
            alert('File size is to big, max 100Mb')
            e.target.value = '';
        }
    }

    return (
        <div className={styles.main}>
            <form onSubmit={onSubmitHandler}>
                <textarea className={styles.message} style={{height:`${textHeight}px`}} onChange={onChangeTextHandler}></textarea>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <input type="file" name="" id="" onChange={onFileChangeSize}/>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}