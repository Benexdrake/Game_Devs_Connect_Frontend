import styles from '@/styles/modules/request/post_request.module.css'
import { RequestType } from '@/types/request';
import { UserType } from '@/types/user';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import SelectTags from '../select_tags';
import { TagType } from '@/types/tag';
import { RequestTagsType } from '@/types/request_tags';
import { useRouter } from 'next/router';
import { APIResponse } from '@/types/api_response';
import { validateFileSize, validateText, validateTextAreaLines, validateTextLength } from '@/lib/validate';
import { useState } from 'react';
import { addRequest } from '@/services/request_services';

export default function PostRequest(props:any)
{
    const {data:session} = useSession();
    const router = useRouter();
    const {setOpen} = props;

    const [textHeight, setTextHeight] = useState(35);

    
    let tags:TagType[] = []

    const setTagsHandler = (_tags:TagType[]) =>
    {
        tags = _tags;
    }


    const onSubmitHandler = async (e:any) =>
    {
        e.preventDefault();

        if(!session) return;
        
        const user =session?.user as UserType
        if(!user) return;
        
        const title = e.target[0].value;
        const description = e.target[1].value;

        if(!validateText(title))
        {
            alert('Please enter a Title')
            return;
        }

        if(!validateText(description))
        {
            alert('Please enter a Description')
            return;
        }
        const created = new Date().toUTCString();
        const ownerId = user.id;

        let request:RequestType = {id:0,title, description, created, ownerId, fileId:0, projectId:''};


        if(e.target[2].files.length > 0)
        {
            const formData = new FormData();
            formData.append('file', e.target[2].files[0])
            
            const response = await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/file/add?ownerId=${(session.user as UserType).id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    if(progressEvent.total)
                    {
                        const progress = Math.round((progressEvent.loaded / (progressEvent.total) * 100));
                        console.log(`Upload Fortschritt: ${progress}%`);
                    }
                }
            }).then(x => x.data);
            request.fileId = response.data;
        }
        
        const requestTags:RequestTagsType = {request,tags}
        await addRequest(requestTags, true);
        // await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/request/add`,requestTags).then(x => x.data)
        
        setOpen((prev:boolean) => !prev)
        
        router.push('/')
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

    const onTitleChangeHandler = (e:any) =>
    {
        if(!validateTextLength(e.target.value, 30))
        {
            e.target.value = e.target.value.slice(0, e.target.value.length - 1);
        }
    }

    return (
        <div>
        {session && (
            <>
                <div className={styles.background} onClick={() => setOpen((prev:boolean) => !prev)}></div>
                <form action="" onSubmit={onSubmitHandler} className={styles.main}>
                    <input type="text" id="request_title" placeholder='Title' className={styles.title} onChange={onTitleChangeHandler}/>
                    <textarea id="new_request" className={styles.description} style={{height:`${textHeight}px`}} onChange={onChangeTextHandler}/>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <SelectTags setTagsHandler={setTagsHandler}/>
                        <input type="file" id="request_file" className={styles.file} onChange={onFileChangeSize}/>
                    </div>
                    <input type="submit" value="Submit" className={styles.submit}/>
                </form>
            </>
        )}
        </div>
    )
}