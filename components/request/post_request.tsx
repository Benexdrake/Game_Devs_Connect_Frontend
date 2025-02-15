import styles from '@/styles/modules/request/post_request.module.css'
import { RequestType } from '@/types/request';
import { UserType } from '@/types/user';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import SelectTags from '../select_tags';
import { useState } from 'react';
import { TagType } from '@/types/tag';
import { RequestTagsType } from '@/types/request_tags';

export default function PostRequest(props:any)
{
    const {data:session} = useSession();

    let request:RequestType = {id:'',title:'', description:'', created:'',userId:'',fileUrl:'',projectId:''};
    let tags:TagType[] = []

    const setTagsHandler = (_tags:TagType[]) =>
    {
        tags = _tags;
    }


    const onSubmitHandler = async (e:any) =>
    {
        e.preventDefault();
        const user =session?.user as UserType
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


        const requestTags:RequestTagsType = {request,tags}

        const result = await axios.post('http://localhost:3000/api/request/add',{requestTags,session})
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
            </div>
        )}
        </div>
    )
}