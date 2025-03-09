import styles from '@/styles/modules/request/request.module.css'
import { RequestBlockType } from '@/types/request';
import { TagType } from '@/types/tag';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import File from '../file/download_file';
import { APIResponse } from '@/types/api_response';

export default function RequestBlock(props:any)
{
    const {id, userId} = props;
    const [requestBlock, setRequestBlock] = useState<RequestBlockType>();
    const [like, setLike] = useState(false)
    const [fakeLike, setFakeLike] = useState(0);

    const getData = async () =>
    {
        const response = await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/request/${id}?userId=${userId}`).then(x => x.data)
        
        if(!response.status) return;

        const count = response.data.commentIds;
        const user = response.data.user;
        const likes = response.data.likes;
        const request = response.data.request;
        const tags = response.data.tags;
        const liked = response.data.liked;
        
        setRequestBlock({request,tags, user, count, likes})
        if(liked)
            setLike(liked)
    }

    const likedRequest = async () =>
    {
        const response = await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/request/liked`, {requestId:requestBlock?.request.id, userId, liked:!like}).then(x => x.data);
        console.log({requestId:requestBlock?.request.id, userId, liked:!like});
        
        setLike(!like);
        setFakeLike(like? fakeLike -1 : fakeLike+1)
    }

    useEffect(() =>
    {
        getData();
    },[])

    const onClickLikeHandler = () =>
    {   
        likedRequest();
    }
    
    return (
        <>
            {requestBlock?.user && requestBlock?.request && (
                <article className={styles.main}>
                    <>
                        <Link href={`/request/${requestBlock?.request.id}`}>
                            <div style={{display:'flex', padding:'16px 16px 8px 16px'}}>
                                <Link href={`/profile/${requestBlock.user.id}`}>
                                    <img className={styles.avatar} src={requestBlock?.user?.avatar} alt="" />
                                </Link>
                                <div style={{width:'100%', paddingLeft:'8px'}}>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                <Link href={`/profile/${requestBlock.user.id}`}>
                                    <p className={styles.username}>{requestBlock?.user?.username}</p>
                                </Link>
                                    <p className={styles.date}>{new Date(requestBlock?.request?.created).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</p>
                                </div>
                                <div style={{textAlign:'center', paddingBottom:'8px'}}>
                                    <p className={styles.title}>{requestBlock?.request?.title}</p>
                                </div>    
                                <div className={styles.content}><p>{requestBlock?.request?.description}</p></div>
                                </div>
                            </div>
                            <div className={styles.tags}>
                                {requestBlock?.tags && requestBlock?.tags.map((tag:TagType) => ( <span className={styles.tag}>{tag.name}</span> ))}
                            </div>
                        </Link>
                            
                        <div className={styles.navbar}>

                            <Link href={`/request/${requestBlock?.request.id}`}> 
                                <div><i className="fa-solid fa-comment"></i>
                                    {requestBlock?.count && (
                                        requestBlock?.count
                                    )}
                                </div>
                            </Link>
                            <div><i className="fa-solid fa-share"></i> 1</div>
                            <div onClick={() => onClickLikeHandler()}><i className={`${like? "fa-solid": "fa-regular"} fa-heart`}></i> {requestBlock.likes + (fakeLike && fakeLike)}</div>
                            <div><i className="fa-solid fa-chart-simple"></i> 100</div>
                            {requestBlock?.request.fileId !== 0 && ( <div className={styles.download}> <File fileId={requestBlock?.request.fileId} /> </div> )}
                        </div>
                    </>
                </article>
            )}
        </>
    )
}