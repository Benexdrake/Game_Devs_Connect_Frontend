import styles from '@/styles/modules/comment/new_comment.module.css'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CommentType } from '@/types/comment';
import { useSession } from 'next-auth/react';
import { UserType } from '@/types/user';
import { validateFileSize, validateText, validateTextAreaLines, validateTextLength } from '@/lib/validate';
import { addFileToS3 } from '@/services/s3_service';
import { addFile, deleteFile } from '@/services/file_service';
import { FileType } from '@/types/file';
import { addComment } from '@/services/comment_service';

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


        // Wenn file größer 0, sende erst an files/add
        // danach an aws/s3/add
        // und danach comment/add



        if(e.target[1].files.length > 0)
        {
            const formData = new FormData();
            formData.append('file', e.target[1].files[0])
            
            const file:FileType = {id:0, name:e.target[1].files[0].originalFilename, size:e.target[1].files[0].size, ownerId:comment.ownerId, created:new Date().toUTCString()}
            
            // Add File
            const responseFile = await addFile(file,true);
            if(!responseFile.status)
                return;

            // Add File to S3
            const responseS3 = await addFileToS3(formData, responseFile.data,true);

            if(!responseS3.status)
                await deleteFile(responseFile.data,true)

            comment.fileId = responseFile.data;
        }
        
        // // Senden des Comments an die API
        const response = await addComment(comment,true);

        if(!response.status)
            console.log(response.message);
            
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