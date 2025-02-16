import styles from '@/styles/modules/request/request.module.css'
import { RequestType } from '@/types/request';
import { TagType } from '@/types/tag';
import { UserType } from '@/types/user';
import AWS from 'aws-sdk';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RequestBlock(props:any)
{
    const {id} = props;
    const [data, setData] = useState<any>()

    const request = data?.request;
    const user = data?.user as UserType;
    const title = data?.title;
    const tags = data?.tags;
    

    const getRequest = async () =>
    {
        const result = await axios.get(`http://localhost:3000/api/request/${id}`).then(x => x.data)
        if(result.status)
            setData(result.data);
    }

    useEffect(() =>
    {
        getRequest();
    },[])

    return (
        <article className={styles.main}>
            {request && (
            <>
                <div style={{display:'flex', padding:'16px 16px 8px 16px'}}>
                    <img className={styles.avatar} src={user?.avatar} alt="" />
                    <div style={{width:'100%', paddingLeft:'8px'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <p>{user?.username}</p>
                        {title && (<p>{title}</p>)}
                    </div>
                    <div style={{textAlign:'center', paddingBottom:'8px'}}>
                        <p>{request?.title}</p>
                    </div>

                    <div className={styles.content}><p>{request?.description}</p></div>
                    </div>
                </div>
                <div className={styles.tags}>
                    {tags && tags.map((tag:TagType) => (
                        <span className={styles.tag}>{tag.name}</span>
                    ))}

                    </div>
                <div className={styles.navbar}>
                <p>{new Date(data?.request?.created).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</p>
                    <div><i className="fa-solid fa-comment"></i> 12</div>
                    <div><i className="fa-solid fa-share"></i> 1</div>
                    <div><i className="fa-solid fa-heart"></i> 5</div>
                    <div><i className="fa-solid fa-chart-simple"></i> 100</div>
                    {request?.fileurl && (
                        <a href={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${user.id}/${request.id}/${request.fileurl}`}>
                            <div className={styles.download}><i className="fa-solid fa-cloud-arrow-down"></i></div>
                        </a>
                    )}
                </div>
            </>
            )}
        </article>
    )
}