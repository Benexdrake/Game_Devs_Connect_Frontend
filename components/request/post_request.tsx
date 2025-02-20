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

export default function PostRequest(props:any)
{
    const {data:session} = useSession();
    const router = useRouter();
    const {setOpen} = props;

    
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
        if(title === '' || description === '') return;
        
        const created = new Date().toUTCString();
        const ownerId = user.id;

        let request:RequestType = {id:0,title, description, created, ownerId, fileid:0, projectId:''};


        if(e.target[2].files.length > 0)
        {
            const formData = new FormData();
            formData.append('file', e.target[2].files[0])
            formData.append('ownerId', (session.user as UserType).id)

            const response = await axios.post<APIResponse>(`http://localhost:3000/api/file/add`, formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(x => x.data);
            request.fileid = response.data;
        }
        
        const requestTags:RequestTagsType = {request,tags}
        const result = await axios.post<APIResponse>('http://localhost:3000/api/request/add',{requestTags, session}).then(x => x.data) // Result sollte API Response sein...
        
        setOpen((prev:boolean) => !prev)
        
        router.push('/')
    }

    return (
        <div>
        {session && (
            <>
                <div className={styles.background} onClick={() => setOpen((prev:boolean) => !prev)}></div>
                <form action="" onSubmit={onSubmitHandler} className={styles.main}>
                    <input type="text" id="request_title" placeholder='Title' className={styles.title}/>
                    <textarea id="new_request" className={styles.description}/>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <SelectTags setTagsHandler={setTagsHandler}/>
                        <input type="file" id="request_file" className={styles.file}/>
                    </div>
                    <input type="submit" value="Submit" className={styles.submit}/>
                </form>
            </>
        )}
        </div>
    )
}