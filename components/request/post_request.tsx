import styles from '@/styles/modules/request/post_request.module.css'
import { RequestType } from '@/types/request';
import { UserType } from '@/types/user';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import SelectTags from '../select_tags';
import { TagType } from '@/types/tag';
import { RequestTagsType } from '@/types/request_tags';
import { useRouter } from 'next/router';

export default function PostRequest(props:any)
{
    const {data:session} = useSession();
    const router = useRouter();
    const {setOpen} = props;

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


        setOpen((prev:boolean) => !prev)
        router.reload();
    }


    return (
        <div>
        {session && (
                <form action="" onSubmit={onSubmitHandler} className={styles.main}>
                    <input type="text" id="request_title" placeholder='Title' className={styles.title}/>
                    <textarea id="new_request" className={styles.description}/>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <SelectTags setTagsHandler={setTagsHandler}/>
                        <input type="file" id="request_file" className={styles.file}/>
                    </div>
                    <input type="submit" value="Submit" className={styles.submit}/>
                </form>
        )}
        </div>
    )
}