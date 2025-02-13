import styles from '@/styles/modules/request/post_request.module.css'
import { Request } from '@/types/request';
import { User } from '@/types/user';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import SelectTags from '../select_tags';
import { useState } from 'react';

export default function PostRequest()
{
    const {data:session} = useSession();

    const [request, setRequest] = useState<Request>({id:'',title:'', description:'', created:'',userId:'',fileUrl:'',projectId:'',tags:[]});

    const setTagsHandler = (tags:string[]) =>
    {
        request.tags = tags;
    }


    const onSubmitHandler = async (e:any) =>
    {
        // e.preventDefault();

        console.log(e.target[3]);
        

        const user =session?.user as User
        if(!user) return;
        
        const title = e.target[0].value;
        const description = e.target[1].value;
        if(title === '' || description === '') return;
        
        const created = new Date().toUTCString();
        const userId = user.id;
        const projectId = '';

        
        request.id = user.id+'-'+new Date().toUTCString().replaceAll(' ', '-');
        request.title = title;
        request.description = description;
        request.created = created;
        request.userId = userId;
        request.fileUrl = '';
        request.projectId = projectId;

        // const request:Request = 
        // {
        //     id:,
        //     title,
        //     description,
        //     created,
        //     userId,
        //     fileUrl:'',
        //     projectId,
        //     tags:["3D", "2D", "Animation"]
        // }
        console.log(request);
        
        // const result = await axios.post('http://localhost:3000/api/request/add',{request,session})
        // console.log(result);


    }


    return (
        <div>
        {session && (

            <div className={styles.main}>
                <form action="" onSubmit={onSubmitHandler}>
                    <input type="text" id="request_title"/>
                    <textarea id="new_request" />
                    <input type="file" id="request_file"/>
                    <SelectTags setTagsHandler={setTagsHandler}/>
                    <input type="submit" value="Submit"/>
                </form>
            {/* <button onClick={() => onSubmitHandler()}>SEND</button> */}
            </div>
        )}
        </div>
    )
}