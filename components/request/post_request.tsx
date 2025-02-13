import styles from '@/styles/modules/request/post_request.module.css'
import { Request } from '@/types/request';
import { User } from '@/types/user';
import axios from 'axios';
import { useSession } from 'next-auth/react'

export default function PostRequest()
{
    const {data:session} = useSession();
    let file;
    let request_content = '';

    const onFileHandler = (e:any) =>
    {
        if(e.target.files)
            file = e.target.files[0]
    }

    const onTextChangeHandler = (e:any) =>
    {
        request_content = e.target.value;
    }

    const onSubmitHandler = async () =>
    {
        const request:Request = {id:'',title:'',description:request_content,created:new Date().toLocaleDateString(), userId:(session?.user as User).id, fileUrl:'', projectId:''}
        console.log(request);
        const result = await axios.post('http://localhost:3000/api/request/add',{request,session})
        console.log(result);
        
    }

    return (
        <div>
        {session && (

            <div className={styles.main}>
            <input type="text" id="request_title" />
            <textarea id="new_request" onChange={onTextChangeHandler}></textarea>
            <input type="file" id="request_file" onChange={onFileHandler}/>
            <button onClick={() => onSubmitHandler()}>SEND</button>
            </div>
        )}
        </div>
    )
}