import styles from '@/styles/modules/request/request.module.css'
import { Request } from '@/types/request';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function RequestBlock(props:any)
{
    const {id, apiUrl} = props;
    const [request, setRequest] = useState<Request>()

    const getRequest = async () =>
    {
        const result = await axios.get(`${apiUrl}api/request/${id}`).then(x => x.data)
        if(result.status)
            setRequest(result.data);
    }

    useEffect(() =>
    {
        getRequest();
    },[])

    return (
        <article className={styles.main}>
            <div style={{display:'flex', padding:'16px'}}>
                <img className={styles.avatar} src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" alt="" />
                <div style={{width:'100%', paddingLeft:'8px'}}>
                <div style={{display:'flex', justifyContent:'space-between', paddingBottom:'8px'}}>
                    <p>USERNAME</p>
                    <p>{request?.created}</p>
                </div>
                <div className={styles.content}><p>{request?.description}</p></div>
                </div>
            </div>
            <div className={styles.navbar}>
                <div><i className="fa-solid fa-comment"></i> 12</div>
                <div><i className="fa-solid fa-share"></i> 1</div>
                <div><i className="fa-solid fa-heart"></i> 5</div>
                <div><i className="fa-solid fa-chart-simple"></i> 100</div>
                <div><i className="fa-solid fa-cloud-arrow-down"></i></div>
            </div>
        </article>
    )
}