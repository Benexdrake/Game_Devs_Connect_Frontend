import styles from '@/styles/modules/request/request.module.css'
import { RequestBlockType } from '@/types/request';
import { TagType } from '@/types/tag';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFullRequestById, likedRequest } from '@/services/request_services';

export default function RequestBlock(props:any)
{
    const {id, userId} = props;
    const [requestBlock, setRequestBlock] = useState<RequestBlockType>();
    const [like, setLike] = useState(false)
    const [fakeLike, setFakeLike] = useState(0);    

    const getData = async () =>
    {
        const response = await getFullRequestById(id, userId, true);
        
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

    const likedRequestHandler = async () =>
    {
        await likedRequest(requestBlock?.request.id+'', userId, !like, true)
        
        setLike(!like);
        setFakeLike(like? fakeLike -1 : fakeLike+1)
    }

    useEffect(() =>
    {
        getData();
    },[])

    const onClickLikeHandler = () =>
    {   
        likedRequestHandler();
    }
    
    return (
        <>
            {requestBlock?.user && requestBlock?.request && (
                <article className={styles.main}>
                    <div className={styles.username}>
                        {requestBlock.user.username}
                    </div>
                    <div className={styles.content}>
                        <div style={{display:'flex'}}>
                            <div>
                                <img className={styles.avatar} src={requestBlock.user.avatar} alt="" />
                            </div>
                            <div className={styles.content_text}>
                                <div style={{display:'flex', width:'100%', justifyContent:'space-between', marginBottom:'8px'}}>
                                    <h3 >{requestBlock.request.title}</h3>
                                    <p className={styles.date}>{new Date(requestBlock?.request?.created).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</p>
                                </div>
                                {requestBlock.request.description}
                            </div>
                        </div>
                        <div className={styles.tags}>
                        {requestBlock?.tags ? 
                                    requestBlock?.tags.map((tag:TagType) => ( 
                                        <span className={styles.tag} key={tag.name}>{tag.name}</span> 
                                    ))
                                    :
                                    <div></div>
                                }
                        </div>
                        <div className={styles.navbar}>
                            <Link href={`/request/${requestBlock?.request.id}`}> 
                                <div style={{color:'var(--color4)'}}><i className="fa-solid fa-comment"></i>
                                    {requestBlock?.count ? ' '+requestBlock?.count : ' 0'
                                }
                                </div>
                            </Link>
                        <div role='button' tabIndex={0} onClick={() => onClickLikeHandler()}><i className={`${like? "fa-solid": "fa-regular"} fa-heart`}></i> {requestBlock.likes + (fakeLike)}</div>
                        </div>


                    </div>

                    {/* <div>
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
                                {requestBlock?.tags ? 
                                    requestBlock?.tags.map((tag:TagType) => ( 
                                        <span className={styles.tag} key={tag.name}>{tag.name}</span> 
                                    ))
                                    :
                                    <div></div>
                                }
                            </div>
                        </Link>
                            
                        <div className={styles.navbar}>
                            <Link href={`/request/${requestBlock?.request.id}`}> 
                                <div><i className="fa-solid fa-comment"></i>
                                    {requestBlock?.count ? (
                                        ' '+requestBlock?.count
                                    )
                                    :
                                    <div> 0</div>
                                }
                                </div>
                            </Link>
                            <div><i className="fa-solid fa-share"></i> 1</div>
                            <div role='button' tabIndex={0} onClick={() => onClickLikeHandler()}><i className={`${like? "fa-solid": "fa-regular"} fa-heart`}></i> {requestBlock.likes + (fakeLike)}</div>
                            <div><i className="fa-solid fa-chart-simple"></i> 100</div>
                            {requestBlock?.request.fileId !== 0 && ( <div className={styles.download}> <File fileId={requestBlock?.request.fileId} /> </div> )}
                        </div>
                    </div> */}
                </article>
            )}
        </>
    )
}