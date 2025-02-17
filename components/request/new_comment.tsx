import styles from '@/styles/modules/comment/new_comment.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CommentType } from '@/types/comment';
import { useSession } from 'next-auth/react';
import { UserType } from '@/types/user';

export default function NewComment(props:any)
{
    const {requestUserId, requestId, userId} = props

    const [textHeight, setTextHeight] = useState(35);

    const router = useRouter();

    const {data:session} = useSession();
    

    const onSubmitHandler = async (e:any) =>
    {
        e.preventDefault();

        const mainPath = `${requestUserId}/${requestId}/${userId}`

       
        const file = e.target[1].files[0]

      

        const comment:CommentType = {
            id:0,
            message:e.target[0].value,
            filename:file?.name || '',
            filePath:mainPath,
            ownerId:(session?.user as UserType).id,
            parentId:requestId, 
            deleted:false
        }

        
        
        // // Senden des Comments an die API
        const result = await axios.post('http://localhost:3000/api/comment/add', {comment, session}).then(x => x.data)
        console.log(result);
        
        if(file)
        {
            const formData = new FormData();
            formData.append('file', file)
            formData.append('path', `${mainPath}/${result.data}`)
            
            await axios.post(`http://localhost:3000/api/file`, formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(x => x.data)
        }

        router.reload();
    }

    const onChangeTextHandler = (e:any) =>
    {
        const lines = e.target.value.split('\n').length
        if(lines == 1)
            setTextHeight(35);   
        else
            setTextHeight(lines * 20 + 8);   
    }

    return (
        <div className={styles.main}>
            <form onSubmit={onSubmitHandler}>
                <textarea className={styles.message} style={{height:`${textHeight}px`}} onChange={onChangeTextHandler}></textarea>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <input type="file" name="" id="" />
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}