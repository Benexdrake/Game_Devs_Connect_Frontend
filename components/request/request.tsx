import styles from '@/styles/modules/request/request.module.css'
import { RequestType } from '@/types/request';
import { UserType } from '@/types/user';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function RequestBlock(props:any)
{
    const {id, apiUrl} = props;
    const [data, setData] = useState<any>()

    const request = data?.request as RequestType;
    const user = data?.user as UserType;
    const title = data?.title;

    const getRequest = async () =>
    {
        const result = await axios.get(`${apiUrl}api/request/${id}`).then(x => x.data)
        if(result.status)
            setData(result.data);
    }

    useEffect(() =>
    {
        getRequest();
    },[])

    return (
        <article className={styles.main}>
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
                    <span className={styles.tag}>3D</span>
                    <span className={styles.tag}>2D</span>
                    <span className={styles.tag}>Model</span>
                    <span className={styles.tag}>Animation</span>
                </div>
            <div className={styles.navbar}>
            <p>{new Date(data?.request?.created).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</p>
                <div><i className="fa-solid fa-comment"></i> 12</div>
                <div><i className="fa-solid fa-share"></i> 1</div>
                <div><i className="fa-solid fa-heart"></i> 5</div>
                <div><i className="fa-solid fa-chart-simple"></i> 100</div>
                <div className={styles.download}><i className="fa-solid fa-cloud-arrow-down"></i></div>
            </div>
        </article>
    )
}