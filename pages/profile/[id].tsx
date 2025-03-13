import { getUserById } from "@/services/backend/user_services";
import { UserType } from "@/types/user";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

import styles from '@/styles/modules/profile/profile.module.css'
import { getRequestsByUserId } from "@/services/backend/request_services";
import RequestBlock from "@/components/request/request";
import Link from "next/link";

export default function Profile(props:any)
{
    const {user, owner, data, tab} = props;

    return (
        <div>
            <header className={styles.header}>
                <div className={styles.banner} style={{backgroundImage:`url(${user.banner || "/banner.jpg"})`}}></div>
                <div className={styles.bottom}>
                    <div className={styles.avatar} style={{backgroundImage:`url(${user.avatar})`}}></div>
                    <div style={{width:'100%'}}>
                        <div style={{display:"flex", alignItems:'center', justifyContent:'space-between', width:'100%'}}>
                            <div className={styles.username}>{user.username}</div>
                            {owner && ( <div className={styles.edit_button}>EDIT PROFILES</div> )}
                        </div>
                        <div>
                            <ul className={styles.list}>
                                {user.discord && ( <a target="_blank" href={user.discord} className={styles.list_item}> <li> <i className="fa-brands fa-discord"></i> </li> </a> )}
                                {user.xurl && ( <a target="_blank" href={user.xurl} className={styles.list_item}> <li> <i className="fa-brands fa-x-twitter"></i> </li> </a> )}
                                {user.websiteurl && ( <a target="_blank" href={user.websiteurl} className={styles.list_item}> <li> <i className="fa-solid fa-globe"></i> </li> </a> )}
                                {user.email && ( <a href={`emailto:${user.email}`} className={styles.list_item}> <li> <i className="fa-solid fa-envelope"></i> </li> </a> )}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <nav className={styles.nav}>
                <Link href={`${user.id}?tab=requests`}><div className={styles.nav_item} style={{borderBottomColor:tab==='requests'?'var(--color3)':'var(--color4)'}}>Requests</div></Link>
                <Link href={`${user.id}?tab=projects`}><div className={styles.nav_item} style={{borderBottomColor:tab==='projects'?'var(--color3)':'var(--color4)'}}>Projects</div></Link>
                <Link href={`${user.id}?tab=likes`}><div className={styles.nav_item} style={{borderBottomColor:tab==='likes'?'var(--color3)':'var(--color4)'}}>Likes</div></Link>
            </nav>
            {tab && tab === 'requests' && ( data.map((id:number) =>  <div className={styles.request} key={id}><RequestBlock id={id} userId={user.id}/></div>))}
            {tab && tab === 'likes' && ( data.map((id:number) =>  <div className={styles.request} key={id}><RequestBlock id={id} userId={user.id}/></div>))}
            {tab && tab === 'projects' && ( data.map((id:number) =>  <div className={styles.request} key={id}><RequestBlock id={id} userId={user.id}/></div>))}

        </div>
    )
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{   
    const id = context.query.id;
    const tab = context.query.tab || 'requests';

    const session = await getSession(context);
    const loggedInUser = (session?.user as UserType);

    let data = null;

    switch(tab)
    {
        case 'projects':
            // Get all Project IDs where User is Owner or part of the Team
            data = [];
            break;
        case 'likes':
            // Get all liked Requests
            data = (await getRequestsByUserId(id as string)).data
            break;
        default:
            data = (await getRequestsByUserId(id as string)).data
            break;
    }
    
    if(id === loggedInUser.id)
    {
        return {
            props: {
                user:loggedInUser,
                owner:true,
                data,
                tab
            }
        }
    }

    const response = await getUserById(id as string)
        
    if(!response.status)
    {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            user:response.data,
            owner:false,
            data,
            tab
        }
    }
}